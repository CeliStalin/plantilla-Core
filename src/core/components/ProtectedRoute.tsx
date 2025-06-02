import React, { Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { LoadingOverlay } from './Loading/LoadingOverlay';

interface ProtectedRouteProps {
  // Make component optional to support children pattern
  component?: React.LazyExoticComponent<React.ComponentType<any>> | React.ComponentType<any>;
  roles?: string[];
  isPublic?: boolean;
  enableTransitions?: boolean;
  // Add children support
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  roles = [],
  isPublic = false,
  enableTransitions = true,
  children
}) => {
  const { 
    isSignedIn, 
    hasAnyRole, 
    isInitializing, 
    loading,
    isLoggingOut 
  } = useAuth();
  const location = useLocation();

  // Validate props - either component or children must be provided
  if (!Component && !children) {
    console.error('ProtectedRoute: Either "component" prop or "children" must be provided');
    return <div>Error: ProtectedRoute requires either component prop or children</div>;
  }

  // Mostrar loading mientras se inicializa la autenticación
  if (isInitializing || loading) {
    return <LoadingOverlay show message="Cargando..." />;
  }

  // Mostrar loading específico para logout
  if (isLoggingOut) {
    return <LoadingOverlay show message="Cerrando sesión..." />;
  }

  // Si es una ruta pública
  if (isPublic) {
    // Si está autenticado y está en login, redirigir a home
    if (isSignedIn && location.pathname === '/login') {
      const savedPath = sessionStorage.getItem('redirectAfterLogin');
      const redirectTo = savedPath || '/home';
      
      if (savedPath) {
        sessionStorage.removeItem('redirectAfterLogin');
      }
      
      return <Navigate to={redirectTo} replace />;
    }
    
    // Renderizar componente público - support both patterns
    if (children) {
      return <>{children}</>;
    }
    
    if (Component) {
      return (
        <Suspense fallback={<LoadingOverlay show message="Cargando..." />}>
          <Component />
        </Suspense>
      );
    }

    // This should never happen due to validation above, but add fallback
    return <div>Error: No component or children provided</div>;
  }

  // Para rutas privadas
  if (!isSignedIn) {
    // Guardar la ruta actual para redirección posterior
    sessionStorage.setItem('redirectAfterLogin', location.pathname);
    return <Navigate to="/login" replace />;
  }

  // Verificar roles si se especifican
  if (roles.length > 0 && !hasAnyRole(roles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Renderizar componente con soporte para transiciones - support both patterns
  const renderComponent = () => {
    // If children are provided, render them directly
    if (children) {
      return <>{children}</>;
    }

    // If component is provided, render with Suspense (for lazy components)
    if (Component) {
      return (
        <Suspense fallback={<LoadingOverlay show message="Cargando..." />}>
          <Component />
        </Suspense>
      );
    }

    // This should never happen due to validation above, but add fallback
    return <div>Error: No component or children provided</div>;
  };

  return renderComponent();
};

export default ProtectedRoute;
