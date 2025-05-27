export * from './core/components';
export { AuthProvider } from './core/context/AuthContext';
export { AuthProvider as MsalAuthProvider } from './core/services/auth/authProviderMsal';
export * from './core/hooks';
export * from './core/interfaces';
export * from './core/utils';
export * from './core/routes';
export * from './core/context';
export * from './assets';

// Export services with specific named exports to avoid conflicts
export { AuthService, getMe, getUsuarioAD, getRoles } from './core/services/auth/authService';
export { apiClient } from './core/services/api/apiClient';
export { ApiGetMenus } from './core/services/GetApiArq';

// Export typography system
export * from './core/styles/typography';
export { theme } from './core/styles/theme';
export { TypographyUtils } from './core/styles/typography';

// Asegurar que Typography (componente) se exporte correctamente
export { Typography } from './core/components/Typography';