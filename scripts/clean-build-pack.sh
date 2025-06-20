#!/bin/bash
# Este script está diseñado para realizar una compilación limpia y completa del proyecto desde cero.
set -e

echo "[1/5] Limpiando artefactos de compilación anteriores..."
rm -rf dist build .turbo .next .cache *.tgz

echo "[2/5] Limpiando la caché de npm..."
npm cache clean --force

echo "[3/5] Eliminando dependencias (node_modules)..."
rm -rf node_modules

# Nota sobre el lockfile:
# No se elimina package-lock.json por defecto para asegurar BUILDS REPRODUCIBLES.
# Si necesitas actualizar todas las dependencias a las últimas versiones compatibles
# según package.json, puedes borrar 'package-lock.json' manualmente antes de ejecutar este script.
# rm -f package-lock.json

echo "[4/5] Instalando todas las dependencias desde cero..."
npm install

echo "[5/5] Compilando el proyecto y generando el paquete..."
npm run build && npm pack

echo "\n[✔] Proceso completado con éxito."
echo "El nuevo paquete .tgz está en la raíz del proyecto." 