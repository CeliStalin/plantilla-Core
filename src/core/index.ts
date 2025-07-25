// --- Core Entry Point ---

// Components
export * from './components';

// Contexts
export * from './context';

// Hooks
export * from './hooks';

// Interfaces
export * from './interfaces';

// Theme
export * from './theme';

// Types
export * from './types';

// Assets
export * from '../assets';

// Config
export * from './config/env';
export * from './config/msalConfig';

// Services
export * from './services/api/apiClient';
export * from './services/api/arquitecturaApi';
export * from './services/auth/authService';
export * from './services/logging/logger';
export * from './services/SecureStorageWrapper';
export * from './services/TokenManagementService';
export {
    AuthProvider as MsalAuthProvider,
    initializeMsal,
    isAuthenticated,
    login,
    logout,
    getAccessToken,
    initializeMsalConfig
} from './services/auth/authProviderMsal';

// Utils
export * from './utils/mappers';
export * from './utils/GetEnvVariables';

// --- Types ---
export type { CardProps } from './components/Card/Card.types';
export type { HomePageWithLayoutProps as HomePageProps } from './components/HomePage/HomePage';
export { type MenuCollapseContextType, useMenuCollapse, MenuCollapseProvider } from './context/MenuCollapseContext';
export type { MenuConfigContextType } from './context/menu-config.context';
export type { BreadcrumbItem, BreadcrumbProps, UseBreadcrumbOptions } from './components/Breadcrumb/types';
export type { PageTransitionProps } from './components/PageTransition/PageTransition.types';
export type { UsePageTransitionOptions, UsePageTransitionReturn } from './components/PageTransition/hooks/usePageTransition';
export type { TypographyProps, TypographyVariant, TypographyColor, TypographyWeight, TypographyAlign } from './components/Typography/Typography';

// Interfaces
export type { IAuthConfig, IAuthResponse, IAuthService, ILoginContextState, IExternalAuthState } from './interfaces/IAuth';
export type { ElementMenu } from './interfaces/IMenusElementos';
export type { RawMenusElemento } from './interfaces/IRawMenusElmento';
export type { RawRolResponse } from './interfaces/IRawRolResponse';
export type { RawUsuarioAD } from './interfaces/IRawUsuarioAD';
export type { RolResponse, IRol } from './interfaces/IRol';
export type { Sistema } from './interfaces/ISistema';
export type { IUser, IUsuarioAD as IUserAD, IRol as IUserRole, IAuthState } from './interfaces/IUserAz';
export type { IUserExterno } from './interfaces/IUserExterno';
export type { IUsuarioAD } from './interfaces/IUsuarioAD';
export type { Theme, TextColors, ThemeColors, ThemeTypography } from './theme';
