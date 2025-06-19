import './core/styles/animations.css';

/**
 * Core Theme Exports
 * @public
 */
export {
  defaultTheme,
  theme as coreTheme
} from './core/theme';

export {
  theme,
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

/**
 * Component Exports
 * @public
 */
export {
  Layout,
  Button,
  Card,
  Footer,
  Login,
  ErrorBoundary,
  HomePage,
  Typography,
  PageTransition,
  LoadingOverlay,
  LoadingDots,
  LoadingSpinner
} from './core/components';

/**
 * Route Components
 * @public
 */
export { default as SecureLayout } from './core/components/SecureLayout/SecureLayout';
export { default as ProtectedRoute } from './core/components/ProtectedRoute';
export { default as NotFound } from './core/components/NotFound';
export { default as Unauthorized } from './core/components/Unauthorized';
export { PublicRoute } from './core/routes/PublicRoute';
export { PrivateRoute } from './core/routes/PrivateRoute';

/**
 * Context Providers and Hooks
 * @public
 */
export {
  AuthProvider,
  useAuthContext
} from './core/context/AuthContext';

export {
  MenuConfigProvider,
  useMenuConfig,
  useMenuCollapse,
  MenuCollapseProvider
} from './core/context/menu';

/**
 * Hooks
 * @public
 */
export {
  useAuth,
  useLocalStorage,
  useTypography,
  useTypographyCSS,
  useTypographyVariables
} from './core/hooks';

export { usePageTransition } from './core/components/PageTransition/hooks/usePageTransition';

/**
 * Services
 * @public
 */
export {
  getMe,
  getUsuarioAD,
  getRoles,
  apiClient,
  ApiGetMenus
} from './core/services';

export { AuthProvider as MsalAuthProvider } from './core/services/auth/authProviderMsal';

/**
 * Utilities
 * @public
 */
export {
  GetApiArquitectura,
  GetSistema
} from './core/utils';

/**
 * Typography Utilities
 * @public
 */
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

/**
 * Type Exports
 * @public
 */
export * from './core/types';

/**
 * Breadcrumb Exports
 * @public
 */
export { 
  Breadcrumb,
  default as BreadcrumbDefault,
  useBreadcrumb
} from './core/components/Breadcrumb';

/**
 * Utility Functions
 * @public
 */
export const startTransition = (callback: () => void) => {
  if (typeof window !== 'undefined') {
    const React = (globalThis as any).React || (window as any).React;
    if (React && React.startTransition) {
      React.startTransition(callback);
      return;
    }
  }
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