import React, { useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  redirectPath?: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  allowedRoles = [],
  redirectPath = '/login'
}) => {
  const { isSignedIn, isInitializing, loading, hasAnyRole } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    // Registrar evento de verificación de autenticación
    if (!isInitializing && !loading) {
      console.log("PrivateRoute: Estado de autenticación -", 
                  isSignedIn ? "Autenticado" : "No autenticado", 
                  "Ruta:", location.pathname);
    }
  }, [isInitializing, loading, isSignedIn, location.pathname]);
  
  // Si está cargando o inicializando, mostrar un indicador de carga
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

  // Si no está autenticado, redirigir al login
  if (!isSignedIn) {
    console.log("Usuario no autenticado, redirigiendo a login desde:", location.pathname);
    return <Redirect to={{
      pathname: redirectPath,
      state: { from: location }
    }} />;
  }

  // Si se requieren roles específicos, verificar si el usuario tiene al menos uno
  if (allowedRoles.length > 0) {
    // Verificación mejorada de roles utilizando hasAnyRole del hook
    const userHasPermission = hasAnyRole(allowedRoles);
    
    if (!userHasPermission) {
      // Redirigir a página de no autorizado si no tiene los roles
      console.log("Usuario sin roles necesarios, redirigiendo a no autorizado");
      return <Redirect to={{
        pathname: "/unauthorized",
        state: { from: location }
      }} />;
    }
  }

  // Si pasó todas las verificaciones, mostrar el contenido protegido
  return <>{children}</>;
};

export default PrivateRoute;