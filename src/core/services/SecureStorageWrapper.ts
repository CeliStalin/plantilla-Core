/**
 * Este servicio proporciona una capa de abstracción segura sobre el almacenamiento del navegador
 * mientras mantiene la compatibilidad con MSAL
 */

// Constantes para claves de almacenamiento
const SESSION_AUTH_DATA = 'auth_session_data'; // Para datos sensibles (sessionStorage)
const LOCAL_AUTH_FLAG = 'isLogin';             // Bandera de autenticación (localStorage - requerido por sistema actual)
const AUTH_EXPIRY_TIME = 8 * 60 * 60 * 1000;   // 8 horas en milisegundos

// Interfaz para datos de autenticación seguros (solo datos no sensibles)
interface SecureAuthData {
  userId?: string;       // ID de usuario (no sensible)
  isAuthenticated?: boolean; // Estado de autenticación
  displayName?: string;  // Nombre visible (no completo)
  rolesHash?: string;    // Hash de roles, no los roles completos
  expiryTime?: number;   // Tiempo de expiración
}

/**
 * Wrapper seguro para almacenamiento que mantiene compatibilidad con el sistema existente
 */
export class SecureStorageWrapper {
  
  /**
   * Inicializa el estado de autenticación
   * Mantiene la compatibilidad con el sistema existente que requiere localStorage
   * @param isAuthenticated Estado de autenticación
   */
  static setAuthenticationState(isAuthenticated: boolean): void {
    try {
      // Mantener bandera en localStorage para compatibilidad con sistema existente
      localStorage.setItem(LOCAL_AUTH_FLAG, isAuthenticated ? 'true' : 'false');
      
      // Almacenar detalles adicionales en sessionStorage (más seguro)
      const currentData = this.getSecureData() || {};      this.saveSecureData({
        ...currentData,
        isAuthenticated,
        expiryTime: Date.now() + AUTH_EXPIRY_TIME
      });
    } catch (error) {
      // Error silencioso - el sistema de logging manejará esto si es necesario
    }
  }
  
  /**
   * Verifica si el usuario está autenticado
   * @returns true si está autenticado, false en caso contrario
   */
  static isAuthenticated(): boolean {
    try {
      // Verificar primero el flag de localStorage (para compatibilidad)
      const localAuthFlag = localStorage.getItem(LOCAL_AUTH_FLAG);
      if (localAuthFlag !== 'true') {
        return false;
      }
      
      // Verificar datos seguros en sessionStorage
      const secureData = this.getSecureData();
      if (!secureData) {
        return false;
      }
      
      // Verificar expiración
      if (secureData.expiryTime && secureData.expiryTime < Date.now()) {
        this.clearAuthData();
        return false;
      }
        return true;
    } catch (error) {
      // Error silencioso - retornar false en caso de error
      return false;
    }
  }
  
  /**
   * Almacena información segura no sensible del usuario
   * @param userData Datos del usuario (solo información no sensible)
   */
  static saveUserBasicInfo(userData: { id?: string, displayName?: string, roles?: string[] }): void {
    try {
      // Obtener datos actuales
      const currentData = this.getSecureData() || {};
      
      // Crear objeto con datos mínimos y no sensibles
      const secureData: SecureAuthData = {
        ...currentData,
        userId: userData.id,
        displayName: userData.displayName,
        // Si hay roles, crear un hash simple para verificación (no almacenar roles completos)
        rolesHash: userData.roles?.length 
          ? this.simpleHash(userData.roles.join(',')) 
          : currentData.rolesHash,
        expiryTime: Date.now() + AUTH_EXPIRY_TIME
      };
        this.saveSecureData(secureData);
    } catch (error) {
      // Error silencioso
    }
  }
  
  /**
   * Obtiene la información básica del usuario
   * @returns Información básica no sensible
   */
  static getBasicUserInfo(): { userId?: string, displayName?: string } {
    const data = this.getSecureData();
    if (!data) return {};
    
    return {
      userId: data.userId,
      displayName: data.displayName
    };
  }
  
  /**
   * Verifica si el usuario tiene un rol específico sin almacenar los roles
   * @param role Rol a verificar
   * @param actualRoles Roles actuales del usuario (desde memoria, no storage)
   * @returns true si tiene el rol, false en caso contrario
   */
  static hasRole(role: string, actualRoles: string[]): boolean {
    // No usar roles almacenados, solo verificar con los roles proporcionados
    return actualRoles.includes(role);
  }
  
  /**
   * Limpia todos los datos de autenticación
   */
  static clearAuthData(): void {
    // Limpiar localStorage (mantener compatibilidad)
    localStorage.removeItem(LOCAL_AUTH_FLAG);
      // Limpiar sessionStorage (datos seguros)
    sessionStorage.removeItem(SESSION_AUTH_DATA);
  }
  
  /**
   * Extiende el tiempo de expiración de la sesión
   */
  static extendSession(): void {
    const data = this.getSecureData();
    if (data) {
      data.expiryTime = Date.now() + AUTH_EXPIRY_TIME;
      this.saveSecureData(data);
    }
  }
  
  // Métodos privados
  
  /**
   * Guarda datos seguros en sessionStorage
   * @param data Datos a guardar
   */
  private static saveSecureData(data: SecureAuthData): void {
    sessionStorage.setItem(SESSION_AUTH_DATA, JSON.stringify(data));
  }
  
  /**
   * Obtiene datos seguros de sessionStorage
   * @returns Datos almacenados o null si no existen
   */
  private static getSecureData(): SecureAuthData | null {
    const dataStr = sessionStorage.getItem(SESSION_AUTH_DATA);
    if (!dataStr) return null;
      try {
      return JSON.parse(dataStr) as SecureAuthData;
    } catch (error) {
      return null;
    }
  }
  
  /**
   * Crea un hash simple para verificación (no para seguridad criptográfica)
   * @param str Cadena a convertir en hash
   * @returns Hash simple
   */
  private static simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convertir a entero de 32 bits
    }
    return hash.toString(16);
  }
}