import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';

interface PublicRouteProps {
  children: React.ReactNode;
  redirectPath?: string;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  redirectPath = '/home'
}) => {
  const { isSignedIn, isInitializing } = useAuth();
  
  useEffect(() => {
    // Si está autenticado y no está inicializando, redirigir
    if (isSignedIn && !isInitializing) {
      // Verificar si hay una ruta guardada para redirigir
      const savedPath = sessionStorage.getItem('redirectAfterLogin');
      const targetPath = savedPath || redirectPath;
      
      // Limpiar la ruta guardada
      if (savedPath) {
        sessionStorage.removeItem('redirectAfterLogin');
      }
      
      window.location.href = targetPath;
    }
  }, [isSignedIn, isInitializing, redirectPath]);
  
  // Mostrar un indicador de carga mientras verifica
  if (isInitializing) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div>Cargando...</div>
      </div>
    );
  }
  
  // Si no está autenticado, mostrar el contenido
  if (!isSignedIn) {
    return <>{children}</>;
  }
  
  // No mostrar nada mientras se procesa la redirección
  return null;
};

export default PublicRoute;