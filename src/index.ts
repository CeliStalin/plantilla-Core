// Core exports principales - Theme con importaciones seguras
export {
  defaultTheme,      // Exporta defaultTheme (el tema base desde ./core/theme)
  theme as coreTheme // Exporta 'theme' desde ./core/theme (que es defaultTheme) como coreTheme
} from './core/theme';

// Exportar el theme completo y sus utilidades desde styles/theme
export {
  theme, // Este será el theme completo y principal exportado como 'theme'
  colors,
  textColors,
  spacing,
  typography,
  borderRadius,
  shadows,
  layout,
  breakpoints,
  transitions,
  animations
} from './core/styles/theme';

// Component exports principales 
export { 
  Layout,
  Button,
  Card,
  Footer,
  Login,
  ErrorBoundary,
  HomePage
} from './core/components';

// Exportaciones condicionales para componentes que pueden no existir
export { LoadingOverlay } from './core/components/Loading/LoadingOverlay';

// Dashboard - Usar re-export condicional más limpio
// Primero intentar desde el módulo específico, luego desde el índice general
//export { Dashboard } from './core/components/Dashboard';
// Si el anterior falla, usar: export { Dashboard } from './core/components';

// SecureLayout y ProtectedRoute con exportaciones seguras
export { default as SecureLayout } from './core/components/SecureLayout/SecureLayout';
export { default as ProtectedRoute } from './core/components/ProtectedRoute';
export { default as NotFound } from './core/components/NotFound';
export { default as Unauthorized } from './core/components/Unauthorized';

// Typography - Export seguro y verificado
export { 
  Typography
} from './core/components/Typography/Typography';

// PageTransition - Export seguro
export { 
  PageTransition 
} from './core/components/PageTransition/PageTransition';

export { 
  usePageTransition 
} from './core/components/PageTransition/hooks/usePageTransition';

// Exportación condicional de estilos de PageTransition
export { 
  pageTransitionStyles, 
  pageTransitionConfig 
} from './core/components/PageTransition/PageTransition.styles';

// Route exports - verificar que existan
export { PublicRoute } from './core/routes/PublicRoute';
export { PrivateRoute } from './core/routes/PrivateRoute';

// Context exports - con verificación
export { 
  AuthProvider,
  useAuthContext
} from './core/context/AuthContext';

export { 
  MenuConfigProvider,
  useMenuConfig
} from './core/context/MenuConfigContext';

// Hooks exports - solo los que existen
export { 
  useAuth,
  useLocalStorage
} from './core/hooks';

// Typography hooks - verificar existencia
export {
  useTypography,
  useTypographyCSS,
  useTypographyVariables
} from './core/hooks/useTypography';

// Services exports - verificar cada uno
export { 
  getMe,
  getUsuarioAD,
  getRoles,
  apiClient
} from './core/services';

// Exportación condicional de ApiGetMenus
export { ApiGetMenus } from './core/services/GetApiArq';

// MsalAuthProvider desde la ubicación correcta
export { AuthProvider as MsalAuthProvider } from './core/services/auth/authProviderMsal';

// Utils exports
export {
  GetApiArquitectura,
  GetSistema
} from './core/utils';

// Typography styles - desde la ubicación correcta
export {
  FONT_FACES,
  FONT_SIZES,
  FONT_WEIGHTS,
  LINE_HEIGHTS,
  LETTER_SPACING,
  FONT_FAMILIES,
  TYPOGRAPHY_VARIANTS,
  TypographyUtils,
  generateFontFaceCSS,
  generateTypographyVariables
} from './core/styles/typography';

// Assets exports - verificar que el módulo assets exista
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
} from './assets';

// Export interfaces selectivos para evitar conflictos
export type { IUser } from './core/interfaces/IAuth';
export type { IUsuarioAD } from './core/interfaces/IUsuarioAD';
export type { IRol, RolResponse } from './core/interfaces/IRol';
export type { IUserExterno } from './core/interfaces/IUserExterno';
export type { ElementMenu } from './core/interfaces/IMenusElementos';

// Export theme types
export type { 
  Theme, 
  ThemeColors, 
  TextColors 
} from './core/theme';

// Export typography types
export type { 
  TypographyProps, 
  TypographyVariant, 
  TypographyColor,
  TypographyWeight,
  TypographyAlign
} from './core/components/Typography/Typography';

// PageTransition types
export type { 
  PageTransitionProps 
} from './core/components/PageTransition/PageTransition.types';

export type { 
  UsePageTransitionOptions,
  UsePageTransitionReturn,
  TransitionConfig,
  TransitionState
} from './core/components/PageTransition/hooks/usePageTransition';

// HomePage types
export type { HomePageProps } from './core/components/HomePage/types';

// Utility functions - Solo usar React cuando sea necesario y de forma segura
export const startTransition = (callback: () => void) => {
  // Verificación segura de React.startTransition
  if (typeof window !== 'undefined') {
    // Intentar acceder a React desde el contexto global si está disponible
    const React = (globalThis as any).React || (window as any).React;
    if (React && React.startTransition) {
      React.startTransition(callback);
      return;
    }
  }
  
  // Fallback - ejecutar inmediatamente
  callback();
};

export const createPageTransitionConfig = (options: {
  exitBeforeEnter?: boolean;
  mode?: string;
  preset?: string;
  duration?: number;
} = {}) => ({
  preset: 'minimal',
  respectReducedMotion: true,
  enableHardwareAcceleration: true,
  ...options
});

// Extended interfaces for external compatibility
export interface ExtendedHomePageProps {
  enableBounce?: boolean;
  showWelcomeSection?: boolean;
  showApplicationsSection?: boolean;
  showDirectAccessSection?: boolean;
  bounceIntensity?: 'low' | 'medium' | 'high';
  animationDuration?: number;
  bounceEnabled?: boolean;
  enableInteractiveEffects?: boolean;
  className?: string;
  externalLinks?: Array<{
    id: string;
    title: string;
    logoSrc: string;
    url: string;
    alt: string;
    fallbackSrc: string;
  }>;
  debug?: boolean;
  onMounted?: () => void;
  onCardClick?: (cardData: any) => void;
}

export interface ExtendedProtectedRouteProps {
  component?: any; // Simplificar el tipo para evitar errores
  roles?: string[];
  allowedRoles?: string[];
  isPublic?: boolean;
  enableTransitions?: boolean;
  children: React.ReactNode;
}

export { Breadcrumb } from './core/components/Breadcrumb';
export { default as BreadcrumbDefault } from './core/components/Breadcrumb';
export { useBreadcrumb } from './core/components/Breadcrumb';
export type { BreadcrumbProps, BreadcrumbItem, UseBreadcrumbOptions } from './core/components/Breadcrumb';