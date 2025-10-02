import { ExternalLink } from '../types';
import { getMiIntranetUrl, getPortalConsaludUrl, getSucursalDigitalUrl } from '@/core/utils/externalLinksUtils';

/**
 * Función que retorna los enlaces externos con evaluación dinámica.
 * Las URLs se evalúan en tiempo de ejecución, no en tiempo de importación,
 * permitiendo que cambien según el ambiente configurado mediante setCoreEnvConfig().
 * 
 * @returns Array de enlaces externos con URLs actualizadas según el ambiente actual
 * 
 * @example
 * ```typescript
 * // En tu componente
 * const links = getExternalLinks();
 * // Portal Consalud apuntará a .des, .tes o .net según el ambiente configurado
 * ```
 */
export const getExternalLinks = (): ExternalLink[] => [
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
  },  {
    id: 'sucursal-digital',
    title: 'Sucursal digital',
    logoSrc: 'https://via.placeholder.com/150x50?text=Sucursal+Digital',
    url: getSucursalDigitalUrl(),
    alt: 'Sucursal digital',
    fallbackSrc: 'https://via.placeholder.com/150x50?text=Sucursal+Digital'
  }
];

/**
 * @deprecated Usar `getExternalLinks()` en su lugar para obtener URLs dinámicas.
 * 
 * Esta constante se mantiene por compatibilidad pero se evalúa en tiempo de importación,
 * lo que causa que las URLs no cambien según el ambiente configurado en runtime.
 * 
 * **Problema:** Cuando JavaScript importa este módulo, ejecuta `getPortalConsaludUrl()` 
 * inmediatamente, antes de que `setCoreEnvConfig()` haya sido llamado en la app externa.
 * 
 * **Solución:** Usar `getExternalLinks()` que evalúa las URLs en tiempo de ejecución.
 */
export const EXTERNAL_LINKS: ExternalLink[] = getExternalLinks();

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