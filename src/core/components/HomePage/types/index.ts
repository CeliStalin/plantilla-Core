export * from './homepage.types';

// Re-export ElementMenu from interfaces
export { ElementMenu } from '@/core/interfaces/IMenusElementos';

export interface HomePageProps {
  className?: string;
  externalLinks?: ExternalLink[];
  enableBounce?: boolean;
}

export interface ExternalLink {
  id: string;
  title: string;
  logoSrc: string;
  url: string;
  alt: string;
  fallbackSrc: string;
}