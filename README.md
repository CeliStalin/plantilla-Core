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
    <Layout pageTitle="Página de Inicio">
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
    >
      {/* Contenido protegido */}
    </SecureLayout>
  );
};
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