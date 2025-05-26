import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import { AuthProvider } from './core/context/AuthContext';
import { MenuConfigProvider } from './core/context/MenuConfigContext';
import { ErrorBoundary } from './core/components/ErrorBoundary/ErrorBoundary';
import { LoadingOverlay } from './core/components/Loading/LoadingOverlay';
import { routes as appRoutes } from './core/routes/routes.config';
import ProtectedRoute from './core/components/ProtectedRoute';

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

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {appRoutes.map((route) => (
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
        ))}
        
        {/* Ruta 404 - Captura cualquier otra ruta no definida */}
        <Route path="*" element={
          <ProtectedRoute
            component={React.lazy(() => import('./core/components/NotFound'))}
            isPublic={true}
          />
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