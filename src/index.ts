import React, { useCallback, useMemo } from 'react';

// Core exports principales
export { 
  // Theme
  theme,
  defaultTheme
} from './core/theme';

// Component exports - Sin PageTransition aquí para evitar duplicación
export { 
  Layout,
  SecureLayout,
  ProtectedRoute,
  NotFound,
  Unauthorized,
  Dashboard,
  Button,
  Card,
  Typography,
  Footer,
  Login,
  LoadingOverlay,
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

// PageTransition exports - EXPORTACIÓN DIRECTA Y EXPLÍCITA
export { PageTransition } from './core/components/PageTransition/PageTransition';
export { usePageTransition } from './core/components/PageTransition/hooks/usePageTransition';
export type { PageTransitionProps } from './core/components/PageTransition/PageTransition.types';
export type { 
  UsePageTransitionOptions,
  UsePageTransitionReturn,
  TransitionConfig,
  TransitionState
} from './core/components/PageTransition/hooks/usePageTransition';
export { 
  pageTransitionStyles, 
  pageTransitionConfig 
} from './core/components/PageTransition/PageTransition.styles';

// Exportación por defecto adicional para PageTransition
export { PageTransition as default } from './core/components/PageTransition/PageTransition';

// Context exports
export { 
  AuthProvider,
  MenuConfigProvider,
  useAuthContext,
  useMenuConfig
} from './core/context';

// Hooks exports
export { 
  useAuth,
  default as useAuthHook,
  useLocalStorage
} from './core/hooks';

// Typography hooks exports
export {
  useTypography,
  useTypographyCSS,
  useTypographyVariables
} from './core/hooks/useTypography';

// Services exports
export { 
  getMe,
  getUsuarioAD,
  getRoles,
  apiClient,
  ApiGetMenus
} from './core/services';

// Utils exports
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
} from './assets';

// Components exports adicionales
export { LoadingSpinner } from './core/components/Loading/LoadingSpinner';
export { HomePage } from './core/components/HomePage/HomePage';

// Función de utilidad para transiciones
export const startTransition = (callback: () => void) => {
  if (typeof React !== 'undefined' && React.startTransition) {
    React.startTransition(callback);
  } else {
    callback();
  }
};

// Export ProtectedRoute con flexibilidad adicional
export { default as ProtectedRouteComponent } from './core/components/ProtectedRoute';

// Utilidad adicional para apps externas
export const createPageTransitionConfig = (options: {
  exitBeforeEnter?: boolean;
  mode?: string;
  preset?: string;
  duration?: number;
}) => ({
  preset: 'minimal',
  respectReducedMotion: true,
  enableHardwareAcceleration: true,
  ...options
});

// HomePage types export
export type { HomePageProps } from './core/components/HomePage/types';

// Tipos adicionales para compatibilidad externa
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
  component?: React.LazyExoticComponent<React.ComponentType<any>> | React.ComponentType<any>;
  roles?: string[];
  allowedRoles?: string[];
  isPublic?: boolean;
  enableTransitions?: boolean;
  children: React.ReactNode;
}

export interface ExtendedMenuConfigType {
  enableDynamicMenu?: boolean;
  enableBounceEffects?: boolean;
}

// Animation utilities export
export const createBounceEffect = (element: HTMLElement, duration: number = 300) => {
  element.classList.add('bounce-effect');
  setTimeout(() => {
    element.classList.remove('bounce-effect');
  }, duration);
};