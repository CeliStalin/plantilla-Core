import { PublicClientApplication, Configuration, AuthenticationResult, AccountInfo, PopupRequest, RedirectRequest } from '@azure/msal-browser';

// Configuración de MSAL
const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_APP_CLIENT_ID || '',
    authority: import.meta.env.VITE_APP_AUTHORITY || '',
    redirectUri: `${window.location.origin}/login`,
    postLogoutRedirectUri: window.location.origin,
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: true,
  },
};

// Scopes de la aplicación
const loginRequest: PopupRequest | RedirectRequest = {
  scopes: ['user.read', 'openid', 'profile', 'email', 'offline_access'],
  prompt: 'select_account', // Esto fuerza la selección de cuenta
};

// Crear e inicializar la instancia de MSAL
let msalInstance: PublicClientApplication | null = null;
let initializationPromise: Promise<void> | null = null;
let useRedirectFlow = false; // Flag para controlar el flujo

// Inicializar MSAL como una promesa
function initializeMsal(): Promise<void> {
  if (!initializationPromise) {
    // Agregar logs detallados para depuración
    console.log("Iniciando inicialización de MSAL...");
    console.log("Variables de entorno disponibles:", {
      CLIENT_ID: import.meta.env.VITE_APP_CLIENT_ID || 'No disponible',
      AUTHORITY: import.meta.env.VITE_APP_AUTHORITY || 'No disponible',
      CLIENT_ID_ALT: import.meta.env.VITE_CLIENT_ID || 'No disponible',
      AUTHORITY_ALT: import.meta.env.VITE_AUTHORITY || 'No disponible',
      REDIRECT_URI: import.meta.env.VITE_REDIRECT_URI || 'No disponible',
      ENVIRONMENT: import.meta.env.MODE || 'No disponible'
    });
    
    // Verificar si hay alguna variable de entorno disponible en general
    console.log("Todas las variables de entorno:", import.meta.env);

    initializationPromise = (async () => {
      try {
        //  Protección
        if (typeof window === "undefined" || !window.crypto) {
          throw new Error("MSAL solo puede inicializarse en un navegador moderno con soporte para window.crypto");
        }

        // Verificar que la configuración sea válida
        if (!msalConfig.auth.clientId || !msalConfig.auth.authority) {
          console.error('Error: No se encontró configuración válida para MSAL. Verifica las variables de entorno.');
          console.error('Valores actuales de configuración:', {
            clientId: msalConfig.auth.clientId || 'No disponible',
            authority: msalConfig.auth.authority || 'No disponible',
            redirectUri: msalConfig.auth.redirectUri || 'No disponible'
          });
          throw new Error('Configuración de autenticación incompleta');
        }
        
        console.log("Configuración MSAL válida, procediendo a crear instancia...");
        msalInstance = new PublicClientApplication(msalConfig);
        
        console.log("Instancia MSAL creada, iniciando inicialización...");
        try {
          // Importante: esperar a que MSAL se inicialice completamente
          await msalInstance.initialize();
          console.log("Inicialización de MSAL completada exitosamente");
        } catch (initErrorUnknown) {
          // Añadir anotación de tipo para manejar el error desconocido
          const initError = initErrorUnknown as Error;
          console.error("Error durante la inicialización de MSAL:", initError);
          console.error("Detalles del error:", {
            name: initError.name || 'No disponible',
            message: initError.message || 'No disponible',
            stack: initError.stack || 'No disponible'
          });
          throw initError; // Re-lanzar para mantener el flujo original
        }
        
        // Esto ayudará a mantener consistencia entre loginRedirect y logoutRedirect
        const cachedAuthMethod = sessionStorage.getItem('authMethod');
        console.log("Método de autenticación detectado en caché:", cachedAuthMethod || 'No disponible');
        
        if (cachedAuthMethod === 'redirect') {
          useRedirectFlow = true;
          console.log("Se usará flujo de redirección basado en caché");
        }
      } catch (errorUnknown) {
        // Añadir anotación de tipo para manejar el error desconocido
        const error = errorUnknown as Error;
        console.error('Error al inicializar MSAL:', error);
        
        // Agregamos más información detallada sobre el error
        console.error('Nombre del error:', error.name || 'No disponible');
        console.error('Mensaje del error:', error.message || 'No disponible');
        console.error('Stack trace:', error.stack || 'No disponible');
        
        // Verificar si es un error relacionado con la red
        if (error.message?.includes('network') || error.message?.includes('conexión') || 
            error.message?.includes('connection') || error.message?.includes('red')) {
          console.error('Parece ser un error de red. Verifica la conexión a internet o VPN');
        }
        
        // Verificar si es un error de formato de URL
        if (error.message?.includes('URL') || error.message?.includes('uri') || 
            error.message?.includes('redirect')) {
          console.error('Posible error en el formato de la URL de redirección');
        }
        
        msalInstance = null;
        throw new Error('No se pudo inicializar la autenticación: ' + (error.message || String(errorUnknown)));
      }
    })();
  }
  return initializationPromise;
}

