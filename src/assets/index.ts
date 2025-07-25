// Assets exports optimized with TypeScript best practices
// Compatible with Bulma and modern React patterns

// SVG Components
export { default as Logo } from './Logo';
export { default as FooterLogo } from './FooterLogo';
export { default as MiIntranet } from './MiIntranet';
export { default as PortalConsalud } from './PortalConsalud';
export { default as AccesConsalud } from './AccesConsalud';
export { default as SucursalDigital } from './SucursalDigital';

// Types for SVG components
export interface LogoProps extends React.SVGProps<SVGSVGElement> {
  'aria-label'?: string;
}

// Re-export common types for better developer experience
export type { ComponentProps } from 'react';
export type SVGComponentType = React.FC<React.SVGProps<SVGSVGElement>>;