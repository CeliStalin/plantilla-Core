import React from 'react';

export interface PageTransitionProps {
  children: React.ReactNode;
  duration?: number;
  type?: 'fade' | 'slide' | 'slideLeft' | 'slideRight' | 'slideUp' | 'slideDown' | 'zoom' | 'fadeSlide';
  preset?: 'fast' | 'normal' | 'slow' | 'custom' | 'none' | 'minimal' | 'fade'; // Add 'fade' preset
  easing?: string;
  className?: string;
  style?: React.CSSProperties; // Add missing style prop
  disabled?: boolean;
  enableHardwareAcceleration?: boolean;
  respectReducedMotion?: boolean;
  disableInitialTransition?: boolean;
  immediateMode?: boolean; // Add this new prop
  // Nuevas opciones para modo standalone
  standalone?: boolean; // Indica si se usa fuera de React Router
  triggerKey?: string | number; // Clave para triggear transiciones manualmente
  // New props for external app compatibility
  exitBeforeEnter?: boolean; // Controls whether old content exits before new content enters
  mode?: 'sync' | 'wait' | 'out-in' | 'in-out' | 'concurrent' | string; // Add 'concurrent' mode
}
