#!/bin/bash
set -e

# Limpiar dependencias y cachés
rm -rf node_modules dist build .turbo .next .cache

# NO eliminar el package-lock.json ni los lockfiles para builds reproducibles
# Si necesitas forzar la actualización de dependencias (por ejemplo, tras cambiar versiones en package.json),
# puedes eliminar manualmente el lockfile y luego correr este script, pero NO es lo recomendado para builds normales.
# rm -f package-lock.json yarn.lock pnpm-lock.yaml  # <- Solo descomentar si realmente quieres regenerar todo

# Limpiar caché de npm
npm cache clean --force

echo "\n[✔] Cachés y dependencias eliminadas."

echo "\n[→] Instalando dependencias..."
npm ci

echo "\n[→] Compilando proyecto..."
npm run build

echo "\n[→] Generando paquete (.tgz)..."
npm pack

echo "\n[✔] Proceso completado. El paquete está listo para publicar o compartir." 