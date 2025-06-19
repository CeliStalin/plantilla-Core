import { ExternalLink } from '../types';

export const EXTERNAL_LINKS: ExternalLink[] = [
  {
    id: 'mi-intranet',
    title: 'Mi Intranet',
    logoSrc: 'https://via.placeholder.com/150x50?text=Mi+Intranet',
    url: 'https://www.consalud.cl',
    alt: 'Mi Intranet',
    fallbackSrc: 'https://via.placeholder.com/150x50?text=Mi+Intranet'
  },
  {
    id: 'portal-consalud',
    title: 'Portal Consalud',
    logoSrc: 'https://via.placeholder.com/150x50?text=Portal+Consalud',
    url: 'https://www.consalud.cl',
    alt: 'Portal Consalud',
    fallbackSrc: 'https://via.placeholder.com/150x50?text=Portal+Consalud'
  },
  {
    id: 'consalud-somos-cdc',
    title: 'Consalud Somos CDC',
    logoSrc: 'https://via.placeholder.com/150x50?text=Consalud+Somos+CDC',
    url: 'https://www.consalud.cl',
    alt: 'Consalud Somos CDC',
    fallbackSrc: 'https://via.placeholder.com/150x50?text=Consalud+Somos+CDC'
  }
];

export const EXTERNAL_LINKS_DELAYS = {
  WELCOME_SECTION: 0,
  LOADING_TIMEOUT: 600,
  CARD_BASE_DELAY: 0.1,
  ACCESS_CARD_BASE_DELAY: 0.3
} as const;

export const RESPONSIVE_BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024
} as const;