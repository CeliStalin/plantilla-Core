// src/core/components/Login/Login.tsx

import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { AuthProvider } from '../../services/auth/authProviderMsal';
import { Header } from './components/Header';
import { UserInfo } from './components/UserInfo';
import { ErrorMessages } from './components/ErrorMessages';
import { LoadingDots } from './components/LoadingDots';
import * as styles from './Login.styles';
import { theme } from '../../styles/theme';
import logoIcon from '../../../assets/Logo.png';

// Añadir la interfaz para las props
interface LoginProps {
  backgroundColor?: string; // Nueva prop para el color de fondo
  boxBackgroundColor?: string; // Opcional: para el cuadro de login
  textColor?: string; // Opcional: para personalizar el color del texto
}

const Login: React.FC<LoginProps> = ({ 
  backgroundColor = '#ffffff', // Valor predeterminado blanco
  boxBackgroundColor, // Si no se proporciona, se usará el predeterminado 
  textColor 
}) => {
  // Usar la función location existente o crear una nueva
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
  } = useAuth();

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [redirectMethodUsed, setRedirectMethodUsed] = useState<boolean>(() => {
    // Verifica si ya está guardado en sessionStorage
    const savedMethod = sessionStorage.getItem('authMethod');
    return savedMethod === 'redirect';
  });
  const [isCheckingNetwork, setIsCheckingNetwork] = useState(false);

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

  // Aplicar los estilos personalizados
  const containerStyles = {
    ...styles.heroWrapper,
    backgroundColor, // Usar la prop proporcionada
  };

  // Corregir el acceso a las propiedades del objeto styles.loginBox
  const loginBoxStyles = {
    ...styles.loginBox,
    background: boxBackgroundColor || styles.loginBox.background, // Usar 'background' en lugar de 'backgroundColor'
  };

  return (
    <>
      <Header 
        logoUrl={logoIcon}
        altText="Consalud Logo"
      />

      <div className="hero is-fullheight" style={containerStyles}>
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-narrow">
                <div className="box has-text-centered" style={loginBoxStyles}>
                  <h1 className="title has-text-centered" style={styles.titleStyles}>
                    <span style={{ color: textColor || theme.colors.black }}>Ingresa al </span>
                    <span style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
                      administrador de devolución a herederos
                    </span>
                  </h1>
                  
                  {/* Implementar el contenido del login según corresponda */}
                  
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
                  ) : isSignedIn ? (
                    // Si el usuario está autenticado, mostrar botón para cerrar sesión 
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
                      <p className="help mt-2" style={{ 
                        textAlign: 'center', 
                        fontSize: '12px', 
                        color: textColor ? textColor : '#666' 
                      }}>
                        Nota: Para acceder, debe estar conectado a la red de Consalud o usar VPN.
                      </p>
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
    </>
  );
};

export default Login;