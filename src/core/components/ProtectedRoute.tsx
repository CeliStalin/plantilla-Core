import React, { Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { LoadingOverlay } from './Loading/LoadingOverlay';

interface ProtectedRouteProps {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  roles?: string[];
  isPublic?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  roles = [],
  isPublic = false
}) => {
  const { 
    isSignedIn, 
    hasAnyRole, 
    isInitializing, 
    loading,
    isLoggingOut 
  } = useAuth();
  const location = useLocation();

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
    
    // Renderizar componente público
    return (
      <Suspense fallback={<LoadingOverlay show message="Cargando..." />}>
        <Component />
      </Suspense>
    );
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

  // Renderizar componente protegido
  return (
    <Suspense fallback={<LoadingOverlay show message="Cargando..." />}>
      <Component />
    </Suspense>
  );
};

export default ProtectedRoute;
