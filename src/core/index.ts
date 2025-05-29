// Theme exports
export { defaultTheme, theme } from './theme';
export type { Theme, TextColors, ThemeColors } from './theme';

// Component exports - Solo exportar los principales
export { Typography } from './components/Typography';
export type { TypographyProps, TypographyVariant, TypographyColor } from './components/Typography';

// Styles exports
export { theme as styleTheme } from './styles/theme';
export { TypographyUtils } from './styles/typography';

// Hooks exports
export { default as useLocalStorage } from './hooks/useLocalStorage';
export { useAuth } from './hooks/useAuth';

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

// Interface exports - Solo las principales
export type { IUser } from './interfaces/IAuth';
export type { IUsuarioAD } from './interfaces/IUsuarioAD';
export type { IRol, RolResponse } from './interfaces/IRol';
export type { IUserExterno } from './interfaces/IUserExterno';

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
