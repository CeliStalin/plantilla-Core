export * from './homepage.types';

// Re-export ElementMenu from interfaces
export { ElementMenu } from '@/core/interfaces/IMenusElementos';

export interface HomePageProps {
  className?: string;
  externalLinks?: ExternalLink[];
  enableBounce?: boolean;
  showWelcomeSection?: boolean;
  showApplicationsSection?: boolean;
  showDirectAccessSection?: boolean;
  bounceIntensity?: 'low' | 'medium' | 'high';
  animationDuration?: number;
}

export interface ExternalLink {
  id: string;
  title: string;
  logoSrc: string;
  url: string;
  alt: string;
  fallbackSrc: string;
}