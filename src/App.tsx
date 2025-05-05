import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import { AuthProvider } from './core/context/AuthContext';
import { MenuConfigProvider } from './core/context/MenuConfigContext';
import { ErrorBoundary } from './core/components/ErrorBoundary/ErrorBoundary';
import { LoadingOverlay } from './core/components/Loading/LoadingOverlay';
import NotFound from './core/components/NotFound';
import HomePage from './core/components/HomePage';
import Login from './core/components/Login/Login';
import Unauthorized from './core/components/Unauthorized';
import Dashboard from './core/components/Dashboard/DashboardPage';
import './App.css';

// Componente de error genérico
const ErrorFallback = () => (
  <div className="error-container" style={{ padding: '20px', textAlign: 'center' }}>
    <h2>¡Ups! Algo salió mal</h2>
    <p>Ha ocurrido un error inesperado. Intenta recargar la página.</p>
    <button onClick={() => window.location.reload()}>
      Recargar página
    </button>
  </div>
);

// Componente para redirección a Home
const RedirectToHome = () => {
  React.useEffect(() => {
    window.location.href = '/home';
  }, []);
  return null;
};

// Componentes para proteger rutas
const ProtectedHome = () => {
  const isAuthenticated = localStorage.getItem('isLogin') === 'true';
  React.useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login';
    }
  }, [isAuthenticated]);
  
  return isAuthenticated ? <HomePage /> : null;
};

const ProtectedDashboard = () => {
  const isAuthenticated = localStorage.getItem('isLogin') === 'true';
  // Verificar roles del usuario
  let userHasRole = false;
  try {
    const storedRoles = localStorage.getItem('roles');
    if (storedRoles) {
      const roles = JSON.parse(storedRoles);
      const roleNames = roles.map((r: any) => r.Rol);
      userHasRole = roleNames.some((r: string) => ['ADMIN', 'Developers'].includes(r));
    }
  } catch (e) {
    console.error('Error al verificar roles:', e);
  }
  
  React.useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login';
    } else if (!userHasRole) {
      window.location.href = '/unauthorized';
    }
  }, [isAuthenticated, userHasRole]);
  
  return (isAuthenticated && userHasRole) ? <Dashboard /> : null;
};

const PublicLogin = () => {
  const isAuthenticated = localStorage.getItem('isLogin') === 'true';
  React.useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/home';
    }
  }, [isAuthenticated]);
  
  return !isAuthenticated ? <Login /> : null;
};

const App = () => {
  // Crear router configurado para v7
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Ruta raíz - Redirige a home */}
        <Route path="/" element={<RedirectToHome />} />
        
        {/* Rutas públicas */}
        <Route path="/login" element={<PublicLogin />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Rutas privadas */}
        <Route path="/home" element={<ProtectedHome />} />
        <Route path="/dashboard" element={<ProtectedDashboard />} />
        
        {/* Ruta 404 - Captura cualquier otra ruta */}
        <Route path="*" element={<NotFound />} />
      </>
    )
  );

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <AuthProvider>
        <MenuConfigProvider>
          <Suspense fallback={<LoadingOverlay show message="Cargando aplicación..." />}>
            <RouterProvider router={router} />
          </Suspense>
        </MenuConfigProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;