import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface PublicRouteProps {
  children: React.ReactNode;
  redirectPath?: string;
  msalReady?: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ msalReady = true, ...props }) => {
  if (!msalReady) {
    return <div>Cargando autenticación...</div>;
  }
  const auth = useAuth();
  const { isSignedIn, isInitializing } = auth;
  const navigate = useNavigate();
  
  useEffect(() => {
    // Si está autenticado y no está inicializando, redirigir
    if (isSignedIn && !isInitializing) {
      try {
        // Verificar si hay una ruta guardada para redirigir
        const savedPath = sessionStorage.getItem('redirectAfterLogin');
        const targetPath = savedPath || props.redirectPath || '/home';
        
        // Limpiar la ruta guardada
        if (savedPath) {
          sessionStorage.removeItem('redirectAfterLogin');
        }
        
        navigate(targetPath, { replace: true });
      } catch (error) {
        console.error('Error during navigation:', error);
        // Fallback a la ruta por defecto
        navigate(props.redirectPath || '/home', { replace: true });
      }
    }
  }, [isSignedIn, isInitializing, props.redirectPath, navigate]);
  
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
  
  // Si está autenticado, no mostrar contenido (se está redirigiendo)
  if (isSignedIn) {
    return null;
  }
  
  // Si no está autenticado, mostrar el contenido
  return <>{props.children}</>;
};

export { PublicRoute };