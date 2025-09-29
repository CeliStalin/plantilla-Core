import { Configuration, LogLevel } from '@azure/msal-browser';
import { GetNameApiKey, GetApiArquitectura } from '@/core/utils/GetEnvVariables';

// Configuración mejorada para seguridad
export const msalConfig: Configuration = {
  auth: {
    clientId: GetNameApiKey() || GetNameApiKey() || '',
    authority: GetApiArquitectura() || GetApiArquitectura() || '',
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
              break;
            case LogLevel.Warning:
              break;
            case LogLevel.Info:
              break;
            case LogLevel.Verbose:
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
  scopes: [`api://${GetNameApiKey() || GetNameApiKey()}/access_api`],
};