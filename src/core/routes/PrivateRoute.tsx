import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  allowedRoles = []
}) => {
  const { isSignedIn, isInitializing, loading, hasAnyRole } = useAuth();
  
  useEffect(() => {
    // Si no está inicializando y no está autenticado, redirigir a login
    if (!isInitializing && !loading && !isSignedIn) {
      const currentPath = window.location.pathname;
      // Guardar la ruta actual para redireccionar después del login
      sessionStorage.setItem('redirectAfterLogin', currentPath);
      window.location.href = '/login';
    }
    
    // Verificar roles si es necesario
    if (!isInitializing && !loading && isSignedIn && allowedRoles.length > 0) {
      const userHasPermission = hasAnyRole(allowedRoles);
      if (!userHasPermission) {
        window.location.href = '/unauthorized';
      }
    }
  }, [isSignedIn, isInitializing, loading, hasAnyRole, allowedRoles]);
  
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
  
  // Si está autenticado y tiene los roles necesarios, mostrar el contenido
  if (isSignedIn && (allowedRoles.length === 0 || hasAnyRole(allowedRoles))) {
    return <>{children}</>;
  }
  
  // No mostrar nada mientras se procesa la redirección
  return null;
};

export default PrivateRoute;