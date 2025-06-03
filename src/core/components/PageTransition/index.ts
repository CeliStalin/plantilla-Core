// Exportación principal del componente con nombre consistente
export { PageTransition as default } from './PageTransition';
export { PageTransition } from './PageTransition';

// Exportación de tipos del componente
export type { PageTransitionProps } from './PageTransition.types';

// Exportación de estilos y configuración
export * from './PageTransition.styles';

// Exportación completa del hook y sus tipos
export { usePageTransition } from './hooks/usePageTransition';
export type { 
  UsePageTransitionOptions, 
  UsePageTransitionReturn,
  TransitionConfig,
  TransitionState
} from './hooks/usePageTransition';