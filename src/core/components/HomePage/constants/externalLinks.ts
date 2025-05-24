import { ExternalLink } from '../types';
import { 
  logoMiintranet as logoIconMiintranet,
  logoPortalConsalud,
  logoConsaludCDC 
} from '../../../../assets';

export const EXTERNAL_LINKS: ExternalLink[] = [
  {
    id: 'mi-intranet',
    title: 'Mi Intranet',
    logoSrc: logoIconMiintranet,
    url: 'https://www.consalud.cl',
    alt: 'Mi Intranet',
    fallbackSrc: 'https://via.placeholder.com/150x50?text=Mi+Intranet'
  },
  {
    id: 'portal-consalud',
    title: 'Portal Consalud',
    logoSrc: logoPortalConsalud || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80"%3E%3Crect width="200" height="80" fill="%2304A59B"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="white"%3EPortal Consalud%3C/text%3E%3C/svg%3E',
    url: 'https://www.consalud.cl',
    alt: 'Portal Consalud',
    fallbackSrc: 'https://via.placeholder.com/150x50?text=Portal+Consalud'
  },
  {
    id: 'consalud-somos-cdc',
    title: 'Consalud Somos CDC',
    logoSrc: logoConsaludCDC || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80"%3E%3Crect width="200" height="80" fill="white" stroke="%23E0E0E0"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-family="Arial, sans-serif" font-size="14" fill="%23333"%3EConsalud Somos CDC%3C/text%3E%3C/svg%3E',
    url: 'https://www.consalud.cl',
    alt: 'Consalud Somos CDC',
    fallbackSrc: 'https://via.placeholder.com/150x50?text=Consalud+Somos+CDC'
  }
];

export const ANIMATION_DELAYS = {
  WELCOME_SECTION: 0,
  LOADING_TIMEOUT: 600,
  CARD_BASE_DELAY: 0.1,
  ACCESS_CARD_BASE_DELAY: 0.3
} as const;

export const RESPONSIVE_BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024
} as const;