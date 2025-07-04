import React from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  msalReady?: boolean;
}

function PrivateRoute({ msalReady = true, allowedRoles = [], ...props }: PrivateRouteProps) {
  if (!msalReady) {
    return <>Cargando autenticación...</>;
  }
  const auth = useAuth();
  const { isSignedIn, isInitializing, loading, hasAnyRole } = auth;
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Si no está inicializando y no está autenticado, redirigir a login
    if (!isInitializing && !loading && !isSignedIn) {
      try {
        const currentPath = location.pathname + location.search;
        // Guardar la ruta actual para redireccionar después del login
        sessionStorage.setItem('redirectAfterLogin', currentPath);
        navigate('/login', { replace: true });
      } catch (error) {
        console.error('Error during navigation to login:', error);
        navigate('/login', { replace: true });
      }
      return;
    }
    
    // Verificar roles si es necesario
    if (!isInitializing && !loading && isSignedIn && allowedRoles.length > 0) {
      try {
        const userHasPermission = hasAnyRole(allowedRoles);
        if (!userHasPermission) {
          navigate('/unauthorized', { replace: true });
          return;
        }
      } catch (error) {
        console.error('Error checking roles:', error);
      }
    }
  }, [isSignedIn, isInitializing, loading, hasAnyRole, allowedRoles, navigate, location]);
  
  // Mostrar un indicador de carga mientras verifica
  if (isInitializing || loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column'
      }}>
        <div>Verificando acceso...</div>
      </div>
    );
  }
  
  // Si no está autenticado, no mostrar contenido (se está redirigiendo)
  if (!isSignedIn) {
    return '';
  }
  
  // Verificar roles antes de mostrar contenido
  if (allowedRoles.length > 0 && !hasAnyRole(allowedRoles)) {
    return ''; // Se está redirigiendo a unauthorized
  }
  
  // Si está autenticado y tiene los roles necesarios, mostrar el contenido
  return <>{props.children}</>;
}

export { PrivateRoute };