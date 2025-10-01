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
- `DatePicker`: Componente de selección de fechas con navegación completa
- `ErrorBoundary`: Captura errores en componentes hijos
- `LoadingOverlay`: Indicador de carga con superposición
- `ErrorMessage`: Mensajes de error estilizados

### DatePicker

Componente para selección de fechas con navegación completa por días, meses y años.

```tsx
import { DatePicker } from '@consalud/core';

<DatePicker
  label="Fecha de nacimiento"
  value={selectedDate}
  onChange={setSelectedDate}
  error={!!errors.fechaNacimiento}
/>
```

**Características:**
- ✅ Navegación rápida por mes y año
- ✅ Formato de fecha limpio (sin "DE")
- ✅ Rango amplio de años desde 1900 hasta el presente
- ✅ Navegación por rangos de 9 años
- ✅ Ordenamiento: Del año actual hacia atrás
- ✅ Validación de fechas mínimas y máximas
- ✅ Estados de error para formularios
- ✅ Totalmente accesible

**Props disponibles:**
- `value`: `Date | null` - Fecha seleccionada
- `onChange`: `(date: Date | null) => void` - Callback de cambio
- `placeholder`: `string` - Texto placeholder
- `label`: `string` - Etiqueta del campo
- `disabled`: `boolean` - Deshabilitar componente
- `className`: `string` - Clases CSS adicionales
- `minDate`: `Date` - Fecha mínima permitida
- `maxDate`: `Date` - Fecha máxima permitida
- `error`: `boolean` - Estado de error para validación

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

### 🔗 URLs Dinámicas de Accesos Directos

El core soporta URLs dinámicas para los accesos directos basadas en el ambiente. La variable `VITE_AMBIENTE` (o `VITE_APP_AMBIENTE`) determina qué URLs se mostrarán en la página de inicio:

#### Configuración por Ambiente

**Desarrollo** (`.env.development`):
```env
VITE_AMBIENTE=Desarrollo
# Portal Consalud: http://betaportal.consalud.des/login.aspx
```

**Testing** (`.env.test`):
```env
VITE_AMBIENTE=Testing
# Portal Consalud: http://betaportal.consalud.tes/login.aspx
```

**Producción** (`.env.production`):
```env
VITE_AMBIENTE=Produccion
# Portal Consalud: http://betaportal.consalud.net/login.aspx
```

#### URLs Configuradas

- **Mi Intranet**: `https://intranet.consalud.cl` (fija para todos los ambientes)
- **Portal Consalud**: URL variable según el ambiente (ver tabla arriba)

📖 **Documentación completa**: Ver [EXTERNAL_LINKS_URLS.md](./src/core/docs/EXTERNAL_LINKS_URLS.md) para más detalles sobre el uso y personalización.

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

2. Actualiza tu `