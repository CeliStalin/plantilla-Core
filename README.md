# Consalud Core Library

Una biblioteca de componentes y utilidades para proyectos React en Consalud, diseñada para facilitar el desarrollo de aplicaciones front-end con un conjunto consistente de herramientas y estilos.

## 🌟 Características

- **Componentes Reutilizables**: Botones, tarjetas, formularios, diseños y más
- **Autenticación**: Integración con Microsoft Azure AD mediante MSAL
- **Enrutamiento**: Rutas protegidas y públicas con control de acceso basado en roles
- **Manejo de Estado**: Hooks personalizados para gestión de estado y almacenamiento local
- **Estilos**: Sistema de diseño con temas y estilos predefinidos
- **Seguridad**: Prácticas recomendadas para implementaciones seguras
- **Utilidades**: Herramientas comunes para manejo de API, fechas, y más

## 📦 Instalación

```bash
# Usando npm
npm install @consalud/core

# Usando yarn
yarn add @consalud/core
```

### Dependencias

Esta biblioteca requiere las siguientes dependencias en tu proyecto:

```json
"peerDependencies": {
  "@azure/msal-browser": "^4.11.0",
  "bulma": "^1.0.3",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^7.4.0"
}
```

## 🚀 Uso Rápido

```jsx
import React from 'react';
import { 
  AuthProvider, 
  Button, 
  Card, 
  Layout, 
  useAuth 
} from '@consalud/core';

// Configuración de autenticación
const App = () => {
  return (
    <AuthProvider>
      <Layout>
        <Card title="Ejemplo de Uso">
          <Button variant="primary">Botón de Ejemplo</Button>
        </Card>
      </Layout>
    </AuthProvider>
  );
};

export default App;
```

## 🔒 Autenticación

La biblioteca proporciona una integración completa con Microsoft Azure AD a través de MSAL:

```jsx
import { 
  AuthProvider, 
  Login, 
  PrivateRoute, 
  PublicRoute 
} from '@consalud/core';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/dashboard" element={
            <PrivateRoute allowedRoles={['ADMIN', 'USER']}>
              <DashboardPage />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
};
```

## 📚 Componentes Principales

### Layout

```jsx
import { Layout } from '@consalud/core';

const HomePage = () => {
  return (
    <Layout 
      pageTitle="Página de Inicio"
      enableTransitions={true}
      transitionType="fadeSlide"
      transitionDuration={300}
    >
      {/* Contenido de la página */}
    </Layout>
  );
};
```

### SecureLayout

```jsx
import { SecureLayout } from '@consalud/core';

const DashboardPage = () => {
  return (
    <SecureLayout 
      pageTitle="Dashboard" 
      allowedRoles={['ADMIN']}
      enableTransitions={true}
      transitionType="fade"
      transitionDuration={250}
    >
      {/* Contenido protegido */}
    </SecureLayout>
  );
};
```

### PageTransition (Uso independiente)

```jsx
import { PageTransition, usePageTransition } from '@consalud/core';

// Uso dentro de una aplicación con React Router
const MyComponent = () => {
  const { transitionProps } = usePageTransition({
    type: 'fadeSlide',
    duration: 300
  });

  return (
    <PageTransition {...transitionProps}>
      <div>Contenido con transiciones</div>
    </PageTransition>
  );
};

// Uso en aplicaciones externas (sin React Router)
const ExternalAppComponent = () => {
  const [content, setContent] = useState('Contenido inicial');
  
  return (
    <PageTransition 
      type="fadeSlide" 
      duration={300}
      standalone={true}
      triggerKey={content} // Cambia cuando el contenido cambia
    >
      <div>{content}</div>
      <button onClick={() => setContent('Nuevo contenido')}>
        Cambiar contenido
      </button>
    </PageTransition>
  );
};

// Uso con control manual de transiciones
const ManualTransitionComponent = () => {
  const { triggerTransition, transitionProps } = usePageTransition({
    type: 'slide',
    duration: 250
  });

  const handleContentChange = () => {
    // Triggear transición manualmente
    triggerTransition();
    // Actualizar contenido después
    setTimeout(() => {
      // Actualizar el estado de tu aplicación
    }, 250);
  };

  return (
    <div>
      <PageTransition {...transitionProps}>
        <div>Tu contenido aquí</div>
      </PageTransition>
      <button onClick={handleContentChange}>
        Cambiar con transición
      </button>
    </div>
  );
};
```

