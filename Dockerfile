# Multi-stage build optimizado para React TypeScript con Node.js 20

# Etapa base común
FROM node:20-alpine AS base

# Instalar dependencias del sistema y herramientas necesarias
RUN apk add --no-cache \
    dumb-init \
    python3 \
    make \
    g++ \
    ca-certificates \
    && ln -sf python3 /usr/bin/python

# Configurar npm para mejor rendimiento
RUN npm config set fund false && \
    npm config set audit-level moderate && \
    npm config set fetch-retry-maxtimeout 60000 && \
    npm config set fetch-retry-mintimeout 10000

WORKDIR /app

# Etapa 1: Instalación de dependencias
FROM base AS deps
# Copiar solo archivos de paquete para aprovechar cache de Docker
COPY package*.json ./

# Instalar dependencias de producción con optimizaciones
RUN npm ci --only=production --no-optional --silent && \
    npm cache clean --force

# Etapa 2: Dependencias de desarrollo
FROM base AS dev-deps
COPY package*.json ./

# Instalar todas las dependencias para el build
RUN npm ci --include=dev --no-optional --silent && \
    npm cache clean --force

# Etapa 3: Construcción de la biblioteca
FROM dev-deps AS builder

# Copiar código fuente
COPY . .

# Configurar variables de ambiente para el build
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=4096"
ENV GENERATE_SOURCEMAP=false

# Construir la biblioteca con optimizaciones TypeScript
RUN npm run build:lib

# Etapa 4: Imagen de producción
FROM node:20-alpine AS production

# Instalar solo lo necesario para producción
RUN apk add --no-cache dumb-init ca-certificates

WORKDIR /app

# Crear usuario no-root con mejores prácticas de seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S reactuser -u 1001 -G nodejs

# Copiar dependencias de producción y build
COPY --from=deps --chown=reactuser:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=reactuser:nodejs /app/dist ./dist
COPY --from=builder --chown=reactuser:nodejs /app/package*.json ./

# Cambiar a usuario no-root
USER reactuser

# Variables de ambiente optimizadas para producción
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=2048"

EXPOSE 3000

# Usar dumb-init para manejo correcto de señales
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]
