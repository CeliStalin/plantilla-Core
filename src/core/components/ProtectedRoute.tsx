import React, { Suspense } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { LoadingOverlay } from './Loading/LoadingOverlay'; // Assuming you have this or a similar loader

interface ProtectedRouteProps {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  roles?: string[];
  isPublic?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, roles, isPublic = false }) => {
  const { isSignedIn, hasAnyRole, isInitializing, loading, isLoggingOut } = useAuth();
  const location = useLocation();

  if (isInitializing || loading) {
    return <LoadingOverlay show message="Verificando acceso..." />;
  }

  if (isLoggingOut) {
    return <LoadingOverlay show message="Cerrando sesión..." />;
  }

  if (isPublic) {
    // For public routes, if user is signed in and tries to access login, redirect to home
    if (isSignedIn && location.pathname === '/login') {
      return <Navigate to="/home" replace />;
    }
    return (
      <Suspense fallback={<LoadingOverlay show message="Cargando página..." />}>
        <Component />
      </Suspense>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && roles.length > 0 && !hasAnyRole(roles)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return (
    <Suspense fallback={<LoadingOverlay show message="Cargando página..." />}>
      <Component />
    </Suspense>
  );
};

export default ProtectedRoute;
