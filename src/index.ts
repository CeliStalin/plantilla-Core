import React, { useCallback, useMemo } from 'react';
// Core exports principales
export { 
  // Theme
  theme,
  defaultTheme
} from './core/theme';

// Component exports - Solo los más importantes
export { 
  Layout,
  SecureLayout,
  ProtectedRoute,
  NotFound,
  Unauthorized,
  HomePage,
  Dashboard,
  Button,
  Card,
  Typography,
  Footer,
  Login,
  LoadingOverlay,
  PageTransition,
  ErrorBoundary
} from './core/components';

// Route exports
export { PublicRoute } from './core/routes/PublicRoute';
export { PrivateRoute } from './core/routes/PrivateRoute';

// Export interfaces from interfaces module
export * from './core/interfaces';

// Export theme types from theme module
export type { 
  Theme, 
  ThemeColors, 
  TextColors 
} from './core/theme';

// Export typography types from typography components
export type { 
  TypographyProps, 
  TypographyVariant, 
  TypographyColor 
} from './core/components/Typography';

// PageTransition exports completos
export { usePageTransition } from './core/components/PageTransition';
export type { 
  PageTransitionProps,
  UsePageTransitionOptions,
  UsePageTransitionReturn,
  TransitionConfig,
  TransitionState
} from './core/components/PageTransition';
export { 
  pageTransitionStyles, 
  pageTransitionConfig 
} from './core/components/PageTransition';

// Context exports
export { 
  AuthProvider,
  MenuConfigProvider,
  useAuthContext,
  useMenuConfig
} from './core/context';

// Hooks exports - Asegurar exportación correcta de useAuth
export { 
  useAuth,
  default as useAuthHook, // Exportación adicional para compatibilidad
  useLocalStorage
} from './core/hooks';

// Typography hooks exports
export {
  useTypography,
  useTypographyCSS,
  useTypographyVariables
} from './core/hooks/useTypography';

// Services exports - Solo los esenciales
export { 
  getMe,
  getUsuarioAD,
  getRoles,
  apiClient,
  ApiGetMenus
} from './core/services';

// Utils exports - Solo los más utilizados
export {
  GetApiArquitectura,
  GetSistema
} from './core/utils';

// Typography styles and utilities exports
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

// Styles exports
export * from './core/styles';

// Assets exports - Add missing SVG exports
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

// Components exports - Incluir LoadingSpinner
export * from './core/components';
export { LoadingSpinner } from './core/components/Loading/LoadingSpinner';

// Función de utilidad para transiciones (opcional para compatibilidad)
export const startTransition = (callback: () => void) => {
  if (typeof React !== 'undefined' && React.startTransition) {
    React.startTransition(callback);
  } else {
    callback();
  }
};