// Obtener la instancia de MSAL ya inicializada
async function getMsalInstance(): Promise<PublicClientApplication> {
  if (!msalInstance) {
    await initializeMsal();
  }
  if (!msalInstance) {
    throw new Error('No se pudo inicializar MSAL');
  }
  return msalInstance;
}

// Clase para gestionar la autenticación
export class AuthProvider {
  // Inicializar el proveedor de autenticación
  public static async initialize(): Promise<void> {
    await initializeMsal();
  }

  // Obtener la instancia de autenticación
  public static async getInstance(): Promise<PublicClientApplication> {
    return await getMsalInstance();
  }

  // Verificar si el usuario está autenticado
  public static async isAuthenticated(): Promise<boolean> {
    try {
      const instance = await getMsalInstance();
      const accounts = instance.getAllAccounts();
      
      // Verificar tanto cuentas MSAL como localStorage
      const hasAccounts = accounts.length > 0;
      const isLoginInStorage = localStorage.getItem('isLogin') === 'true';
      
      // MEJORA: Verificar que la cuenta activa sea válida
      if (hasAccounts) {
        const activeAccount = accounts[0];
        // Verificar que la cuenta tenga los datos mínimos necesarios
        const isValidAccount = activeAccount && 
          activeAccount.homeAccountId && 
          (activeAccount.username || activeAccount.localAccountId);
        
        if (!isValidAccount) {
          console.warn('[AuthProvider] Cuenta inválida detectada, limpiando...');
          await this.clearAccounts();
          localStorage.removeItem('isLogin');
          return false;
        }
        
        // Establecer cuenta activa si no está establecida
        if (!instance.getActiveAccount()) {
          instance.setActiveAccount(activeAccount);
        }
      }
      
      const isAuthenticated = hasAccounts || isLoginInStorage;
      
      // MEJORA: Sincronizar estados si hay inconsistencia
      if (hasAccounts && !isLoginInStorage) {
        localStorage.setItem('isLogin', 'true');
      } else if (!hasAccounts && isLoginInStorage) {
        localStorage.removeItem('isLogin');
        return false;
      }
      
      return isAuthenticated;
    } catch (error) {
      console.error('[AuthProvider] Error al verificar autenticación:', error);
      return false;
    }
  }

  // Obtener cuenta activa
  public static async getActiveAccount(): Promise<AccountInfo | null> {
    try {
      const instance = await getMsalInstance();
      let activeAccount = instance.getActiveAccount();
      
      // Si no hay cuenta activa pero hay cuentas disponibles, establecer la primera
      if (!activeAccount) {
        const accounts = instance.getAllAccounts();
        if (accounts.length > 0) {
          activeAccount = accounts[0];
          instance.setActiveAccount(activeAccount);
          console.log('[AuthProvider] Estableciendo cuenta activa:', activeAccount.username);
        }
      }
      
      return activeAccount;
    } catch (error) {
      console.error('[AuthProvider] Error al obtener cuenta activa:', error);
      return null;
    }
  }

  // Limpiar la caché de cuentas
  public static async clearAccounts(): Promise<void> {
    try {
      const instance = await getMsalInstance();
      const accounts = instance.getAllAccounts();
      
      for (const account of accounts) {
        // Solo intentamos limpiar aquí, no hacemos logout todavía
        console.log(`Limpiando cuenta: ${account.username}`);
        instance.setActiveAccount(null);
      }
    } catch (error) {
      console.error('Error al limpiar cuentas:', error);
    }
  }

