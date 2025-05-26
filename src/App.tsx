import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './core/context/AuthContext';
import { MenuConfigProvider } from './core/context/MenuConfigContext';
import { ErrorBoundary } from './core/components/ErrorBoundary/ErrorBoundary';
import { LoadingOverlay } from './core/components/Loading/LoadingOverlay';
import { routes as appRoutes } from './core/routes/routes.config';
import ProtectedRoute from './core/components/ProtectedRoute'; // Import the new component
import NotFound from './core/components/NotFound'; // Keep direct import for catch-all

import './core/styles/global.css';
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

// Componente para redirección a Home (si / path should always go to /home)
const RedirectToHome = () => {
  React.useEffect(() => {
    // Using Navigate component is preferred in React Router v6+ for declarative redirects
    // However, for a top-level redirect like this, direct navigation or a Navigate component is fine.
    // For simplicity with existing structure, window.location.href is kept, but consider <Navigate to="/home" replace />
    window.location.href = '/home';
  }, []);
  return <LoadingOverlay show message="Redirigiendo..." />; // Show loader during redirect
};


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Explicit redirect for the root path to /home */}
        <Route path="/" element={<RedirectToHome />} />

        {appRoutes.map((route) => {
          // Skip the root path if it's in appRoutes, as we handle it above
          if (route.path === '/') {
            return null;
          }
          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute
                  component={route.component}
                  roles={route.roles}
                  isPublic={route.public}
                />
              }
            />
          );
        })}
        
        {/* Ruta 404 - Captura cualquier otra ruta no definida in appRoutes */}
        {/* Ensure NotFound is also lazy-loaded if not already, or handle its loading state */}
        <Route path="*" element={
          <Suspense fallback={<LoadingOverlay show message="Cargando..." />}>
            <NotFound />
          </Suspense>
        } />
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