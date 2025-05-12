import { Configuration, LogLevel } from '@azure/msal-browser';

// Configuración mejorada para seguridad
export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_APP_CLIENT_ID || import.meta.env.VITE_CLIENT_ID || '',
    authority: import.meta.env.VITE_APP_AUTHORITY || import.meta.env.VITE_AUTHORITY || '',
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: 'memory', 
    storeAuthStateInCookie: false, 
  },
  system: {
    tokenRenewalOffsetSeconds: 300, // 5 minutos Santes de expiración
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return; // No registrar datos personales
        if (import.meta.env.DEV) {
          switch (level) {
            case LogLevel.Error:
              console.error(message);
              break;
            case LogLevel.Warning:
              console.warn(message);
              break;
            case LogLevel.Info:
              console.info(message);
              break;
            case LogLevel.Verbose:
              console.debug(message);
              break;
          }
        }
      },
      piiLoggingEnabled: false, // Desactivar logging de información personal
    },
    windowHashTimeout: 60000,
    iframeHashTimeout: 6000,
    loadFrameTimeout: 0,
  },
};

// Scopes para la solicitud de login
export const loginRequest = {
  scopes: ['user.read', 'openid', 'profile', 'email', 'offline_access'],
};

// Scopes para acceder a APIs
export const apiRequest = {
  scopes: [`api://${import.meta.env.VITE_API_CLIENT_ID || import.meta.env.VITE_APP_CLIENT_ID}/access_api`],
};