  // Método para establecer el tipo de flujo (popup o redirect)
  public static setUseRedirectFlow(value: boolean): void {
    useRedirectFlow = value;
    // Guardar en sessionStorage para mantener consistencia entre navegaciones
    sessionStorage.setItem('authMethod', value ? 'redirect' : 'popup');
  }

  // Método para obtener el tipo de flujo actual
  public static isUsingRedirectFlow(): boolean {
    return useRedirectFlow;
  }

  // Iniciar sesión
  public static async login(): Promise<void> {
    try {
      await this.clearAccounts(); // Limpiar sesiones anteriores
      
      const instance = await getMsalInstance();
      
      if (useRedirectFlow) {
        await instance.loginRedirect({
          ...loginRequest,
          redirectUri: msalConfig.auth.redirectUri,
          prompt: 'select_account' // Forzar selección de cuenta
        });
      } else {
        const loginResponse = await instance.loginPopup({
          ...loginRequest,
          redirectUri: msalConfig.auth.redirectUri,
          prompt: 'select_account' // Forzar selección de cuenta
        });
        
        console.log('Login exitoso con respuesta:', loginResponse);
        
        // Guardar estado de autenticación en localStorage
        if (loginResponse && loginResponse.account) {
          localStorage.setItem('isLogin', 'true');
        }
      }
    } catch (error) {
      console.error('Error durante login:', error);
      throw error;
    }
  }

  // Método específico para login con redirección
  public static async loginRedirect(): Promise<void> {
    try {
      // Establecer el flujo como redirección para todas las operaciones futuras
      this.setUseRedirectFlow(true);
      
      await this.clearAccounts(); // Limpiar sesiones anteriores
      
      const instance = await getMsalInstance();
      await instance.loginRedirect({
        ...loginRequest,
        redirectUri: msalConfig.auth.redirectUri,
        prompt: 'select_account' // Forzar selección de cuenta
      });
    } catch (error) {
      console.error('Error durante loginRedirect:', error);
      throw error;
    }
  }
  
  // Manejar el resultado de la redirección
  public static async handleRedirectPromise(): Promise<AuthenticationResult | null> {
    try {
      const instance = await getMsalInstance();
      const response = await instance.handleRedirectPromise();
      
      // Si obtenemos una respuesta válida, asegurémonos de guardar el estado
      if (response && response.account) {
        console.log("Autenticación por redirección completada, cuenta:", response.account.username);
        localStorage.setItem('isLogin', 'true');
        
        // Guardar método de autenticación para consistencia
        sessionStorage.setItem('authMethod', 'redirect');
      }
      
      return response;
    } catch (error) {
      console.error('Error al manejar redirección:', error);
      return null;
    }
  }

  // Cerrar sesión
  public static async logout(): Promise<void> {
    try {
      const instance = await getMsalInstance();
      const account = await this.getActiveAccount();
      
      // Limpiar estado local ANTES del logout de MSAL
      localStorage.removeItem('isLogin');
      localStorage.removeItem('usuario');
      localStorage.removeItem('usuarioAD');
      localStorage.removeItem('roles');
      sessionStorage.removeItem('authMethod');
      
      if (account) {
        const logoutRequest = {
          account: account,
          postLogoutRedirectUri: `${window.location.origin}/login`  // Redirigir directamente al login
        };
        
        // Usar el mismo tipo de flujo que se utilizó para el inicio de sesión
        if (useRedirectFlow) {
          await instance.logoutRedirect(logoutRequest);
        } else {
          await instance.logoutPopup(logoutRequest);
          // Forzar redirección manual después del popup
          window.location.href = `${window.location.origin}/login`;
        }
      } else {
        console.warn('No hay cuenta activa para cerrar sesión');
        // Redirección manual al login
        window.location.href = `${window.location.origin}/login`;
      }
    } catch (error) {
      console.error('Error durante logout:', error);
      // Asegurar la limpieza y redirección incluso en caso de error
      localStorage.removeItem('isLogin');
      localStorage.removeItem('usuario');
      localStorage.removeItem('usuarioAD');
      localStorage.removeItem('roles');
      sessionStorage.removeItem('authMethod');
      window.location.href = `${window.location.origin}/login`;
      throw error;
    }
  }

