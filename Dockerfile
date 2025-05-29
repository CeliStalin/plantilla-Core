# Multi-stage build para optimización

# Etapa base
FROM node:18-alpine AS base

# Etapa 1: Dependencias
FROM base AS deps
WORKDIR /app

# Copiar archivos de paquete
COPY package*.json ./
COPY optimization.config.ts ./

# Instalar solo dependencias de producción basadas en libraryConfig
RUN npm ci --only=production && npm cache clean --force

# Etapa 2: Construcción
FROM base AS builder
WORKDIR /app

# Copiar archivos de paquete e instalar todas las dependencias
COPY package*.json ./
RUN npm ci

# Copiar código fuente
COPY . .

# Construir la biblioteca
RUN npm run build

# Etapa 3: Producción
FROM node:18-alpine AS production
WORKDIR /app

# Copiar solo las dependencias de producción de la etapa de deps
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S reactuser -u 1001

USER reactuser

EXPOSE 3000

CMD ["npm", "start"]
