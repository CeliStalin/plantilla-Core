# Construcción multi-etapa para aplicación React TypeScript

# Etapa 1: Etapa de construcción
FROM node:18-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de paquetes primero (para mejor caché de capas)
COPY package*.json ./
COPY yarn.lock* ./

# Instalar dependencias
RUN npm ci --only=production && npm cache clean --force

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa 2: Etapa de producción
FROM nginx:alpine AS production

# Instalar actualizaciones de seguridad
RUN apk update && apk upgrade && apk add --no-cache dumb-init

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs && adduser -S reactuser -u 1001

# Copiar archivos construidos desde la etapa builder
COPY --from=builder /app/build /usr/share/nginx/html

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cambiar propiedad de directorios nginx
RUN chown -R reactuser:nodejs /usr/share/nginx/html && \
    chown -R reactuser:nodejs /var/cache/nginx && \
    chown -R reactuser:nodejs /var/log/nginx && \
    chown -R reactuser:nodejs /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R reactuser:nodejs /var/run/nginx.pid

# Cambiar a usuario no-root
USER reactuser

# Exponer puerto
EXPOSE 80

# Verificación de salud
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Iniciar nginx
ENTRYPOINT ["dumb-init", "--"]
CMD ["nginx", "-g", "daemon off;"]
