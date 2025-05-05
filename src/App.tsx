import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthProvider } from './core/context/AuthContext';
import { MenuConfigProvider } from './core/context/MenuConfigContext';
import { ErrorBoundary } from './core/components/ErrorBoundary';
import { LoadingOverlay } from './core/components/Loading/LoadingOverlay';
import { PrivateRoute } from './core/routes/PrivateRoute';
import { PublicRoute } from './core/routes/PublicRoute';
import { routes } from './core/routes/routes.config';
import { AuthProvider as MsalProvider } from './core/services/auth/authProviderMsal';
import './App.css';

// Componente de error genérico
const ErrorFallback = () => (
  <div className="error-container" style={{ padding: '20px', textAlign: 'center' }}>
    <h2>¡Ups! Algo salió mal</h2>
    <p>Ha ocurrido un error inesperado. Intenta recargar la página.</p>
    <button onClick={() => window.location.reload()}>
      Recargar página
    </button>
  </div>
);

const App: React.FC = () => {
  const [isHandlingRedirect, setIsHandlingRedirect] = useState<boolean>(true);
  const [redirectError, setRedirectError] = useState<string | null>(null);

  // Inicializar MSAL al cargar la aplicación
  useEffect(() => {
    const initMsal = async () => {
      try {
        await MsalProvider.initialize();
        console.log("MSAL inicializado correctamente en App");
      } catch (error) {
        console.error("Error al inicializar MSAL en App:", 
          error instanceof Error ? error.message : 'Error desconocido');
      }
    };

    initMsal();
  }, []);

  // Manejar redirecciones de autenticación
  useEffect(() => {
    const handleRedirectPromise = async () => {
      try {
        setIsHandlingRedirect(true);
        console.log("Verificando si hay redirecciones pendientes...");
        
        const response = await MsalProvider.handleRedirectPromise();
        console.log("Respuesta de handleRedirectPromise:", response ? "Recibida" : "No hay respuesta");
        
        if (response) {
          // Determinar si es login o logout y guardar estado
          const isLoginRedirect = response.account !== null;
          console.log("¿Es login de redirección?", isLoginRedirect);
          
          if (isLoginRedirect) {
            localStorage.setItem('isLogin', 'true');
            sessionStorage.setItem('authMethod', 'redirect');
            
            // Si estamos en login, redirigir a la página principal
            if (window.location.pathname.includes('/login')) {
              console.log("Redirigiendo a home después de autenticación");
              // Recuperar la ruta original si existe
              const savedPath = sessionStorage.getItem('loginRedirectPath');
              const targetPath = savedPath && savedPath !== '/login' ? savedPath : '/home';
              
              // Pequeño retraso para permitir que el estado se actualice
              setTimeout(() => {
                window.location.href = targetPath;
              }, 100);
              
              return; // Evitar que se establezca isHandlingRedirect a false hasta que se complete la redirección
            }
          }
        }
      } catch (error) {
        // Evitamos imprimir el objeto de error directamente
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        console.error('Error al manejar redirección de autenticación:', errorMessage);
        setRedirectError(errorMessage);
      } finally {
        setIsHandlingRedirect(false);
      }
    };
    
    handleRedirectPromise();
  }, []);

  // Mostrar loading mientras se maneja la redirección
  if (isHandlingRedirect) {
    return (
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '20px',
        textAlign: 'center'
      }}>
        <LoadingOverlay show message="Verificando sesión..." />
        {redirectError && (
          <div style={{ 
            marginTop: '20px', 
            color: 'red',
            padding: '10px',
            border: '1px solid red',
            borderRadius: '5px',
            background: 'rgba(255,0,0,0.1)'
          }}>
            <p>Error al procesar la autenticación: {redirectError}</p>
            <button 
              onClick={() => window.location.href = '/login'}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                background: '#04A59B',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Volver a intentar
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <AuthProvider>
        <MenuConfigProvider>
          <Router>
            <Suspense fallback={<LoadingOverlay show message="Cargando aplicación..." />}>
              <Switch>
                {/* Ruta raíz redirecciona a /home */}
                <Route exact path="/" render={() => <Redirect to="/home" />} />
                
                {/* Rutas públicas */}
                {routes
                  .filter(route => route.public)
                  .map(route => (
                    <Route
                      key={route.path}
                      path={route.path}
                      render={(props) => (
                        <PublicRoute redirectPath="/home">
                          <route.component {...props} />
                        </PublicRoute>
                      )}
                    />
                  ))}
                
                {/* Rutas privadas */}
                {routes
                  .filter(route => !route.public)
                  .map(route => (
                    <Route
                      key={route.path}
                      path={route.path}
                      render={(props) => (
                        <PrivateRoute allowedRoles={route.roles || []}>
                          <route.component {...props} />
                        </PrivateRoute>
                      )}
                    />
                  ))}
                
                {/* Ruta 404 */}
                <Route render={() => <Redirect to="/404" />} />
              </Switch>
            </Suspense>
          </Router>
        </MenuConfigProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;