#### Configuración para aplicaciones externas

Si tu aplicación externa no usa React Router, asegúrate de usar una de estas opciones:

**Opción 1: Modo Standalone (Recomendado)**
```jsx
<PageTransition standalone={true} triggerKey={yourContentKey}>
  {yourContent}
</PageTransition>
```

**Opción 2: Control manual con el hook**
```jsx
const { triggerTransition } = usePageTransition();
// Llamar triggerTransition() cuando quieras activar la transición
```

**Opción 3: Envolver en un Router básico (si necesitas funcionalidad de routing)**
```jsx
import { BrowserRouter } from 'react-router-dom';

<BrowserRouter>
  <PageTransition>
    {yourContent}
  </PageTransition>
</BrowserRouter>
```

### NavMenu

```jsx
import { NavMenuApp } from '@consalud/core';

const SidebarContent = () => {
  return <NavMenuApp />;
};
```

### Otros Componentes

- `Button`: Botones con diferentes variantes y estilos
- `Card`: Tarjetas para mostrar contenido con diferentes estilos
- `ErrorBoundary`: Captura errores en componentes hijos
- `LoadingOverlay`: Indicador de carga con superposición
- `ErrorMessage`: Mensajes de error estilizados

## 🛠️ Hooks Personalizados

### useAuth

```jsx
import { useAuth } from '@consalud/core';

const UserProfile = () => {
  const { 
    isSignedIn, 
    usuario, 
    roles, 
    logout, 
    hasRole 
  } = useAuth();

  return (
    <div>
      {isSignedIn ? (
        <>
          <p>Bienvenido, {usuario?.displayName}</p>
          {hasRole('ADMIN') && (
            <p>Tienes permisos de administrador</p>
          )}
          <button onClick={logout}>Cerrar Sesión</button>
        </>
      ) : (
        <p>Por favor inicia sesión</p>
      )}
    </div>
  );
};
```

### useLocalStorage

```jsx
import { useLocalStorage } from '@consalud/core';

const SettingsComponent = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <div>
      <p>Tema actual: {theme}</p>
      <button onClick={() => setTheme('dark')}>
        Cambiar a tema oscuro
      </button>
    </div>
  );
};
```

## 🎨 Temas y Personalización

La biblioteca incluye un sistema de temas que puedes personalizar:

```jsx
import { theme } from '@consalud/core';

// Usando el tema predeterminado
console.log(theme.colors.primary); // #04A59B

// Personalizando componentes con el tema
const CustomComponent = () => {
  return (
    <div style={{ 
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius.md,
      padding: theme.spacing.md
    }}>
      Contenido personalizado
    </div>
  );
};
```

## 📋 Variables de entorno requeridas

La biblioteca espera ciertas variables de entorno para funcionar correctamente:

```
VITE_APP_AMBIENTE=Desarrollo
VITE_APP_SISTEMA=NombreSistema
VITE_APP_NOMBRE_SISTEMA=Nombre Completo del Sistema
VITE_APP_API_ARQUITECTURA_URL=http://soter.arquitectura.des
VITE_APP_TIMEOUT=10000
VITE_APP_NAME_API_KEY=X-API-CONSALUD-SEGURIDAD
VITE_APP_KEY_PASS_API_ARQ=TuClave
VITE_APP_CLIENT_ID=tu-client-id-azure
VITE_APP_AUTHORITY=https://login.microsoftonline.com/tu-tenant-id
```

