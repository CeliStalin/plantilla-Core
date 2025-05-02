# @consalud/core

Biblioteca core para aplicaciones React de Consalud, proporcionando componentes, hooks, servicios y utilidades comunes para todas las aplicaciones.

## Instalación

```bash
npm install @consalud/core

# o usando yarn
yarn add @consalud/core

# o usando pnpm
pnpm add @consalud/core
```

## Requisitos

Esta biblioteca tiene como peerDependencies:

- React 19.x
- React DOM 19.x
- React Router DOM 7.x
- @azure/msal-browser 4.x
- Bulma CSS 1.x

Asegúrate de tener estas dependencias instaladas en tu proyecto.

## Uso

### Configuración básica

Para configurar tu aplicación con el core, necesitas envolver tu aplicación con los providers necesarios:

```jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, MenuConfigProvider } from '@consalud/core';

function App() {
  return (
    <AuthProvider>
      <MenuConfigProvider config={{ enableDynamicMenu: true }}>
        <BrowserRouter>
          {/* Tu aplicación */}
        </BrowserRouter>
      </MenuConfigProvider>
    </AuthProvider>
  );
}

export default App;
```

### Componentes

El core proporciona varios componentes reutilizables:

```jsx
import { 
  Button, 
  Card, 
  Layout, 
  NavMenuApp, 
  ErrorBoundary, 
  LoadingOverlay 
} from '@consalud/core';

// Ejemplo de uso
function MyComponent() {
  return (
    <ErrorBoundary>
      <Layout>
        <Card title="Mi Tarjeta">
          <p>Contenido de la tarjeta</p>
          <Button variant="primary">Click Me</Button>
        </Card>
      </Layout>
    </ErrorBoundary>
  );
}
```

### Hooks

El core proporciona hooks para la autenticación y otras funcionalidades:

```jsx
import { useAuth, useLocalStorage } from '@consalud/core';

function MyComponent() {
  const { isSignedIn, roles, login, logout } = useAuth();
  const [preferences, setPreferences] = useLocalStorage('user-preferences', {});

  // Usa los hooks...
}
```

### Rutas protegidas

Puedes usar los componentes de rutas para proteger páginas por autenticación y roles:

```jsx
import { Route } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from '@consalud/core';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import AdminPage from './pages/Admin';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      
      <Route path="/" element={
        <PrivateRoute>
          <HomePage />
        </PrivateRoute>
      } />
      
      <Route path="/admin" element={
        <PrivateRoute allowedRoles={['ADMIN']}>
          <AdminPage />
        </PrivateRoute>
      } />
    </Routes>
  );
}
```

## Personalización

### Configuración del menú

Puedes habilitar o deshabilitar el menú dinámico en cada aplicación:

```jsx
import { MenuConfigProvider } from '@consalud/core';

// Para habilitar el menú dinámico (carga desde API)
<MenuConfigProvider config={{ enableDynamicMenu: true }}>
  {/* Tu aplicación */}
</MenuConfigProvider>

// Para deshabilitar el menú dinámico (solo menú básico)
<MenuConfigProvider>
  {/* Tu aplicación */}
</MenuConfigProvider>
```

## Contribución

Para contribuir a esta biblioteca, por favor sigue estos pasos:

1. Clona el repositorio
2. Instala las dependencias: `npm install`
3. Haz tus cambios
4. Ejecuta las pruebas: `npm test`
5. Construye la biblioteca: `npm run build:lib`
6. Envía un pull request

## Licencia

Este proyecto está licenciado bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.