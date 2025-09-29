/**
 * Servicio para gestión segura de tokens de autenticación
 * Complementa la configuración de MSAL para mejorar seguridad
 */

import { PublicClientApplication, AccountInfo, AuthenticationResult } from '@azure/msal-browser';
import { msalConfig } from '../config/msalConfig';

// Caché en memoria para tokens
interface TokenCache {
  accessToken?: string;
  idToken?: string;
  account?: AccountInfo;
  expiresOn?: number;
}

// Instancia de MSAL
let msalInstance: PublicClientApplication | null = null;
// Caché en memoria (no en storage)
let tokenCache: TokenCache = {};

/**
 * Servicio para gestionar tokens de forma segura, minimizando 
 * el uso de sessionStorage/localStorage
 */
export class TokenManagementService {
  /**
   * Inicializa el servicio y configura MSAL
   */
  static async initialize(): Promise<void> {
    if (!msalInstance) {
      msalInstance = new PublicClientApplication(msalConfig);
      await msalInstance.initialize();
      
      // Cargar cuenta después de la inicialización
      await this.loadAccountFromMsal();
    }
  }

  /**
   * Obtiene la instancia de MSAL
   */
  static async getMsalInstance(): Promise<PublicClientApplication> {
    if (!msalInstance) {
      await this.initialize();
    }
    return msalInstance!;
  }

  /**
   * Carga la cuenta desde MSAL y la almacena en memoria
   * @returns La cuenta activa o null
   */
  static async loadAccountFromMsal(): Promise<AccountInfo | null> {
    const instance = await this.getMsalInstance();
    const accounts = instance.getAllAccounts();
    
    if (accounts.length > 0) {
      const account = accounts[0];
      // Almacenar en memoria, no en storage
      tokenCache.account = account;
      return account;
    }
    
    return null;
  }

  /**
   * Verifica si hay una sesión activa
   */
  static async isAuthenticated(): Promise<boolean> {
    // Verificar si tenemos cuenta en caché
    if (tokenCache.account) {
      // Verificar si el token ha expirado
      if (tokenCache.expiresOn && tokenCache.expiresOn > Date.now()) {
        return true;
      }
    }
    
    // Intentar cargar desde MSAL si no hay en caché
    try {
      const account = await this.loadAccountFromMsal();
      return !!account;
    } catch (error) {
      return false;
    }
  }

  /**
   * Obtiene el token de acceso
   * @param scopes Scopes requeridos
   * @returns Token de acceso
   */
  static async getAccessToken(scopes: string[] = ['user.read']): Promise<string> {
    // Verificar si hay token en caché y no ha expirado
    if (tokenCache.accessToken && tokenCache.expiresOn && tokenCache.expiresOn > Date.now() + 60000) {
      return tokenCache.accessToken;
    }
    
    // No hay token o está por expirar, obtener uno nuevo
    try {
      const instance = await this.getMsalInstance();
      const account = tokenCache.account || (await this.loadAccountFromMsal());
      
      if (!account) {
        throw new Error('No hay sesión activa');
      }
      
      // Intentar adquirir token silenciosamente
      const response = await instance.acquireTokenSilent({
        scopes,
        account,
      });
      
      // Guardar en caché de memoria
      this.cacheTokenResponse(response);
      return response.accessToken;
    } catch (error) {
      
      // Limpiar caché si hay error
      this.clearTokenCache();
      throw error;
    }
  }

  /**
   * Limpia la caché de tokens en memoria
   */
  static clearTokenCache(): void {
    tokenCache = {};
  }

  /**
   * Almacena la respuesta de token en caché segura (memoria)
   * @param response Respuesta de autenticación
   */
  private static cacheTokenResponse(response: AuthenticationResult): void {
    if (!response) return;
    
    tokenCache.accessToken = response.accessToken;
    tokenCache.idToken = response.idToken;
    
    // Calcular expiración en base a expiresOn
    if (response.expiresOn) {
      // expiresOn es un objeto Date, convertir a timestamp
      tokenCache.expiresOn = response.expiresOn.getTime();
    } else {
      // Si no hay expiresOn, usar un tiempo de expiración predeterminado (1 hora)
      tokenCache.expiresOn = Date.now() + (3600 * 1000);
    }
    
    if (response.account) {
      tokenCache.account = response.account;
    }
  }
}