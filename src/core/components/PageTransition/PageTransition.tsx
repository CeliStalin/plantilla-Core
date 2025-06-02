import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { pageTransitionStyles } from './PageTransition.styles';

export interface PageTransitionProps {
  children: React.ReactNode;
  duration?: number;
  type?: 'fade' | 'slide' | 'slideLeft' | 'slideRight' | 'slideUp' | 'slideDown' | 'zoom' | 'fadeSlide';
  preset?: 'fast' | 'normal' | 'slow' | 'custom';
  easing?: string;
  className?: string;
  disabled?: boolean;
}

// Configuración de presets
const PRESET_CONFIG = {
  fast: { duration: 200, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  normal: { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  slow: { duration: 500, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  custom: { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }
} as const;

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  duration,
  type = 'fadeSlide',
  preset = 'normal',
  easing,
  className = '',
  disabled = false
}) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [displayChildren, setDisplayChildren] = useState(children);
  const previousLocation = useRef(location.pathname);
  const timeoutRef = useRef<number | null>(null);

  // Resolver configuración final basada en preset vs props explícitas
  const finalDuration = duration ?? PRESET_CONFIG[preset]?.duration ?? 300;
  const finalEasing = easing ?? PRESET_CONFIG[preset]?.easing ?? 'cubic-bezier(0.4, 0, 0.2, 1)';

  useEffect(() => {
    // Si las transiciones están deshabilitadas, solo actualizar contenido
    if (disabled) {
      setDisplayChildren(children);
      return;
    }

    // Solo hacer transición si la ruta cambió
    if (previousLocation.current !== location.pathname) {
      // Fase 1: Ocultar contenido actual
      setIsVisible(false);
      
      // Fase 2: Actualizar contenido y mostrar después del delay
      timeoutRef.current = window.setTimeout(() => {
        setDisplayChildren(children);
        setIsVisible(true);
      }, finalDuration);
      
      previousLocation.current = location.pathname;
    } else {
      // Si no cambió la ruta, solo actualizar contenido
      setDisplayChildren(children);
      setIsVisible(true);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [children, location.pathname, finalDuration, disabled]);

  // Si las transiciones están deshabilitadas, renderizar directamente
  if (disabled) {
    return <>{children}</>;
  }

  const containerStyle = {
    ...pageTransitionStyles.container,
    ...pageTransitionStyles.transitions[type] || pageTransitionStyles.transitions.fadeSlide,
    opacity: isVisible ? 1 : 0,
    transform: getTransform(type, isVisible),
    transitionDuration: `${finalDuration}ms`,
    transitionTimingFunction: finalEasing,
  };

  return (
    <div 
      className={`page-transition ${className}`}
      style={containerStyle}
    >
      {displayChildren}
    </div>
  );
};

const getTransform = (type: PageTransitionProps['type'], isVisible: boolean): string => {
  switch (type) {
    case 'slide':
    case 'slideRight':
      return isVisible ? 'translateX(0)' : 'translateX(20px)';
    case 'slideLeft':
      return isVisible ? 'translateX(0)' : 'translateX(-20px)';
    case 'slideUp':
      return isVisible ? 'translateY(0)' : 'translateY(-10px)';
    case 'slideDown':
      return isVisible ? 'translateY(0)' : 'translateY(10px)';
    case 'zoom':
      return isVisible ? 'scale(1)' : 'scale(0.98)';
    case 'fadeSlide':
      return isVisible ? 'translateY(0)' : 'translateY(10px)';
    case 'fade':
    default:
      return 'none';
  }
};

export default PageTransition;
