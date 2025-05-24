import { ElementMenu } from '@/core/interfaces/IMenusElementos';

export interface HomePageProps {
  className?: string;
  externalLinks?: ExternalLink[]; 
}

export interface WelcomeSectionProps {
  userName?: string;
  className?: string;
}

export interface ApplicationsGridProps {
  menuItems: ElementMenu[];
  loading: boolean;
  onAppClick: (item: ElementMenu) => void;
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