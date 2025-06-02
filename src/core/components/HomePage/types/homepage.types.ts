import { ElementMenu } from '@/core/interfaces/IMenusElementos';

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
  // Development/debugging props
  debug?: boolean;
  onMounted?: () => void;
  onCardClick?: (cardData: any) => void;
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
}

export interface ApplicationCardProps {
  item: ElementMenu;
  onClick: (item: ElementMenu) => void;
  delay?: number;
}

export interface DirectAccessGridProps {
  loading: boolean;
  onExternalLinkClick: (url: string) => void;
  className?: string;
  externalLinks?: ExternalLink[]; 
}

export interface AccessCardProps {
  title: string;
  logoSrc: string;
  url: string;
  onClick: (url: string) => void;
  delay?: number;
}

export interface ExternalLink {
  id: string;
  title: string;
  logoSrc: string;
  url: string;
  alt: string;
  fallbackSrc: string;
}