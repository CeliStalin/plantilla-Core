// Exportación principal del componente
export { PageTransition } from './PageTransition';
export { PageTransition as default } from './PageTransition';

// Exportación de tipos
export type { PageTransitionProps } from './PageTransition.types';

// Exportación de hooks
export { usePageTransition } from './hooks/usePageTransition';
export type { 
  UsePageTransitionOptions,
  UsePageTransitionReturn,
  TransitionConfig,
  TransitionState
} from './hooks/usePageTransition';

// Exportación de estilos
export { pageTransitionStyles, pageTransitionConfig } from './PageTransition.styles';