#!/bin/bash

# Colores para mensajes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

if [ "$1" = "dev" ] || [ "$1" = "development" ]; then
    echo -e "${GREEN}🚀 Construyendo imagen de DESARROLLO...${NC}"
    docker build --target development -t react-app:dev .
    
    echo -e "${GREEN}🚀 Ejecutando contenedor de DESARROLLO...${NC}"
    echo -e "${YELLOW}Puerto: http://localhost:3001${NC}"
    docker run -it --rm -p 3001:3000 \
      -v "$(pwd):/app" \
      -v "/app/node_modules" \
      --name react-dev react-app:dev

elif [ "$1" = "prod" ] || [ "$1" = "production" ]; then
    echo -e "${BLUE}🏭 Construyendo imagen de PRODUCCIÓN...${NC}"
    docker build --target production -t react-app:prod .
    
    echo -e "${BLUE}🏭 Ejecutando contenedor de PRODUCCIÓN...${NC}"
    echo -e "${YELLOW}Puerto: http://localhost:3000${NC}"
    docker run -d --rm -p 3000:3000 --name react-prod react-app:prod

elif [ "$1" = "test" ]; then
    echo -e "${YELLOW}🧪 Construyendo imagen de TESTING...${NC}"
    docker build --target test -t react-app:test .
    
    echo -e "${YELLOW}🧪 Ejecutando TESTS...${NC}"
    docker run --rm --name react-test react-app:test

else
    echo -e "${RED}❌ Debes especificar un ambiente: dev, prod o test${NC}"
    echo ""
    echo -e "${BLUE}=== 🐳 EJECUTAR DOCKERFILE DIRECTAMENTE ===${NC}"
    echo ""
    echo -e "Uso: $0 ${GREEN}{dev|prod|test}${NC}"
    echo ""
    echo -e "${YELLOW}📋 AMBIENTES DISPONIBLES:${NC}"
    echo "  dev   - Ambiente de desarrollo con hot-reload (Puerto 3001)"
    echo "  prod  - Ambiente de producción con Nginx (Puerto 3000)"
    echo "  test  - Ejecutar tests"
    echo ""
    echo -e "${GREEN}🚀 EJEMPLOS:${NC}"
    echo "  ./run-dockerfile.sh dev    # Iniciar entorno de desarrollo"
    echo "  ./run-dockerfile.sh prod   # Iniciar entorno de producción"
    echo ""
    exit 1
fi
