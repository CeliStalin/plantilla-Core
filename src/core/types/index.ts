// Typography Types
export type {
  TypographyProps,
  TypographyVariant,
  TypographyColor,
  TypographyWeight,
  TypographyAlign
} from '../components/Typography/Typography';

// Theme Types
export type {
  Theme,
  ThemeColors,
  TextColors,
  ThemeSpacing,
  ThemeTypography,
  ThemeLayout,
  ThemeBreakpoints,
  ThemeTransitions,
  ThemeAnimations
} from '../theme';

// PageTransition Types
export type {
  PageTransitionProps
} from '../components/PageTransition/PageTransition.types';

export type {
  UsePageTransitionOptions,
  UsePageTransitionReturn,
  TransitionConfig,
  TransitionState
} from '../components/PageTransition/hooks/usePageTransition';

// HomePage Types
export type { HomePageProps } from '../components/HomePage/types';

// Auth and User Types
export type { IUser } from '../interfaces/IAuth';
export type { IUsuarioAD } from '../interfaces/IUsuarioAD';
export type { IRol, RolResponse } from '../interfaces/IRol';
export type { IUserExterno } from '../interfaces/IUserExterno';
export type { ElementMenu } from '../interfaces/IMenusElementos';

// Breadcrumb Types
export type { 
  BreadcrumbProps, 
  BreadcrumbItem, 
  UseBreadcrumbOptions 
} from '../components/Breadcrumb';

// Extended Types for External Usage
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
  component?: any;
  roles?: string[];
  allowedRoles?: string[];
  isPublic?: boolean;
  enableTransitions?: boolean;
  children: React.ReactNode;
} 