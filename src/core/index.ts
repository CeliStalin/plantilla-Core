// Theme exports
export { defaultTheme, theme } from './theme';
export type { Theme, TextColors, ThemeColors } from './theme';

// Component exports - Solo exportar los principales
export { Typography } from './components/Typography';
export type { TypographyProps, TypographyVariant, TypographyColor } from './components/Typography';

// PageTransition exports - Exportaciones explícitas y completas
export { PageTransition } from './components/PageTransition';
export { default as PageTransitionDefault } from './components/PageTransition';
export type { PageTransitionProps } from './components/PageTransition';
export { pageTransitionStyles, pageTransitionConfig } from './components/PageTransition/PageTransition.styles';
export { usePageTransition } from './components/PageTransition/hooks/usePageTransition';
export type { UsePageTransitionOptions, UsePageTransitionReturn } from './components/PageTransition/hooks/usePageTransition';

// Styles exports
export { theme as styleTheme } from './styles/theme';
export { TypographyUtils } from './styles/typography';

// Hooks exports - Exportación mejorada
export { useAuth } from './hooks/useAuth';
export { default as useLocalStorage } from './hooks/useLocalStorage';
export { useTypography, useTypographyCSS, useTypographyVariables } from './hooks/useTypography';

// Context exports
export { AuthProvider, useAuthContext } from './context/AuthContext';
export {
  MenuConfigContext,
  MenuConfigProvider,
  useMenuConfig,
  MenuCollapseProvider,
  useMenuCollapse
} from './context/menu';

// Services exports - Solo los esenciales
export { AuthProvider as MsalAuthProvider } from './services/auth/authProviderMsal';
export { getMe, getUsuarioAD, getRoles } from './services/auth/authService';
export { apiClient } from './services/api/apiClient';
export { ApiGetMenus } from './services/GetApiArq';

// Utils exports - Solo los más utilizados
export { GetApiArquitectura, GetSistema, GetNameApiKey, GetKeyApiKey } from './utils/GetEnvVariables';

// Interface exports - Agregar nuevos tipos para uso externo
export type { IUser } from './interfaces/IAuth';
export type { IUsuarioAD } from './interfaces/IUsuarioAD';
export type { IRol, RolResponse } from './interfaces/IRol';
export type { IUserExterno } from './interfaces/IUserExterno';
export type { IExternalAuthState } from './interfaces/IAuth';

// Re-export components
export * from './components';
