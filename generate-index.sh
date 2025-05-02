#!/bin/bash
# Script para generar archivos index.ts faltantes

# Colores para mensajes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes con formato
print_message() {
  local color=$1
  local message=$2
  echo -e "${color}${message}${NC}"
}

# Función para crear directorios si no existen
ensure_dir() {
  local dir=$1
  if [ ! -d "$dir" ]; then
    mkdir -p "$dir"
    print_message "$YELLOW" "Creando directorio: $dir"
  fi
}

# Función para crear archivo index.ts
create_index_file() {
  local file=$1
  local content=$2
  
  # Crear directorio padre si no existe
  local dir=$(dirname "$file")
  ensure_dir "$dir"
  
  # Verificar si el archivo ya existe
  if [ -f "$file" ]; then
    print_message "$BLUE" "El archivo ya existe: $file"
    
    # Preguntar si se desea sobrescribir
    read -r -p "¿Deseas sobrescribir este archivo? [s/N]: " response
    if [[ "$response" =~ ^([sS][iI]|[sS])$ ]]; then
      echo "$content" > "$file"
      print_message "$GREEN" "Archivo sobrescrito: $file"
    else
      print_message "$YELLOW" "No se ha modificado: $file"
    fi
  else
    echo "$content" > "$file"
    print_message "$GREEN" "Archivo creado: $file"
  fi
}

# Verificar que estamos en la raíz del proyecto
if [ ! -d "src" ]; then
  print_message "$RED" "Error: Este script debe ejecutarse desde la raíz del proyecto."
  exit 1
fi

print_message "$GREEN" "=== Generando archivos index.ts faltantes ==="

# 1. src/core/components/Layout/components/index.ts
create_index_file "src/core/components/Layout/components/index.ts" "export * from './Header';
export * from './Content';
export * from './Sidebar';"

# 2. src/core/components/Login/index.ts
create_index_file "src/core/components/Login/index.ts" "export { default } from './Login';
export * from './components';
export * from './styles/header.styles';"

# 3. src/core/components/Login/components/index.ts
create_index_file "src/core/components/Login/components/index.ts" "export * from './Header';
export * from './LoadingDots';
export * from './UserInfo';
export * from './ErrorMessages';"

# 4. src/core/components/UserLogin/index.ts
create_index_file "src/core/components/UserLogin/index.ts" "export { default } from './UserLoginApp';"

# 5. src/core/components/index.ts (actualizado)
create_index_file "src/core/components/index.ts" "export * from './Button';
export * from './Card';
export { Counter } from './Counter';
export * from './Dashboard';
export * from './ErrorBoundary';
export * from './ErrorMessage';
export * from './Layout';
export * from './Loading';
export * from './Login';
export * from './MainPage';
export * from './NavMenu';
export * from './UserLogin';
export { default as NotFound } from './NotFound';
export { default as Unauthorized } from './Unauthorized';
export { default as HomePage } from './HomePage';
export { default as SecureLayout } from './SecureLayout/SecureLayout';"

# 6. src/core/services/logging/index.ts
create_index_file "src/core/services/logging/index.ts" "export * from './logger';"

# 7. src/core/utils/index.ts (completo)
create_index_file "src/core/utils/index.ts" "export * from './GetEnvVariables';
export * from './MapperRawMenus';
export * from './MapperRawToRol';
export * from './MapperRawToUsuarioAd';
export * from './mappers';"

# 8. src/core/interfaces/index.ts
create_index_file "src/core/interfaces/index.ts" "export * from './IAuth';
export * from './IFectTimeOutOptions';
export * from './IMenusElementos';
export * from './IRawMenusElmento';
export * from './IRawRolResponse';
export * from './IRawUsuarioAD';
export * from './IRawUsuarioExterno';
export * from './IRol';
export * from './ISistema';
export * from './IUserAz';
export * from './IUserExterno';
export * from './IUsuarioAD';"

# 9. src/core/components/Dashboard/index.ts
create_index_file "src/core/components/Dashboard/index.ts" "export { default } from './DashboardPage';"

# 10. src/core/components/MainPage/index.ts
create_index_file "src/core/components/MainPage/index.ts" "export { default } from './MainPage';
export * from './components';
export * from './styles';"

# 11. src/core/components/MainPage/components/index.ts
create_index_file "src/core/components/MainPage/components/index.ts" "export * from './DashboardContent';
export * from './MainContent';"

# 12. src/core/components/MainPage/styles/index.ts
create_index_file "src/core/components/MainPage/styles/index.ts" "export * from './header.styles';
export * from './animations.css';"

# 13. src/index.ts (raíz actualizado)
create_index_file "src/index.ts" "export * from './core/components';
export * from './core/context';
export * from './core/hooks';
export * from './core/interfaces';
export * from './core/services';
export * from './core/utils';
export * from './core/routes';
export * from './core/styles';"

print_message "$GREEN" "=== Generación de archivos index.ts completada ==="
print_message "$YELLOW" "Recuerda ejecutar 'npm run build' o 'npm run build:lib' para verificar que todo funcione correctamente."