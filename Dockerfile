# Multi-stage build para TypeScript

# Etapa base ultra-ligera
FROM node:20-alpine AS base
RUN apk add --no-cache dumb-init ca-certificates
WORKDIR /app

#  cache optimizado
FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production --no-optional --silent && \
    npm cache clean --force && \
    rm -rf ~/.npm

# dependencias de desarrollo
FROM base AS dev-deps
COPY package*.json ./
RUN npm ci --include=dev --no-optional --silent && \
    npm cache clean --force && \
    rm -rf ~/.npm

# construcción optimizada
FROM dev-deps AS builder
COPY . .
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV GENERATE_SOURCEMAP=false
RUN npm run build:lib && \
    rm -rf node_modules/.cache && \
    rm -rf src && \
    rm -rf public

# DESARROLLO - Imagen compatible con Docker Engine CLI (~300-400MB)
FROM dev-deps AS development
RUN apk add --no-cache git python3 make g++ curl wget
# Crear usuario sin privilegios especiales para Docker Engine
RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup
# Copiar archivos antes de cambiar usuario
COPY . /app/
RUN chown -R appuser:appgroup /app
USER appuser
WORKDIR /app
ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true
ENV FAST_REFRESH=true
ENV NODE_OPTIONS="--max-old-space-size=2048"
ENV WATCHPACK_POLLING=true
ENV TSC_WATCHFILE=UseFsEventsWithFallbackDynamicPolling
# Puerto interno del contenedor
EXPOSE 3000
# Comando para desarrollo con polling habilitado
CMD ["npm", "start"]

# TEST - Imagen optimizada para testing (~150-200MB)
FROM dev-deps AS test
RUN apk add --no-cache chromium nss freetype
RUN addgroup -g 1001 -S nodejs && \
    adduser -S testuser -u 1001 -G nodejs
USER testuser
COPY --chown=testuser:nodejs . .
ENV NODE_ENV=test
ENV CI=true
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
CMD ["npm", "test", "--", "--coverage", "--watchAll=false", "--maxWorkers=2"]

# PRODUCCIÓN - Nginx ultra-ligero (~50-80MB)
FROM nginx:alpine AS production
RUN apk add --no-cache dumb-init && \
    addgroup -g 1001 -S nginx && \
    adduser -S reactuser -u 1001 -G nginx
COPY --from=builder --chown=reactuser:nginx /app/dist /usr/share/nginx/html
COPY --chown=reactuser:nginx <<EOF /etc/nginx/nginx.conf
user nginx;
worker_processes auto;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
    use epoll;
    multi_accept on;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    
    server {
        listen 3000;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;
        
        location / {
            try_files \$uri \$uri/ /index.html;
        }
        
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
EOF
USER reactuser
EXPOSE 3000
ENTRYPOINT ["dumb-init", "--"]
CMD ["nginx", "-g", "daemon off;"]
