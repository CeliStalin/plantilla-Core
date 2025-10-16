import { RolResponse } from '../interfaces/IRol';

/**
 * Obtiene el rol principal del usuario (generalmente el primero)
 */
export const getPrimaryRole = (roles: RolResponse[]): string => {
  return roles.length > 0 ? roles[0].Rol : '';
};

/**
 * Verifica si el usuario tiene un rol específico
 */
export const hasRole = (roles: RolResponse[], roleName: string): boolean => {
  return roles.some(role => role.Rol === roleName);
};

/**
 * Verifica si el usuario tiene alguno de los roles permitidos
 */
export const hasAnyRole = (roles: RolResponse[], allowedRoles: string[]): boolean => {
  if (allowedRoles.length === 0) return true;
  return allowedRoles.some(allowedRole => 
    roles.some(userRole => userRole.Rol === allowedRole)
  );
};

/**
 * Obtiene todos los nombres de roles del usuario
 */
export const getRoleNames = (roles: RolResponse[]): string[] => {
  return roles.map(role => role.Rol);
};

/**
 * Verifica si el usuario tiene algún rol válido
 */
export const hasValidRole = (roles: RolResponse[]): boolean => {
  return roles.length > 0;
};