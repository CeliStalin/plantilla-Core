import { AuthProvider } from './authProviderMsal'; 
import { IUser } from '../../interfaces/IUserAz';
import { UsuarioAd } from '../../interfaces/IUsuarioAD';
import { RolResponse } from '../../interfaces/IRol';
import { mapRawToUsuarioAd } from '../../utils/MapperRawToUsuarioAd';
import { mapRawArrayToRolResponseArray } from '../../utils/MapperRawToRol';
import { GetApiArquitectura, GetSistema, GetNameApiKey, GetKeyApiKey } from '@/core/utils/GetEnvVariables';

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
        const token = await AuthProvider.getAccessToken(['user.read']);
        
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
        return data;
      } catch (error) {
        throw error;
      }
    });
  }

  public static async getUserPhoto(): Promise<string | null> {
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
        const token = await AuthProvider.getAccessToken(['user.read']);
        
        const response = await fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          if (response.status === 404) {
            return null;
          }
          throw new Error(`Error al obtener foto: ${response.status} - ${response.statusText}`);
        }

        const blob = await response.blob();
        
        // Convertir blob a base64 para persistencia
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result as string;
            resolve(base64String);
          };
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        return null;
      }
    });
  }

  public static async getUsuarioAD(email: string): Promise<UsuarioAd> {
    return this.retryWithBackoff(async () => {
      try {
        const apiUrl = `${GetApiArquitectura()}/Usuario/mail/${email}`;
        const headers = {
          [GetNameApiKey()]: GetKeyApiKey(),
          "Content-Type": "application/json; charset=utf-8",
        };
        
        const response = await fetch(apiUrl, {
          method: "GET",
          headers
        });
        
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        
        const rawData = await response.json();
        const mappedData = mapRawToUsuarioAd(rawData);
        return mappedData;
        
      } catch (error) {
        const errorMessage = error instanceof Error 
            ? error.message 
            : String(error);
            
        throw new Error(`Error al obtener usuario para ${email}: ${errorMessage}`);
      }
    });
  }

  public static async getRoles(email: string): Promise<RolResponse[]> {
    return this.retryWithBackoff(async () => {
      try {
        const sistema = GetSistema();
        const apiUrl = `${GetApiArquitectura()}/Rol/mail/${email}/app/${sistema.codigo}`;
        
        const headers = {
          [GetNameApiKey()]: GetKeyApiKey(),
          "Content-Type": "application/json; charset=utf-8",
        };
        const response = await fetch(apiUrl, {
          method: "GET",
          headers
        });
        
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        const rawData = await response.json();
        
        const mappedData = mapRawArrayToRolResponseArray(rawData);
        
        return mappedData;
      } catch (error) {
        const errorMessage = error instanceof Error 
            ? error.message 
            : String(error);
        throw new Error(`Error al obtener roles para ${email}: ${errorMessage}`);
      }
    });
  }
}

// Exportar funciones para compatibilidad
export const getMe = () => AuthService.getMe();
export const getUsuarioAD = (email: string) => AuthService.getUsuarioAD(email);
export const getRoles = (email: string) => AuthService.getRoles(email);
export const getUserPhoto = () => AuthService.getUserPhoto();