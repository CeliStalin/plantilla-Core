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
export { default as useLocalStorage } from './hooks/useLocalStorage';
export { useAuth } from './hooks/useAuth';
export { useAuth as default } from './hooks/useAuth'; // Export default para compatibilidad

// Context exports
export { AuthProvider, useAuthContext } from './context/AuthContext';
export { MenuConfigProvider, useMenuConfig } from './context/MenuConfigContext';

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
export type { IExternalAuthState } from './interfaces/IAuth'; // Nuevo tipo para apps externas

// Assets exports
export {
  LogoImage,
  LogoutIcon,
  DocumentsFileCheckmarkSvg,
  MapsSvg,
  appSvg,
  RowSvg,
  logoMiintranet,
  logoPortalConsalud,
  logoConsaludCDC,
  FooterDesktop,
  Images,
  Icons
} from '../assets';

export * from './components';
export { useMenuCollapse, MenuCollapseProvider } from './context/MenuCollapseContext';
