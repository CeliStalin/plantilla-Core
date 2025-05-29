#!/bin/bash

case "$1" in
  "dev")
    echo "🚀 Iniciando ambiente de DESARROLLO..."
    docker-compose --profile development up --build
    ;;
  "prod")
    echo "🏭 Iniciando ambiente de PRODUCCIÓN..."
    docker-compose --profile production up --build -d
    ;;
  "test")
    echo "🧪 Ejecutando TESTS..."
    docker-compose --profile test up --build --abort-on-container-exit
    ;;
  "stop")
    echo "⏹️ Deteniendo todos los servicios..."
    docker-compose down
    ;;
  *)
    echo "Uso: $0 {dev|prod|test|stop}"
    echo "  dev  - Ambiente de desarrollo con hot-reload"
    echo "  prod - Ambiente de producción con Nginx"
    echo "  test - Ejecutar tests"
    echo "  stop - Detener todos los servicios"
    exit 1
    ;;
esac
