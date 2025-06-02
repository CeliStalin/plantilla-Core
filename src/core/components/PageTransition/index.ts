// Exportación principal del componente
export { default } from './PageTransition';
export { default as PageTransition } from './PageTransition';
export { PageTransition as PageTransitionComponent } from './PageTransition';

// Exportación de tipos del componente
export type { PageTransitionProps } from './PageTransition';

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
