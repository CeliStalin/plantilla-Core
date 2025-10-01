import { ExternalLink } from '../types';
import { getMiIntranetUrl, getPortalConsaludUrl } from '@/core/utils/externalLinksUtils';

export const EXTERNAL_LINKS: ExternalLink[] = [
  {
    id: 'mi-intranet',
    title: 'Mi Intranet',
    logoSrc: '', // No se usa ya que se renderiza el componente SVG directamente
    url: getMiIntranetUrl(),
    alt: 'Mi Intranet',
    fallbackSrc: '' // No se usa ya que se renderiza el componente SVG directamente
  },
  {
    id: 'portal-consalud',
    title: 'Portal Consalud',
    logoSrc: '', // No se usa ya que se renderiza el componente SVG directamente
    url: getPortalConsaludUrl(),
    alt: 'Portal Consalud',
    fallbackSrc: '' // No se usa ya que se renderiza el componente SVG directamente
  },
  {
    id: 'consalud-somos-cdc',
    title: 'Consalud Somos CDC',
    logoSrc: 'https://via.placeholder.com/150x50?text=Consalud+Somos+CDC',
    url: 'https://www.consalud.cl',
    alt: 'Consalud Somos CDC',
    fallbackSrc: 'https://via.placeholder.com/150x50?text=Consalud+Somos+CDC'
  },
  {
    id: 'sucursal-digital',
    title: 'Sucursal digital',
    logoSrc: 'https://via.placeholder.com/150x50?text=Sucursal+Digital',
    url: 'https://www.consalud.cl',
    alt: 'Sucursal digital',
    fallbackSrc: 'https://via.placeholder.com/150x50?text=Sucursal+Digital'
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