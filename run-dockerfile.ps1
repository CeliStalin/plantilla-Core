param (
    [string]$ambiente = ""
)

# Función para mostrar mensajes con colores
function Write-Color([string]$text, [string]$color = "White") {
    Write-Host $text -ForegroundColor $color
}

switch ($ambiente) {
    "dev" {
        Write-Color "🚀 Construyendo imagen de DESARROLLO..." "Green"
        docker build --target development -t react-app:dev .
        
        Write-Color "🚀 Ejecutando contenedor de DESARROLLO..." "Green"
        Write-Color "Puerto: http://localhost:3001" "Yellow"
        docker run -it --rm -p 3001:3000 `
          -v "${PWD}:/app" `
          -v "/app/node_modules" `
          --name react-dev react-app:dev
    }
    "prod" {
        Write-Color "🏭 Construyendo imagen de PRODUCCIÓN..." "Blue"
        docker build --target production -t react-app:prod .
        
        Write-Color "🏭 Ejecutando contenedor de PRODUCCIÓN..." "Blue"
        Write-Color "Puerto: http://localhost:3000" "Yellow"
        docker run -d --rm -p 3000:3000 --name react-prod react-app:prod
    }
    "test" {
        Write-Color "🧪 Construyendo imagen de TESTING..." "Yellow"
        docker build --target test -t react-app:test .
        
        Write-Color "🧪 Ejecutando TESTS..." "Yellow"
        docker run --rm --name react-test react-app:test
    }
    default {
        Write-Color "❌ Debes especificar un ambiente: dev, prod o test" "Red"
        Write-Host ""
        Write-Color "=== 🐳 EJECUTAR DOCKERFILE DIRECTAMENTE ===" "Blue"
        Write-Host ""
        Write-Host "Uso: .\run-dockerfile.ps1 -ambiente " -NoNewline
        Write-Color "{dev|prod|test}" "Green"
        Write-Host ""
        Write-Color "📋 AMBIENTES DISPONIBLES:" "Yellow"
        Write-Host "  dev   - Ambiente de desarrollo con hot-reload (Puerto 3001)"
        Write-Host "  prod  - Ambiente de producción con Nginx (Puerto 3000)"
        Write-Host "  test  - Ejecutar tests"
        Write-Host ""
        Write-Color "🚀 EJEMPLOS:" "Green"
        Write-Host "  .\run-dockerfile.ps1 -ambiente dev    # Iniciar entorno de desarrollo"
        Write-Host "  .\run-dockerfile.ps1 -ambiente prod   # Iniciar entorno de producción"
    }
}
