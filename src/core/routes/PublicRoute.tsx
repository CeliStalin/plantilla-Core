import React, { useEffect } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import { useAuth } from '@/core/hooks/useAuth';
import { LoadingOverlay } from '@/core/components/Loading/LoadingOverlay';

interface PublicRouteProps {
  children: React.ReactNode;
  redirectPath?: string;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  redirectPath = '/home'
}) => {
  const { isSignedIn, isInitializing } = useAuth();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    // Si el usuario está autenticado y estamos en una ruta pública, registrar evento
    if (isSignedIn && !isInitializing) {
      console.log("Usuario autenticado en ruta pública, redirigiendo a:", redirectPath);
    }
  }, [isSignedIn, isInitializing, redirectPath]);

  if (isInitializing) {
    return <LoadingOverlay show message="Cargando..." />;
  }

  if (isSignedIn) {
    // Obtener la ruta original o usar el redirectPath predeterminado
    const state = location.state as any;
    const from = state?.from?.pathname || redirectPath;
    
    return <Redirect to={from} />;
  }

  return <>{children}</>;
};

export default PublicRoute;