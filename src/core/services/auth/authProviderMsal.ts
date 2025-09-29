import { PublicClientApplication, Configuration, AuthenticationResult, AccountInfo, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { GetMsalAuthority, GetMsalClientId, GetNameApiKey, GetApiArquitectura } from '@/core/utils/GetEnvVariables';

let msalConfig: Configuration | null = null;
let msalInstance: PublicClientApplication | null = null;
let initializationPromise: Promise<void> | null = null;
let useRedirectFlow = false;

export function initializeMsalConfig() {
  msalConfig = {
    auth: {
      clientId: GetMsalClientId() || '',
      authority: GetMsalAuthority() || '',
      redirectUri: `${window.location.origin}/login`,
      postLogoutRedirectUri: window.location.origin,
      navigateToLoginRequestUrl: true,
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: true,
    },
  };
  msalInstance = null;
  initializationPromise = null;
}

function getMsalConfigOrThrow(): Configuration {
  if (!msalConfig) {
    throw new Error('MSAL config not initialized. Call initializeMsalConfig() after setCoreEnvConfig.');
  }
  return msalConfig;
}

function getMsalInstanceOrThrow(): PublicClientApplication {
  if (!msalInstance) {
    throw new Error('MSAL instance not initialized. Call initializeMsal() after initializeMsalConfig().');
  }
  return msalInstance;
}

export function initializeMsal(): Promise<void> {
  if (!initializationPromise) {
    if (!msalConfig) {
      throw new Error('MSAL config not initialized. Call initializeMsalConfig() after setCoreEnvConfig.');
    }
    // Inicialización de MSAL
    

    initializationPromise = (async () => {
      try {
        //  Protección
        if (typeof window === "undefined" || !window.crypto) {
          throw new Error("MSAL solo puede inicializarse en un navegador moderno con soporte para window.crypto");
        }

        // Verificar que la configuración sea válida
        if (!msalConfig.auth.clientId || !msalConfig.auth.authority) {
          throw new Error('Configuración de autenticación incompleta');
        }
        
        msalInstance = new PublicClientApplication(msalConfig);
        try {
          // Importante: esperar a que MSAL se inicialice completamente
          await msalInstance.initialize();
        } catch (initErrorUnknown) {
          // Añadir anotación de tipo para manejar el error desconocido
          const initError = initErrorUnknown as Error;
          throw initError; // Re-lanzar para mantener el flujo original
        }
        
        // Esto ayudará a mantener consistencia entre loginRedirect y logoutRedirect
        const cachedAuthMethod = sessionStorage.getItem('authMethod');
        
        if (cachedAuthMethod === 'redirect') {
          useRedirectFlow = true;
        }
      } catch (errorUnknown) {
        // Añadir anotación de tipo para manejar el error desconocido
        const error = errorUnknown as Error;
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

const getDefaultScopes = (): string[] => [
  'user.read', 'openid', 'profile', 'email', 'offline_access'
];

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
      
      // Verificar que la cuenta activa sea válida
      if (hasAccounts) {
        const activeAccount = accounts[0];
        // Verificar que la cuenta tenga los datos mínimos necesarios
        const isValidAccount = activeAccount && 
          activeAccount.homeAccountId && 
          (activeAccount.username || activeAccount.localAccountId);
        
        if (!isValidAccount) {
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
      
      //Sincronizar estados si hay inconsistencia
      if (hasAccounts && !isLoginInStorage) {
        localStorage.setItem('isLogin', 'true');
      } else if (!hasAccounts && isLoginInStorage) {
        localStorage.removeItem('isLogin');
        return false;
      }
      
      return isAuthenticated;
    } catch (error) {
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
        }
      }
      
      return activeAccount;
    } catch (error) {
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
        instance.setActiveAccount(null);
      }
    } catch (error) {
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
          scopes: getDefaultScopes(),
          redirectUri: getMsalConfigOrThrow().auth.redirectUri,
          prompt: 'select_account',
        });
      } else {
        const loginResponse = await instance.loginPopup({
          scopes: getDefaultScopes(),
          redirectUri: getMsalConfigOrThrow().auth.redirectUri,
          prompt: 'select_account',
        });
        
        
        // Guardar estado de autenticación en localStorage
        if (loginResponse && loginResponse.account) {
          localStorage.setItem('isLogin', 'true');
        }
      }
    } catch (error) {
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
        scopes: getDefaultScopes(),
        redirectUri: getMsalConfigOrThrow().auth.redirectUri,
        prompt: 'select_account',
      });
    } catch (error) {
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
        localStorage.setItem('isLogin', 'true');
        
        // Guardar método de autenticación para consistencia
        sessionStorage.setItem('authMethod', 'redirect');
      }
      
      return response;
    } catch (error) {
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
        // Redirección manual al login
        window.location.href = `${window.location.origin}/login`;
      }
    } catch (error) {
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
        // Redirección manual al login
        window.location.href = `${window.location.origin}/login`;
      }
    } catch (error) {
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
        //Intentar verificar si realmente está autenticado
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
        scopes: scopes.length > 0 ? scopes : getDefaultScopes(),
        account: finalAccount,
      };
      
      try {
        const response: AuthenticationResult = await instance.acquireTokenSilent(tokenRequest);
        return response.accessToken;
      } catch (silentError) {
        
        if (useRedirectFlow) {
          // Si estamos en flujo de redirección, no podemos esperar una respuesta inmediata
          await instance.acquireTokenRedirect(tokenRequest);
          throw new Error('Redirect in progress for token acquisition');
        } else {
          const response = await instance.acquireTokenPopup(tokenRequest);
          return response.accessToken;
        }
      }
    } catch (error) {
      throw error;
    }
  }
}

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