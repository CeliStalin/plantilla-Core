# 🎨 Librería de Componentes Core

Esta es la librería de componentes del core que muestra todos los componentes, animaciones, efectos y tipografías disponibles en el sistema.

## 📋 Características

- **Solo visible en desarrollo**: La librería solo se muestra cuando estás desarrollando el core, no en proyectos externos
- **Componentes interactivos**: Todos los componentes son funcionales y puedes interactuar con ellos
- **Categorización**: Los componentes están organizados por categorías (Componentes, Animaciones, Tipografía, Efectos)
- **Búsqueda**: Funcionalidad de búsqueda para encontrar componentes rápidamente
- **Responsive**: Diseño completamente responsive para todos los dispositivos

## 🚀 Cómo acceder

1. Asegúrate de estar en modo desarrollo del core
2. Navega a `/library` en tu aplicación
3. O usa el enlace "🎨 Librería de Componentes" en la barra de navegación de desarrollo

## 📦 Componentes Incluidos

### Botones
- Botón Primario
- Botón Secundario
- Botón Peligro
- Botón Fantasma
- Botón con Efectos (hover, bounce, glow, ripple)
- Botón Deshabilitado
- Botón Cargando
- Botón con Icono

### Tarjetas
- Tarjeta Básica
- Tarjeta con Header
- Tarjeta con Footer
- Tarjeta Completa

### Tipografía
- Títulos H1-H6
- Texto de cuerpo (normal, grande, pequeño)
- Texto de caption
- Texto de botón
- Todas las variantes de Work Sans

### Animaciones
- Bounce Effect
- Fade In Up
- Spin Animation
- Ripple Effect
- Card Bounce
- Scale Effect

### Estados de Carga
- Loading Overlay
- Loading Placeholder
- Spinner

### Manejo de Errores
- Error Message
- Warning Message
- Info Message

### Navegación
- Breadcrumb
- User Login

### Utilidades
- Counter
- Page Transition

## 🎯 Efectos y Animaciones

### Efectos de Botones
- **Hover**: Elevación y sombra al pasar el mouse
- **Bounce**: Efecto de rebote al hacer clic
- **Glow**: Efecto de brillo al pasar el mouse
- **Ripple**: Efecto de onda al hacer clic
- **Shadow**: Efectos de sombra dinámicos

### Animaciones CSS
- **Bounce**: Animación de rebote suave
- **FadeInUp**: Aparición desde abajo con fade
- **Spin**: Rotación continua
- **Scale**: Escalado suave
- **Card Bounce**: Efecto específico para tarjetas

## 🎨 Sistema de Tipografía

### Fuente Principal: Work Sans
- **Regular (400)**: Texto de cuerpo
- **Medium (500)**: Títulos H4-H6, texto de botón
- **Semibold (600)**: Títulos H2-H3
- **Bold (700)**: Título H1

### Tamaños de Fuente
- **xs**: 0.75rem (12px)
- **sm**: 0.875rem (14px)
- **base**: 1rem (16px)
- **lg**: 1.125rem (18px)
- **xl**: 1.25rem (20px)
- **2xl**: 1.5rem (24px)
- **3xl**: 1.875rem (30px)
- **4xl**: 2.25rem (36px)
- **5xl**: 3rem (48px)

## 🔧 Configuración

La librería se activa automáticamente cuando:
- `NODE_ENV` es `development`
- Estás ejecutando en `localhost` o `127.0.0.1`
- El paquete es `@consalud/core`

### Variables de Entorno
```bash
VITE_CORE_DEVELOPMENT=true
VITE_PACKAGE_NAME=@consalud/core
```

## 📱 Responsive Design

La librería está completamente optimizada para:
- **Desktop**: Layout completo con grid de componentes
- **Tablet**: Grid adaptativo con 2 columnas
- **Mobile**: Layout de una columna con navegación optimizada

## 🌙 Modo Oscuro

La librería incluye soporte automático para modo oscuro basado en las preferencias del sistema.

## ♿ Accesibilidad

- Soporte para `prefers-reduced-motion`
- Navegación por teclado
- Contraste adecuado
- Etiquetas semánticas

## 🛠️ Desarrollo

### Estructura de Archivos
```
ComponentLibrary/
├── ComponentLibrary.tsx          # Componente principal
├── ComponentLibraryWrapper.tsx   # Wrapper condicional
├── DevelopmentNav.tsx           # Navegación de desarrollo
├── ComponentLibrary.styles.css   # Estilos principales
├── DevelopmentNav.styles.css     # Estilos de navegación
├── index.ts                     # Exportaciones
└── README.md                    # Esta documentación
```

### Agregar Nuevos Componentes

1. Agrega el componente a la lista `componentSections` en `ComponentLibrary.tsx`
2. Categoriza correctamente el componente
3. Incluye una descripción clara
4. Asegúrate de que sea responsive

### Personalización

Puedes personalizar los estilos modificando:
- `ComponentLibrary.styles.css` para la librería principal
- `DevelopmentNav.styles.css` para la navegación
- Variables CSS en `src/core/styles/theme.ts`

## 📄 Licencia

Este componente es parte del core y sigue la misma licencia del proyecto principal. 