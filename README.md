# @consalud/core

Una biblioteca central de componentes, hooks y utilidades para aplicaciones React en Consalud.

![Versión](https://img.shields.io/badge/versión-0.1.0-blue)
![Licencia](https://img.shields.io/badge/licencia-Privada-red)

## 📋 Contenido

- [Instalación](#instalación)
- [Estructura](#estructura)
- [Componentes](#componentes)
- [Hooks](#hooks)
- [Servicios](#servicios)
- [Contextos](#contextos)
- [Autenticación](#autenticación)
- [Routing](#routing)
- [Theming](#theming)
- [Desarrollo](#desarrollo)
- [Producción](#producción)

## 🚀 Instalación

Para instalar la biblioteca en tu proyecto:

```bash
npm install --save @consalud/core

# O usando yarn
yarn add @consalud/core
```

### Dependencias

Esta biblioteca requiere las siguientes dependencias peer:

```json
"peerDependencies": {
  "@azure/msal-browser": "^4.11.0",
  "bulma": "^1.0.3",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-router-dom": "^7.4.0"
}
```

Asegúrate de tenerlas instaladas en tu proyecto.

## 📂 Estructura

La biblioteca está organizada en los siguientes módulos principales:

```
@consalud/core/
├── components/     # Componentes reutilizables
├── hooks/          # Hooks personalizados
├── services/       # Servicios para API, autenticación, etc.
├── utils/          # Utilidades y helpers
├── context/        # Providers y contextos
├── interfaces/     # Interfaces y tipos TypeScript
├── routes/         # Componentes para enrutamiento
└── styles/         # Estilos y temas
```

## 🧩 Componentes

### Layout

Componentes de diseño y estructura de la aplicación:

```jsx
import { Layout, Header } from '@consalud/core';

const MyPage = () => (
  <Layout pageTitle="Mi Página">
    <div>Contenido de la página</div>
  </Layout>
);
```

### UI Components

Componentes de interfaz de usuario:

```jsx
import { Button, Card, ErrorMessage } from '@consalud/core';

const MyComponent = () => (
  <Card title="Ejemplo">
    <p>Contenido de la tarjeta</p>
    <Button variant="primary" onClick={() => alert('Hola')}>
      Haz clic
    </Button>
    <ErrorMessage message="Mensaje de error" type="warning" />
  </Card>
);
```

### Navigation

```jsx
import { NavMenuApp } from '@consalud/core';

const MySidebar = () => (
  <NavMenuApp onToggle={(collapsed) => console.log('Menu colapsado:', collapsed)} />
);
```

### Authentication

```jsx
import { UserLoginApp } from '@consalud/core';

const MyHeader = () => (
  <header>
    <h1>Mi Aplicación</h1>
    <UserLoginApp />
  </header>
);
```

## 🪝 Hooks

### useAuth

Hook para gestión de autenticación:

```jsx
import { useAuth } from '@consalud/core';

const ProfilePage = () => {
  const { isSignedIn, usuario, logout, hasRole } = useAuth();
  
  if (!isSignedIn) return <p>Debe iniciar sesión</p>;
  
  return (
    <div>
      <h1>Bienvenido, {usuario?.displayName}</h1>
      {hasRole('ADMIN') && <p>Has iniciado sesión como administrador</p>}
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
};
```

### useLocalStorage

Hook para persistir datos en localStorage:

```jsx
import { useLocalStorage } from '@consalud/core';

const PreferencesComponent = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <div>
      <p>Tema actual: {theme}</p>
      <button onClick={() => setTheme('dark')}>Cambiar a oscuro</button>
      <button onClick={() => setTheme('light')}>Cambiar a claro</button>
    </div>
  );
};
```

## 🔌 Servicios

### API Client

Cliente HTTP para llamadas a la API:

```jsx
import { apiClient } from '@consalud/core';

const fetchData = async () => {
  try {
    const data = await apiClient.get('/endpoint');
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Auth Service

Servicio para operaciones de autenticación:

```jsx
import { AuthProvider, getMe } from '@consalud/core';

const initializeAuth = async () => {
  await AuthProvider.initialize();
  const isAuthenticated = await AuthProvider.isAuthenticated();
  
  if (isAuthenticated) {
    const userData = await getMe();
    console.log('Usuario actual:', userData);
  }
};
```

## 🔄 Contextos

### AuthContext

Proveedor de contexto para autenticación:

```jsx
import { AuthProvider } from '@consalud/core';

const App = () => (
  <AuthProvider>
    <MyApp />
  </AuthProvider>
);
```

### MenuConfigContext

Configuración del menú de navegación:

```jsx
import { MenuConfigProvider } from '@consalud/core';

const App = () => (
  <MenuConfigProvider config={{ enableDynamicMenu: true }}>
    <MyApp />
  </MenuConfigProvider>
);
```

## 🔒 Autenticación

La biblioteca incluye una implementación completa de autenticación con Azure AD:

```jsx
import { Login, SecureLayout } from '@consalud/core';

// Componente de login
const LoginPage = () => <Login />;

// Layout seguro que verifica autenticación y roles
const ProtectedPage = () => (
  <SecureLayout allowedRoles={['ADMIN', 'USER']}>
    <div>Esta página requiere autenticación y roles específicos</div>
  </SecureLayout>
);
```

## 🛣️ Routing

Componentes para gestión de rutas protegidas:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PrivateRoute, PublicRoute } from '@consalud/core';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      
      <Route path="/dashboard" element={
        <PrivateRoute allowedRoles={['ADMIN']}>
          <DashboardPage />
        </PrivateRoute>
      } />
    </Routes>
  </BrowserRouter>
);
```

## 🎨 Theming

Sistema de temas para mantener una apariencia consistente:

```jsx
import { theme } from '@consalud/core';

const CustomComponent = () => (
  <div style={{ 
    color: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    boxShadow: theme.shadows.sm
  }}>
    Componente con estilos del tema
  </div>
);
```

## 💻 Desarrollo

Para contribuir al desarrollo de esta biblioteca:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/consalud/core.git
   cd core
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Ejecuta en modo desarrollo:
   ```bash
   npm run dev
   ```

4. Para construir la biblioteca:
   ```bash
   npm run build:lib
   ```

### Testing

Para ejecutar las pruebas:

```bash
npm test
```

## 🏭 Producción

### Publicación

Para publicar una nueva versión:

1. Actualiza la versión en `package.json`
2. Ejecuta:
   ```bash
   npm run build:lib
   npm publish
   ```

### Uso en Proyectos

Para usar esta biblioteca en otros proyectos de Consalud:

1. Instala la biblioteca
2. Importa los componentes y utilidades necesarios
3. Configura los providers en el punto de entrada de tu aplicación:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider, MenuConfigProvider } from '@consalud/core';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <MenuConfigProvider>
        <App />
      </MenuConfigProvider>
    </AuthProvider>
  </React.StrictMode>
);
```

## 📝 Licencia

Este proyecto es propiedad de Consalud y su uso está restringido según las políticas internas de la empresa.