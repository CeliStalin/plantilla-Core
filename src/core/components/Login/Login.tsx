import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { AuthProvider } from '../../services/auth/authProviderMsal';
import { Header } from './components/Header';
import { ErrorMessages } from './components/ErrorMessages';
import { LoadingDots } from './components/LoadingDots';
import * as styles from './Login.styles';
import { theme } from '../../styles/theme';

export interface LoginProps { 
  backgroundColor?: string; 
  boxBackgroundColor?: string;
  textColor?: string;
  appName?: string;
  logoSrc: string;
  onLoginSuccess?: () => void;
  msalReady?: boolean;
}

export const Login: React.FC<LoginProps> = ({ msalReady = true, ...props }) => {
  if (!msalReady) {
    return <div>Cargando autenticación...</div>;
  }
  const auth = useAuth();
  const location = {
    pathname: window.location.pathname,
    search: window.location.search,
    state: history.state
  };
  
  const { 
    isSignedIn, 
    usuario, 
    usuarioAD, 
    roles, 
    loading, 
    error, 
    errorAD, 
    errorRoles, 
    logout,
    isInitializing
  } = auth;

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [redirectMethodUsed, setRedirectMethodUsed] = useState<boolean>(() => {
    const savedMethod = sessionStorage.getItem('authMethod');
    return savedMethod === 'redirect';
  });
  
  // Verificar si estamos en medio de un flujo de redirección
  const isInRedirectFlow = () => {
    return window.location.href.includes("code=") || 
           window.location.href.includes("error=") ||
           window.location.href.includes("state=");
  };

  // Limpiar caché al cargar, pero respetando los flujos de redirección
  useEffect(() => {
    const cleanupCacheIfNeeded = async () => {
      if (!isInRedirectFlow()) {
        // Solo limpiar localStorage/sessionStorage si no estamos en medio de un flujo de redirección
        // ya que podríamos estar volviendo de una redirección de autenticación
        try {
          console.log("Limpiando caché local...");
          
          // Mantener solo algunas claves específicas que no deben limpiarse
          const keysToKeep = ['theme', 'language', 'sidebar-collapsed'];
          
          // Limpiar localStorage selectivamente
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && !keysToKeep.includes(key)) {
              localStorage.removeItem(key);
            }
          }
          
          // Limpiar sessionStorage selectivamente (mantener redirectAfterLogin)
          const redirectPath = sessionStorage.getItem('redirectAfterLogin');
          sessionStorage.clear();
          if (redirectPath) {
            sessionStorage.setItem('redirectAfterLogin', redirectPath);
          }
          
          // Limpiar cuentas en MSAL
          await AuthProvider.clearAccounts();
          
          console.log("Caché limpiada correctamente");
        } catch (error) {
          console.error("Error al limpiar caché:", error);
        }
      } else {
        console.log("Se detectó flujo de redirección, omitiendo limpieza de caché");
      }
    };

    cleanupCacheIfNeeded();
  }, []);

  // Comentamos la verificación de acceso a red corporativa
  /*
  useEffect(() => {
    const checkNetworkAccess = async () => {
      if (!isInRedirectFlow() && !isSignedIn) {
        setIsCheckingNetwork(true);
        try {
          // Función para verificar acceso a la red corporativa
          console.log("Verificando acceso a la red corporativa...");
          
          // Intentar hacer una solicitud simple a un endpoint de la API
          // Este endpoint debería ser accesible solo desde la red corporativa o VPN
          const apiUrl = `${import.meta.env.VITE_API_ARQUITECTURA_URL}/health`;
          
          // Usar un endpoint que devuelva una respuesta rápida, como /health o similar
          const response = await fetch(apiUrl, {
            method: 'HEAD',
            headers: {
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache'
            }
          });
          
          // Si llegamos aquí, podemos acceder a la API
          setNetworkAccess(true);
          console.log("Acceso a red corporativa verificado");
          
        } catch (error) {
          if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            console.warn("Sin acceso a la red corporativa:", error);
            setNetworkAccess(false);
          } else if (error instanceof TypeError && error.message.includes('CORS')) {
            // Si es un error de CORS, podríamos estar en la red correcta pero con restricciones
            // En ese caso, consideramos que hay acceso a la red
            console.warn("Error CORS, pero posiblemente en red corporativa:", error);
            setNetworkAccess(true);
          } else {
            console.error("Error al verificar acceso a red:", error);
            setNetworkAccess(null); // Estado indeterminado
          }
        } finally {
          setIsCheckingNetwork(false);
        }
      }
    };

    checkNetworkAccess();
  }, [isSignedIn]);
  */

  // Redirigir al usuario automáticamente si ya está autenticado
  useEffect(() => {
    if (isSignedIn && !isInitializing && !loading) {
      // Intentar obtener el estado guardado en sessionStorage
      const savedRedirectPath = sessionStorage.getItem('redirectAfterLogin');
      
      // Redirigir a la ruta guardada o a /home por defecto
      const redirectTo = savedRedirectPath || '/home';
      console.log(`Usuario ya autenticado en Login, redirigiendo a: ${redirectTo}`);
      
      // Limpiar el path guardado
      if (savedRedirectPath) {
        sessionStorage.removeItem('redirectAfterLogin');
      }
      
      // Usar window.location.href para la redirección
      window.location.href = redirectTo;
    }
  }, [isSignedIn, isInitializing, loading]);

  // Implementar la función handleLoginRedirect
  const handleLoginRedirect = async () => {
    setIsLoggingIn(true);
    setLocalError(null);
    
    try {
      // Establecer método de redirección
      AuthProvider.setUseRedirectFlow(true);
      setRedirectMethodUsed(true);
      
      // Guardar explícitamente el método en sessionStorage
      sessionStorage.setItem('authMethod', 'redirect');
      
      // Registrar la URL actual para redirección posterior
      const currentPath = location.pathname;
      sessionStorage.setItem('loginRedirectPath', currentPath);
      
      // Usar loginRedirect
      await AuthProvider.loginRedirect();
    } catch (error) {
      console.error('Error durante login redirect:', error);
      setLocalError(error instanceof Error ? error.message : String(error));
      setIsLoggingIn(false);
    }
  };

  // Implementar la función handleLogout
  const handleLogout = async () => {
    try {
      // Limpiar estado local primero
      localStorage.removeItem('isLogin');
      localStorage.removeItem('usuario');
      localStorage.removeItem('usuarioAD');
      localStorage.removeItem('roles');
      sessionStorage.removeItem('authMethod');
      
      // Usar método adecuado según cómo se autenticó
      if (redirectMethodUsed) {
        await AuthProvider.logoutRedirect();
      } else {
        await logout();
      }
      
      // Fallback: Redirigir manualmente a /login si los métodos de MSAL fallan
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    } catch (error) {
      console.error('Error durante logout en componente Login:', error);
      setLocalError(error instanceof Error ? error.message : String(error));
      // Fallback: Redirigir manualmente al login en caso de error
      window.location.href = '/login';
    }
  };

  // Ejecutar onLoginSuccess cuando el usuario se autentique exitosamente
  useEffect(() => {
    if (isSignedIn && !isInitializing && !loading && usuario) {
      console.log('Usuario autenticado exitosamente, ejecutando onLoginSuccess');
      if (props.onLoginSuccess) props.onLoginSuccess();
    }
  }, [isSignedIn, isInitializing, loading, usuario, props.onLoginSuccess]);

  // Aplicar los estilos personalizados
  const pageContainerStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: '100vh',
    backgroundColor: props.backgroundColor || '#ffffff',
  };

  const loginBoxStyles = {
    ...styles.loginBox,
    background: props.boxBackgroundColor || styles.loginBox.background,
  };

  // Log de depuración de estado de autenticación y carga
  console.log('[Login] Render', {
    isSignedIn,
    isInitializing,
    loading,
    error,
    errorAD,
    errorRoles,
    usuario,
    usuarioAD,
    roles
  });

  return (
    <div style={pageContainerStyles}>
      <Header logoUrl={props.logoSrc} altText={'Logo'}/>

      <div style={styles.loginContentArea}>
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-narrow">
              <div style={loginBoxStyles}>
                <div style={{ width: '100%', textAlign: 'center' }}>
                  <h1 className="title has-text-centered" style={styles.titleStyles}>
                    <span style={{ color: props.textColor || theme.colors.black }}>Ingresa al </span>
                    <span style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
                      {props.appName}
                    </span>
                  </h1>
                </div>
                
                {loading || isLoggingIn || isInitializing ? (
                  <div className="field" style={{ width: '100%' }}>
                    <div className="control">
                      <button 
                        className="button is-fullwidth is-primary"
                        style={{
                          ...styles.primaryButton,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          minHeight: '48px'
                        }}
                        disabled={true}
                      >
                        <LoadingDots size="small" />
                        <span style={{ marginLeft: '8px' }}>
                          Cargando...
                        </span>
                      </button>
                    </div>
                  </div>
                ) : isSignedIn ? (
                  <div className="field" style={{ width: '100%' }}>
                    <div className="control">
                      <button 
                        className="button is-fullwidth is-danger"
                        style={{
                          ...styles.primaryButton,
                          backgroundColor: theme.colors.danger,
                        }}
                        onClick={handleLogout}
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="field" style={{ width: '100%' }}>
                    <div className="control">
                      <button 
                        className="button is-fullwidth is-primary"
                        style={styles.primaryButton}
                        onClick={handleLoginRedirect}
                        disabled={isLoggingIn}
                      >
                        Iniciar sesión con Azure AD
                      </button>
                    </div>
                    <div style={{ textAlign: 'center', width: '100%' }}>
                      <p className="help mt-2" style={{
                        ...styles.networkWarning.note,
                        color: props.textColor || styles.networkWarning.note.color
                      }}>
                        Nota: Para acceder, debe estar conectado a la red de Consalud o usar VPN.
                      </p>
                    </div>
                  </div>
                )}
                
                <ErrorMessages 
                  error={localError || error || undefined}
                  errorAD={errorAD || undefined}
                  errorRoles={errorRoles || undefined}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};