import React, { useState, useEffect } from 'react';
// Eliminamos la importación de useHistory o useNavigate
import useAuth from '../../hooks/useAuth';
import { AuthProvider } from '../../services/auth/authProviderMsal';
import { Header } from './components/Header';
import { UserInfo } from './components/UserInfo';
import { ErrorMessages } from './components/ErrorMessages';
import { LoadingDots } from './components/LoadingDots';
import * as styles from './Login.styles';
import { theme } from '../../styles/theme';
import logoIcon from '../../../assets/Logo.png';

const Login: React.FC = () => {
  // Eliminamos useHistory/useNavigate
  // Usamos window.location para obtener los datos de la URL actual
  const location = {
    pathname: window.location.pathname,
    search: window.location.search,
    state: history.state // Esto podría no funcionar exactamente igual que location.state
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
  } = useAuth();

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [redirectMethodUsed, setRedirectMethodUsed] = useState<boolean>(() => {
    // Verifica si ya está guardado en sessionStorage
    const savedMethod = sessionStorage.getItem('authMethod');
    return savedMethod === 'redirect';
  });
  const [isCheckingNetwork, setIsCheckingNetwork] = useState(false);

  // Al montar el componente, verifica si hay un parámetro en la URL que indique redirección
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const fromRedirect = queryParams.get('fromRedirect') === 'true';
    
    if (fromRedirect && !redirectMethodUsed) {
      setRedirectMethodUsed(true);
      AuthProvider.setUseRedirectFlow(true);
    }
  }, [location.search, redirectMethodUsed]);

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

  // Limpiar cache al cargar
  useEffect(() => {
    // Función para limpiar sesiones anteriores
    const clearSessions = async () => {
      if (!isSignedIn && !isInitializing) {
        try {
          // Intentar limpiar sesiones previas 
          if (!redirectMethodUsed) {
            // Solo limpiar localStorage/sessionStorage si no estamos en medio de un flujo de redirección
            // ya que podríamos estar volviendo de una redirección de autenticación
            sessionStorage.removeItem('isLogin');
            localStorage.removeItem('usuario');
            localStorage.removeItem('usuarioAD');
            localStorage.removeItem('roles');
          }
          
          // Limpiar cuentas en MSAL
          await AuthProvider.clearAccounts();
        } catch (error) {
          console.error('Error al limpiar sesiones:', error);
        }
      }
    };
    
    clearSessions();
  }, [isSignedIn, isInitializing, redirectMethodUsed]);

  // Función para verificar acceso a la red corporativa
  const checkNetworkAccess = async (): Promise<boolean> => {
    try {
      setIsCheckingNetwork(true);
      
      // Intentar hacer una solicitud simple a un endpoint de la API
      // Este endpoint debería ser accesible solo desde la red corporativa o VPN
      const apiUrl = import.meta.env.VITE_API_ARQUITECTURA_URL || import.meta.env.VITE_APP_API_ARQUITECTURA_URL;
      
      // Usar un endpoint que devuelva una respuesta rápida, como /health o similar
      // Si no existe un endpoint específico, usa cualquier endpoint conocido
      const testUrl = `${apiUrl}/Usuario/test`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 segundos de timeout
      
      try {
        const response = await fetch(testUrl, {
          method: 'HEAD', // Solo verifica que el servidor responda, sin descargar contenido
          signal: controller.signal,
          headers: {
            // Añadir cualquier header necesario para la API
            [import.meta.env.VITE_NAME_API_KEY || import.meta.env.VITE_APP_NAME_API_KEY]: 
              import.meta.env.VITE_KEY_PASS_API_ARQ || import.meta.env.VITE_APP_KEY_PASS_API_ARQ
          }
        });
        
        clearTimeout(timeoutId);
        
        // Si llegamos aquí, podemos acceder a la API
        return response.status < 500; // Consideramos cualquier respuesta que no sea error del servidor
      } catch (fetchError) {
        clearTimeout(timeoutId);
        console.warn('Error al verificar conectividad con la API:', fetchError);
        
        // Si es un error de CORS, podríamos estar en la red correcta pero con restricciones
        // En ese caso, consideramos que hay acceso a la red
        if (fetchError instanceof TypeError && fetchError.message.includes('CORS')) {
          return true;
        }
        
        return false;
      }
    } catch (error) {
      console.error('Error general al verificar acceso a la red:', error);
      return false;
    } finally {
      setIsCheckingNetwork(false);
    }
  };

  // Función mejorada para login con redirección
  const handleLoginRedirect = async () => {
    setIsLoggingIn(true);
    setLocalError(null);
    
    try {
      // Verificar primero si tiene acceso a la red corporativa
      const hasNetworkAccess = await checkNetworkAccess();
      
      if (!hasNetworkAccess) {
        setLocalError('No es posible iniciar sesión fuera de la red corporativa de Consalud. Por favor, conéctese a la VPN para continuar.');
        setIsLoggingIn(false);
        return;
      }

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

  // Función específica para manejar el logout teniendo en cuenta el método utilizado
  const handleLogout = async () => {
    try {
      // Usar método adecuado según cómo se autenticó
      if (redirectMethodUsed) {
        await AuthProvider.logoutRedirect();
      } else {
        await logout();
      }
    } catch (error) {
      console.error('Error durante logout en componente Login:', error);
      setLocalError(error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <>
      <Header 
        logoUrl={logoIcon}
        altText="Consalud Logo"
      />

      <div className="hero is-fullheight" style={styles.heroWrapper}>
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-narrow">
                <div className="box has-text-centered" style={styles.loginBox}>
                  <h1 className="title has-text-centered" style={styles.titleStyles}>
                    <span style={{ color: theme.colors.black }}>Ingresa al </span>
                    <span style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
                      administrador de devolución a herederos
                    </span>
                  </h1>
                  
                  {loading || isLoggingIn || isInitializing || isCheckingNetwork ? (
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
                            {isCheckingNetwork ? 'Verificando red...' : 'Cargando...'}
                          </span>
                        </button>
                      </div>
                    </div>
                  ) : !isSignedIn ? (
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
                      <p className="help mt-2" style={{ textAlign: 'center', fontSize: '12px', color: '#666' }}>
                        Nota: Para acceder, debe estar conectado a la red de Consalud o usar VPN.
                      </p>
                    </div>
                  ) : (
                    <>
                      <UserInfo usuario={usuario} usuarioAD={usuarioAD} roles={roles} />
                      
                      <div className="field" style={{ width: '100%', marginTop: '24px' }}>
                        <div className="control">
                          <button 
                            className="button is-fullwidth is-primary"
                            style={styles.primaryButton}
                            onClick={handleLogout}
                            disabled={loading}
                          >
                            Cerrar sesión
                          </button>
                        </div>
                      </div>
                    </>
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
    </>
  );
};

export default Login;