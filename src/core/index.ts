// --- Core Entry Point ---

// Components
export { Breadcrumb } from './components/Breadcrumb/Breadcrumb';
export { Button } from './components/Button/Button';
export { Card } from './components/Card/Card';
export { Counter } from './components/Counter';
export { DashboardFallback } from './components/Dashboard';
export { default as DashboardPage } from './components/Dashboard/DashboardPage';
export { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
export { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
export { Footer } from './components/Footer/Footer';
export { HomePage } from './components/HomePage/HomePage';
export { Layout } from './components/Layout/Layout';
export { LoadingDots } from './components/Loading/LoadingDots';
export { LoadingOverlay } from './components/Loading/LoadingOverlay';
export { LoadingSpinner } from './components/Loading/LoadingSpinner';
export { default as Login } from './components/Login/Login';
export { default as MainPage } from './components/MainPage';
export { default as NavMenuApp } from './components/NavMenu/NavMenuApp';
export { default as NotFound } from './components/NotFound';
export { PageTransition } from './components/PageTransition/PageTransition';
export { default as ProtectedRoute } from './components/ProtectedRoute';
export { default as SecureLayout } from './components/SecureLayout/SecureLayout';
export { Typography } from './components/Typography/Typography';
export { default as Unauthorized } from './components/Unauthorized';
export { UserLoginApp } from './components/UserLogin/UserLoginApp';


// Contexts
export { AuthProvider, useAuthContext } from './context/AuthContext';
export { MenuCollapseProvider, useMenuCollapse } from './context/MenuCollapseContext';
export { MenuConfigProvider } from './context/menu-config-provider';
export { useMenuConfig } from './context/use-menu-config';


// Hooks
export { useAuth } from './hooks/useAuth';
export { useBreadcrumb } from './components/Breadcrumb/useBreadcrumb';
export { usePageTransition } from './components/PageTransition/hooks/usePageTransition';
export { default as useLocalStorage } from './hooks/useLocalStorage';
export { useTypography, useTypographyCSS, useTypographyVariables } from './hooks/useTypography';


// Services
export { ApiClient } from './services/api/apiClient';
export { ArquitecturaApi } from './services/api/arquitecturaApi';
export { AuthProvider as MsalAuthProvider, initializeMsal } from './services/auth/authProviderMsal';
export { AuthService } from './services/auth/authService';


// Theme & Styles
export { theme, defaultTheme } from './theme/index';
export { theme as styleTheme } from './styles/theme';


// Utils
// Note: Assuming GetEnvVariables exports these functions correctly.
// Check ./utils/GetEnvVariables if there are issues.
// export { GetAmbiente, GetApiArquitectura, GetKeyApiKey, GetNameApiKey, GetSistema, GetTimeout, GetMsalAuthority, GetMsalClientId } from './utils/GetEnvVariables';

// --- Types ---
export type { CardProps } from './components/Card/Card.types';
export type { HomePageWithLayoutProps as HomePageProps } from './components/HomePage/HomePage';
export type { MenuCollapseContextType } from './context/MenuCollapseContext';
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