  // Método específico para logout con redirección
  public static async logoutRedirect(): Promise<void> {
    try {
      const instance = await getMsalInstance();
      const account = await this.getActiveAccount();
      
      // Limpiar estado local ANTES del logout de MSAL
      localStorage.removeItem('isLogin');
      localStorage.removeItem('usuario');
      localStorage.removeItem('usuarioAD');
      localStorage.removeItem('roles');
      sessionStorage.removeItem('authMethod');
      
      if (account) {
        const logoutRequest = {
          account: account,
          postLogoutRedirectUri: `${window.location.origin}/login`  // Redirigir directamente al login
        };
        
        await instance.logoutRedirect(logoutRequest);
      } else {
        console.warn('No hay cuenta activa para cerrar sesión');
        // Redirección manual al login
        window.location.href = `${window.location.origin}/login`;
      }
    } catch (error) {
      console.error('Error durante logoutRedirect:', error);
      // Asegurar la limpieza y redirección incluso en caso de error
      localStorage.removeItem('isLogin');
      localStorage.removeItem('usuario');
      localStorage.removeItem('usuarioAD');
      localStorage.removeItem('roles');
      sessionStorage.removeItem('authMethod');
      window.location.href = `${window.location.origin}/login`;
      throw error;
    }
  }

  // Obtener token de acceso
  public static async getAccessToken(scopes: string[] = []): Promise<string> {
    try {
      const instance = await getMsalInstance();
      const account = await this.getActiveAccount();
      
      if (!account) {
        console.error('[AuthProvider] No hay cuenta activa para obtener token');
        // MEJORA: Intentar verificar si realmente está autenticado
        const isAuth = await this.isAuthenticated();
        if (!isAuth) {
          throw new Error('No hay una sesión activa');
        } else {
          // Hay inconsistencia, intentar obtener cuenta nuevamente
          const retryAccount = await this.getActiveAccount();
          if (!retryAccount) {
            throw new Error('No se pudo establecer cuenta activa');
          }
        }
      }
      
      const finalAccount = account || await this.getActiveAccount();
      if (!finalAccount) {
        throw new Error('No hay una sesión activa');
      }
      
      const tokenRequest = {
        scopes: scopes.length > 0 ? scopes : loginRequest.scopes,
        account: finalAccount,
      };
      
      try {
        console.log('[AuthProvider] Intentando obtener token silenciosamente...');
        const response: AuthenticationResult = await instance.acquireTokenSilent(tokenRequest);
        console.log('[AuthProvider] Token obtenido exitosamente');
        return response.accessToken;
      } catch (silentError) {
        console.warn('[AuthProvider] Fallo token silencioso, intentando método interactivo:', silentError);
        
        if (useRedirectFlow) {
          // Si estamos en flujo de redirección, no podemos esperar una respuesta inmediata
          await instance.acquireTokenRedirect(tokenRequest);
          throw new Error('Redirect in progress for token acquisition');
        } else {
          console.log('[AuthProvider] Intentando token con popup...');
          const response = await instance.acquireTokenPopup(tokenRequest);
          console.log('[AuthProvider] Token obtenido con popup exitosamente');
          return response.accessToken;
        }
      }
    } catch (error) {
      console.error('[AuthProvider] Error al obtener access token:', error);
      throw error;
    }
  }
}

// Inicializar MSAL automáticamente al cargar este módulo
initializeMsal().catch(error => {
  console.error('Failed to initialize MSAL:', error);
});

// Funciones de compatibilidad para el código existente
export async function isAuthenticated(): Promise<boolean> {
  return await AuthProvider.isAuthenticated();
}

export async function login(): Promise<void> {
  return await AuthProvider.login();
}

export async function logout(): Promise<void> {
  return await AuthProvider.logout();
}

export async function getAccessToken(scopes?: string[]): Promise<string> {
  return await AuthProvider.getAccessToken(scopes);
}