## 🔧 Solución de problemas comunes

### Problema con tipos de Babel

Si encuentras errores relacionados con los tipos de Babel:

1. Instala los tipos de Babel:
   ```bash
   npm install --save-dev @types/babel__core
   ```

2. Crea un archivo `babel.d.ts` en la raíz del proyecto con el siguiente contenido:
   ```typescript
   declare module '@babel/core';
   declare module '@babel/preset-env';
   declare module '@babel/preset-react';
   declare module '@babel/preset-typescript';
   declare module '@babel/plugin-transform-runtime';
   ```

3. Asegúrate de que tu `tsconfig.json` incluya:
   ```json
   {
     "compilerOptions": {
       // ... otras opciones
       "skipLibCheck": true,
       "typeRoots": ["./node_modules/@types", "./"]
     },
     "include": ["src/**/*.ts", "src/**/*.tsx", "*.d.ts"],
   }
   ```

### Problema con tipos de node_modules

Si encuentras errores relacionados con definiciones de tipos para 'node_modules':

1. Crea un archivo `node-modules.d.ts` en la raíz del proyecto con el siguiente contenido:
   ```typescript
   declare module 'node_modules/*';
   ```

2. Actualiza tu `tsconfig.json` para incluir:
   ```json
   {
     "compilerOptions": {
       // ... otras opciones
       "skipLibCheck": true,
       "typeRoots": ["./node_modules/@types", "./"],
       "types": ["node"],
       "noImplicitAny": false
     },
     "include": ["src/**/*.ts", "src/**/*.tsx", "*.d.ts"],
     "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.test.tsx"]
   }
   ```

3. Reinicia el servidor de TypeScript en tu editor para que los cambios surtan efecto.

### Problema con la autenticación MSAL

Si tienes problemas con la autenticación:

1. Verifica que las variables de entorno para Azure AD sean correctas
2. Asegúrate de que el usuario tenga permiso para acceder a la aplicación en Azure
3. Si usas el flujo de redirección, verifica que la URL de redirección esté configurada correctamente en Azure

```javascript
// Depuración de autenticación
import { MsalAuthProvider } from '@consalud/core';

// Verificar estado de autenticación
const checkAuth = async () => {
  try {
    const authenticated = await MsalAuthProvider.isAuthenticated();
    console.log('Estado de autenticación:', authenticated);
  } catch (error) {
    console.error('Error al verificar autenticación:', error);
  }
};
```

## 🤝 Contribución 

Si deseas contribuir a este proyecto:

1. Clona el repositorio
2. Instala las dependencias: `npm install`
3. Ejecuta el entorno de desarrollo: `npm run dev`
4. Construye la biblioteca: `npm run build:lib`

### Scripts disponibles

```bash
npm run dev        # Inicia el entorno de desarrollo
npm run build      # Construye la aplicación para producción
npm run build:lib  # Construye la biblioteca para su uso como dependencia
npm run lint       # Ejecuta el linter
npm run test       # Ejecuta las pruebas
```

## 📄 Licencia

Este proyecto es propiedad de Consalud y su uso está restringido a proyectos internos autorizados.

# 🐳 Plantilla React con Docker

Esta plantilla te permite ejecutar una aplicación React usando Docker con diferentes ambientes (desarrollo, producción y testing).

## 🚀 Inicio Rápido

### 1. Prerrequisitos
- **Docker Desktop** instalado y ejecutándose
  - Verificar instalación: `docker --version`

### 2. Ejecutar el Proyecto

```bash
# Hacer el script ejecutable (solo la primera vez)
chmod +x docker-scripts.sh

# Iniciar ambiente de desarrollo
./docker-scripts.sh dev
```

**¡Listo!** Tu aplicación estará disponible en: http://localhost:3001

## 📋 Comandos Disponibles

