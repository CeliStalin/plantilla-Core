#!/bin/bash

# Colores para mejorar la legibilidad
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Verificar si estamos en WSL
in_wsl() {
  if [ -f /proc/version ] && grep -q Microsoft /proc/version; then
    return 0
  else
    return 1
  fi
}

# Verificar si Docker está disponible
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Error: Docker no está instalado o no está en PATH${NC}"
    echo "   Para instalar Docker en Debian/Ubuntu WSL:"
    echo "   sudo apt-get update"
    echo "   sudo apt-get install -y docker.io"
    echo "   sudo usermod -aG docker $USER"
    echo "   sudo service docker start"
    exit 1
fi

# Verificar si el servicio Docker está corriendo en WSL
if in_wsl; then
    if ! service docker status > /dev/null 2>&1; then
        echo -e "${YELLOW}⚠️ Docker service no está corriendo en WSL${NC}"
        echo "   Iniciando servicio Docker..."
        sudo service docker start
    fi
fi

# Verificar si docker compose está disponible (ambas versiones)
if ! docker compose version &> /dev/null && ! docker-compose version &> /dev/null; then
    echo -e "${RED}❌ Error: docker compose no está disponible${NC}"
    echo "   Para instalar docker-compose en Debian/Ubuntu WSL:"
    echo "   sudo apt-get install -y docker-compose"
    echo "   o"
    echo "   sudo curl -L \"https://github.com/docker/compose/releases/download/v2.20.3/docker-compose-linux-x86_64\" -o /usr/local/bin/docker-compose"
    echo "   sudo chmod +x /usr/local/bin/docker-compose"
    exit 1
fi

# Determinar qué comando de compose usar
if docker compose version &> /dev/null; then
    COMPOSE_CMD="docker compose"
else
    COMPOSE_CMD="docker-compose"
fi

# Función para manejar errores comunes de npm
fix_npm_issues() {
    echo -e "${YELLOW}🔧 Intentando arreglar problemas de npm...${NC}"
    echo "   - Limpiando cache npm"
    $COMPOSE_CMD exec react-dev npm cache clean --force || true
    echo "   - Reinstalando dependencias"
    $COMPOSE_CMD exec react-dev npm ci || true
    echo "   - Verificando permisos"
    if in_wsl; then
        $COMPOSE_CMD exec react-dev chown -R node:node /app/node_modules || true
    fi
}

case "$1" in
  "dev")
    echo -e "${GREEN}🚀 Iniciando ambiente de DESARROLLO...${NC}"
    echo "   Puerto: http://localhost:3001"
    $COMPOSE_CMD --profile development up --build
    ;;
  "prod")
    echo -e "${BLUE}🏭 Iniciando ambiente de PRODUCCIÓN...${NC}"
    echo "   Puerto: http://localhost:3000"
    $COMPOSE_CMD --profile production up --build -d
    ;;
  "test")
    echo -e "${YELLOW}🧪 Ejecutando TESTS...${NC}"
    $COMPOSE_CMD --profile test up --build --abort-on-container-exit
    ;;
  "stop")
    echo -e "${RED}⏹️ Deteniendo todos los servicios...${NC}"
    $COMPOSE_CMD down
    ;;
  "clean")
    echo -e "${YELLOW}🧹 Limpiando contenedores, imágenes y volúmenes...${NC}"
    $COMPOSE_CMD down -v --rmi all
    ;;
  "fix")
    echo -e "${GREEN}🔧 Intentando arreglar problemas comunes...${NC}"
    
    echo "1. Verificando servicio Docker"
    if in_wsl; then
        sudo service docker restart
    fi
    
    echo "2. Limpiando cache y reinstalando dependencias"
    $COMPOSE_CMD build --no-cache react-dev
    $COMPOSE_CMD up -d react-dev
    fix_npm_issues
    
    echo "3. Reiniciando servicios"
    $COMPOSE_CMD restart
    
    echo -e "${GREEN}✅ Intento de reparación completado${NC}"
    ;;
  *)
    echo -e "${BLUE}=== 🐳 PLANTILLA REACT CON DOCKER EN WSL ===${NC}"
    echo ""
    echo -e "Uso: $0 ${GREEN}{dev|prod|test|stop|clean|fix}${NC}"
    echo ""
    echo -e "${YELLOW}📋 COMANDOS DISPONIBLES:${NC}"
    echo "  dev   - Ambiente de desarrollo con hot-reload (Puerto 3001)"
    echo "  prod  - Ambiente de producción con Nginx (Puerto 3000)"
    echo "  test  - Ejecutar tests"
    echo "  stop  - Detener todos los servicios"
    echo "  clean - Limpiar todo (contenedores, imágenes, volúmenes)"
    echo "  fix   - Intentar arreglar problemas comunes de npm/Docker en WSL"
    echo ""
    echo -e "${GREEN}🚀 INICIO RÁPIDO EN WSL:${NC}"
    echo "  1. sudo service docker start  # Iniciar Docker en WSL"
    echo "  2. ./docker-scripts.sh dev    # Iniciar entorno de desarrollo"
    echo "  3. Abrir http://localhost:3001"
    echo ""
    exit 1
    ;;
esac
