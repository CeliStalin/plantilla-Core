import { ElementMenu } from '@/core/interfaces/IMenusElementos';

// New interfaces for external styling and animations
export interface AnimationConfig {
  bounceKeyframes?: string;
  fadeInKeyframes?: string;
  hoverEffects?: string;
  customAnimations?: Record<string, string>;
}

export interface StyleConfig {
  cssVariables?: Record<string, string>;
  customStyles?: string;
  animationConfig?: AnimationConfig;
}

export interface HomePageProps {
  className?: string;
  externalLinks?: ExternalLink[];
  enableBounce?: boolean;
  showWelcomeSection?: boolean;
  showApplicationsSection?: boolean;
  showDirectAccessSection?: boolean;
  bounceIntensity?: 'low' | 'medium' | 'high';
  animationDuration?: number;
  // New props for enhanced functionality
  bounceEnabled?: boolean;
  enableInteractiveEffects?: boolean;
  // External styling props
  styleConfig?: StyleConfig;
  injectStyles?: boolean;
  customCssVars?: Record<string, string>;
  // Development/debugging props
  debug?: boolean;
  onMounted?: () => void;
  onCardClick?: (cardData: any) => void;
  /**
   * Si es true (por defecto), envuelve el contenido en el Layout del core.
   * Si es false, renderiza solo el contenido interno (requiere envolver en MenuCollapseProvider y layout externo).
   */
  withLayout?: boolean;
  /**
   * Si se define, fuerza el estado del menú izquierdo (NavMenu) a colapsado o expandido.
   * true = colapsado, false = expandido. Si no se define, el control es interno.
   */
  menuCollapsed?: boolean;
}

export interface WelcomeSectionProps {
  userName?: string;
  className?: string;
}

export interface ApplicationsGridProps {
  menuItems: ElementMenu[];
  loading: boolean;
  onAppClick: (item: ElementMenu) => void;
  enableBounce?: boolean;
  className?: string;
  // External styling support
  styleConfig?: StyleConfig;
  customAnimations?: boolean;
}

export interface ApplicationCardProps {
  item: ElementMenu;
  onClick: (item: ElementMenu) => void;
  delay?: number;
  // Animation control
  animationEnabled?: boolean;
  customStyle?: React.CSSProperties;
}

export interface DirectAccessGridProps {
  loading: boolean;
  onExternalLinkClick: (url: string) => void;
  className?: string;
  externalLinks?: ExternalLink[];
  // External styling support
  styleConfig?: StyleConfig;
}

export interface AccessCardProps {
  title: string;
  logoSrc: string;
  url: string;
  onClick: (url: string) => void;
  delay?: number;
  // Animation control
  animationEnabled?: boolean;
  customStyle?: React.CSSProperties;
}

export interface ExternalLink {
  id: string;
  title: string;
  logoSrc: string;
  url: string;
  alt: string;
  fallbackSrc: string;
}