import { AuthProvider } from './authProviderMsal'; 
import { IUser } from '../../interfaces/IUserAz';
import { UsuarioAd } from '../../interfaces/IUsuarioAD';
import { RolResponse } from '../../interfaces/IRol';
import { mapRawToUsuarioAd } from '../../utils/MapperRawToUsuarioAd';
import { mapRawArrayToRolResponseArray } from '../../utils/MapperRawToRol';

export class AuthService {
  //Agregar método auxiliar para retry con backoff
  private static async retryWithBackoff<T>(
    operation: () => Promise<T>,
    maxRetries: number = 2,
    baseDelay: number = 1000
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        // No reintentar en ciertos tipos de errores
        if (error instanceof Error) {
          if (error.message.includes('No hay una sesión activa') && attempt === 0) {
            // Primer intento fallido por sesión, esperar un poco e intentar de nuevo
            console.log(`[AuthService] Reintentando operación, intento ${attempt + 1}/${maxRetries + 1}`);
            await new Promise(resolve => setTimeout(resolve, baseDelay * Math.pow(2, attempt)));
            continue;
          }
          
          // Errores no recuperables
          if (error.message.includes('401') || 
              error.message.includes('403') || 
              error.message.includes('configuración')) {
            throw error;
          }
        }
        
        if (attempt === maxRetries) {
          break;
        }
        
        // Esperar antes del siguiente intento
        await new Promise(resolve => setTimeout(resolve, baseDelay * Math.pow(2, attempt)));
      }
    }
    
    throw lastError!;
  }

  public static async getMe(): Promise<IUser> {
    return this.retryWithBackoff(async () => {
      try {
        // Asegurarse de que MSAL esté inicializado
        await AuthProvider.initialize();
        
        // Verificar autenticación antes de obtener token
        const isAuthenticated = await AuthProvider.isAuthenticated();
        if (!isAuthenticated) {
          throw new Error('Usuario no autenticado');
        }
        
        // Obtener token
        console.log('[AuthService] Obteniendo token para Microsoft Graph...');
        const token = await AuthProvider.getAccessToken(['user.read']);
        
        console.log('[AuthService] Token obtenido, realizando llamada a Graph API...');
        const response = await fetch('https://graph.microsoft.com/v1.0/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Error al obtener datos del usuario: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('[AuthService] Datos de usuario obtenidos exitosamente:', data.displayName);
        return data;
      } catch (error) {
        console.error('[AuthService] Error en getMe:', error);
        throw error;
      }
    });
  }

  public static async getUsuarioAD(email: string): Promise<UsuarioAd> {
    return this.retryWithBackoff(async () => {
      try {
        const apiUrl = `${import.meta.env.VITE_APP_API_ARQUITECTURA_URL}/Usuario/mail/${email}`;
        const headers = {
          [import.meta.env.VITE_APP_NAME_API_KEY]: import.meta.env.VITE_APP_KEY_PASS_API_ARQ,
          "Content-Type": "application/json; charset=utf-8",
        };
        
        console.log('[AuthService] Obteniendo datos de AD para:', email);
        const response = await fetch(apiUrl, {
          method: "GET",
          headers
        });
        
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        
        const rawData = await response.json();
        const mappedData = mapRawToUsuarioAd(rawData);
        console.log('[AuthService] Datos de AD obtenidos exitosamente');
        return mappedData;
        
      } catch (error) {
        const errorMessage = error instanceof Error 
            ? error.message 
            : String(error);
            
        console.error(`[AuthService] Error al obtener usuario AD para ${email}:`, errorMessage);
        throw new Error(`Error al obtener usuario para ${email}: ${errorMessage}`);
      }
    });
  }

  public static async getRoles(email: string): Promise<RolResponse[]> {
    return this.retryWithBackoff(async () => {
      try {
        const sistema = import.meta.env.VITE_APP_SISTEMA;
        const apiUrl = `${import.meta.env.VITE_APP_API_ARQUITECTURA_URL}/Rol/mail/${email}/app/${sistema}`;
        
        const headers = {
          [import.meta.env.VITE_APP_NAME_API_KEY]: import.meta.env.VITE_APP_KEY_PASS_API_ARQ,
          "Content-Type": "application/json; charset=utf-8",
        };
        
        console.log('[AuthService] Obteniendo roles para:', email);
        const response = await fetch(apiUrl, {
          method: "GET",
          headers
        });
        
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        
        const rawData = await response.json();
        const mappedData = mapRawArrayToRolResponseArray(rawData);
        console.log(`[AuthService] Roles obtenidos exitosamente: ${mappedData.length} roles`);
        return mappedData;
        
      } catch (error) {
        const errorMessage = error instanceof Error 
            ? error.message 
            : String(error);
            
        console.error(`[AuthService] Error al obtener roles para ${email}:`, errorMessage);
        throw new Error(`Error al obtener roles para ${email}: ${errorMessage}`);
      }
    });
  }
}

// Exportar funciones para compatibilidad
export const getMe = () => AuthService.getMe();
export const getUsuarioAD = (email: string) => AuthService.getUsuarioAD(email);
export const getRoles = (email: string) => AuthService.getRoles(email);