| Comando | Descripción | Puerto |
|---------|-------------|--------|
| `./docker-scripts.sh dev` | Desarrollo con hot-reload | 3001 |
| `./docker-scripts.sh prod` | Producción con Nginx | 3000 |
| `./docker-scripts.sh test` | Ejecutar tests | - |
| `./docker-scripts.sh stop` | Detener servicios | - |
| `./docker-scripts.sh clean` | Limpiar todo | - |

## 🛠️ Ambientes

### 🔧 Desarrollo (`dev`)
- Hot-reload automático
- Código fuente montado como volumen
- Optimizado para desarrollo
- Puerto: 3001

### 🏭 Producción (`prod`)
- Build optimizado con Nginx
- Imagen ultra-ligera (~50-80MB)
- Ejecuta en segundo plano
- Puerto: 3000

### 🧪 Testing (`test`)
- Ejecuta tests automáticamente
- Optimizado para CI/CD
- Se detiene al finalizar

## 🔧 Solución de Problemas

### Error: "docker-compose: command not found"
```bash
# Usar el comando moderno (ya incluido en el script)
docker compose --version
```

### Error: "Docker no está ejecutándose"
1. Abrir Docker Desktop
2. Esperar a que se inicie completamente
3. Ejecutar el comando nuevamente

### Puerto ocupado
```bash
# Detener servicios
./docker-scripts.sh stop

# O cambiar puertos en docker-compose.yml
```

## 📁 Estructura del Proyecto

```
plantilla-Core/
├── docker-scripts.sh      # Script principal
├── docker-compose.yml     # Configuración Docker
├── Dockerfile            # Definición de imágenes
├── README.md            # Esta documentación
└── src/                 # Código fuente React
```

## 🎯 Para Docker

1. **Instalar Docker Desktop** y asegurarse que esté ejecutándose
2. **Abrir terminal** en la carpeta del proyecto
3. **Ejecutar**: `./docker-scripts.sh dev`
4. **Abrir navegador** en: http://localhost:3001
5. **¡Comenzar a programar!** Los cambios se reflejan automáticamente

## 📞 Soporte

Si tienes problemas:
1. Ejecuta `./docker-scripts.sh` para ver todos los comandos
2. Usa `./docker-scripts.sh clean` para limpiar y empezar de nuevo

## 🏠 HomePage: Uso avanzado y consumo externo

El componente `HomePage` puede usarse tanto dentro de la app principal como en aplicaciones externas. Ahora soporta los siguientes props avanzados:

### Props avanzados

- `withLayout?: boolean` (default: `true`):
  - Si es `true` (o no se pasa), el contenido se envuelve en el layout del core.
  - Si es `false`, renderiza solo el contenido interno. **Debes envolverlo en tu propio layout y en el `MenuCollapseProvider`**.

- `menuCollapsed?: boolean`:
  - Si se define, fuerza el estado del menú izquierdo (NavMenu):
    - `true` = menú colapsado
    - `false` = menú expandido
  - Si no se define, el control es interno (por contexto/localStorage).

### Ejemplo de uso en app externa (sin layout interno):

```jsx
import { HomePage } from '@consalud/core';
import { MenuCollapseProvider } from '@consalud/core/context/MenuCollapseContext';
import SecureLayout from '@consalud/core/components/SecureLayout/SecureLayout';

export default function App() {
  return (
    <SecureLayout>
      <MenuCollapseProvider>
        <HomePage withLayout={false} menuCollapsed={true} />
      </MenuCollapseProvider>
    </SecureLayout>
  );
}
```

### Ejemplo de uso con layout interno (por defecto):

```jsx
<HomePage /> // Usa el layout y el control de menú del core
```

### Notas
- Si usas `withLayout={false}`, **debes envolver el componente en `MenuCollapseProvider`** para evitar errores de contexto.
- Si usas `menuCollapsed`, puedes controlar el estado del menú izquierdo desde tu app externa.
- Si no pasas estos props, el comportamiento es el mismo que antes (retrocompatibilidad).
