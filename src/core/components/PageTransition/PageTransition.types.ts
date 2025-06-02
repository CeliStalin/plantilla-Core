import React from 'react';

export interface PageTransitionProps {
  children: React.ReactNode;
  duration?: number;
  type?: 'fade' | 'slide' | 'slideLeft' | 'slideRight' | 'slideUp' | 'slideDown' | 'zoom' | 'fadeSlide';
  preset?: 'fast' | 'normal' | 'slow' | 'custom' | 'none' | 'minimal'; // Agregar 'minimal'
  easing?: string;
  className?: string;
  disabled?: boolean;
  enableHardwareAcceleration?: boolean;
  respectReducedMotion?: boolean;
  disableInitialTransition?: boolean;
  immediateMode?: boolean; // Add this new prop
  // Nuevas opciones para modo standalone
  standalone?: boolean; // Indica si se usa fuera de React Router
  triggerKey?: string | number; // Clave para triggear transiciones manualmente
}
