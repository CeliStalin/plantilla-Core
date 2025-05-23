import { ExternalLink } from '../types';
import miIntranetLogo from '@/assets/logo-miintranet.png';
import consaludLogo from '@/assets/Logo.png';

export const EXTERNAL_LINKS: ExternalLink[] = [
  {
    id: 'mi-intranet',
    title: 'Mi Intranet',
    logoSrc: miIntranetLogo,
    url: 'https://www.consalud.cl',
    alt: 'Mi Intranet',
    fallbackSrc: 'https://via.placeholder.com/150x50?text=Mi+Intranet'
  },
  {
    id: 'portal-consalud',
    title: 'Portal Consalud',
    logoSrc: consaludLogo,
    url: 'https://www.consalud.cl',
    alt: 'Portal Consalud',
    fallbackSrc: 'https://via.placeholder.com/150x50?text=Portal+Consalud'
  },
  {
    id: 'consalud-somos-cdc',
    title: 'Consalud Somos CDC',
    logoSrc: miIntranetLogo,
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