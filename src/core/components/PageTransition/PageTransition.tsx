import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { pageTransitionStyles } from './PageTransition.styles';
import type { PageTransitionProps } from './PageTransition.types';

// Configuración de presets
const PRESET_CONFIG = {
  fast: { duration: 200, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  normal: { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  slow: { duration: 500, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  custom: { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }
} as const;

// Hook personalizado para manejar la ubicación de forma segura
const useSafeLocation = () => {
  try {
    return useLocation();
  } catch (error) {
    // Si no está dentro de un Router, retornamos un objeto mock
    return { pathname: window.location.pathname };
  }
};

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  duration,
  type = 'fadeSlide',
  preset = 'normal',
  easing,
  className = '',
  disabled = false,
  enableHardwareAcceleration = false, // Default to false
  respectReducedMotion = true, // Default to true
  disableInitialTransition = false,
  immediateMode = false, // Add and default the new prop
}) => {
  const location = useSafeLocation();
  const [isVisible, setIsVisible] = useState(disableInitialTransition); 
  const [displayChildren, setDisplayChildren] = useState(children);
  
  const prevLocationPathnameRef = useRef<string | null>(null);
  const animationTimerRef = useRef<number | null>(null);
  const [isRouterContext, setIsRouterContext] = useState(true);

  // Detectar si estamos en un contexto de Router
  useEffect(() => {
    try {
      // Intentar usar useLocation para verificar si estamos en un contexto de Router
      if (!location || typeof location.pathname !== 'string') {
        setIsRouterContext(false);
      }
    } catch {
      setIsRouterContext(false);
    }
  }, [location]);

  const finalDuration = duration ?? PRESET_CONFIG[preset]?.duration ?? 300;
  const finalEasing = easing ?? PRESET_CONFIG[preset]?.easing ?? 'cubic-bezier(0.4, 0, 0.2, 1)';

  const prefersReducedMotion = useMemo(() => {
    if (typeof window !== 'undefined' && respectReducedMotion) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  }, [respectReducedMotion]);

  const effectiveDisabled = disabled || prefersReducedMotion;

  useEffect(() => {
    // Clear timer on unmount
    return () => {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const isInitialLoadEffectScope = prevLocationPathnameRef.current === null;

    if (effectiveDisabled) {
      setDisplayChildren(children);
      setIsVisible(true);
      if (isInitialLoadEffectScope || (isRouterContext && prevLocationPathnameRef.current !== location.pathname)) {
        prevLocationPathnameRef.current = isRouterContext ? location.pathname : window.location.pathname;
      }
      return;
    }

    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
    }

    // Si no estamos en un contexto de Router, solo manejamos cambios de children
    if (!isRouterContext) {
      // En modo no-router, solo animamos cuando cambian los children
      if (displayChildren !== children) {
        if (immediateMode) {
          setDisplayChildren(children);
          setIsVisible(false);
          animationTimerRef.current = window.setTimeout(() => {
            setIsVisible(true);
          }, 10);
        } else {
          setIsVisible(false);
          animationTimerRef.current = window.setTimeout(() => {
            setDisplayChildren(children);
            setIsVisible(true);
          }, finalDuration);
        }
      } else if (!isVisible && !effectiveDisabled) {
        setIsVisible(true);
      }
      return;
    }

    // Lógica existente para contexto de Router
    const hasPathChanged = !isInitialLoadEffectScope && prevLocationPathnameRef.current !== location.pathname;

    if (isInitialLoadEffectScope) {
      setDisplayChildren(children);
      if (disableInitialTransition) {
        if (!isVisible) setIsVisible(true);
      } else {
        if (!isVisible) {
          animationTimerRef.current = window.setTimeout(() => {
            setIsVisible(true);
          }, 10);
        }
      }
      prevLocationPathnameRef.current = location.pathname;
    } else if (hasPathChanged) {
      if (immediateMode) {
        setDisplayChildren(children);
        setIsVisible(false);
        animationTimerRef.current = window.setTimeout(() => {
          setIsVisible(true);
        }, 10);
        prevLocationPathnameRef.current = location.pathname;
      } else {
        setIsVisible(false);
        animationTimerRef.current = window.setTimeout(() => {
          setDisplayChildren(children);
          setIsVisible(true);
          prevLocationPathnameRef.current = location.pathname;
        }, finalDuration);
      }
    } else {
      if (displayChildren !== children) {
        setDisplayChildren(children);
      }
      if (!isVisible && !effectiveDisabled) {
        setIsVisible(true);
      }
    }
  }, [children, location.pathname, effectiveDisabled, finalDuration, displayChildren, disableInitialTransition, isVisible, immediateMode, isRouterContext]);

  // Determine if it's an initial load for the conditional rendering logic below
  const isCurrentlyInitialLoad = prevLocationPathnameRef.current === null;

  // Conditional rendering based on effectiveDisabled
  if (effectiveDisabled) {
    if (isCurrentlyInitialLoad && disableInitialTransition) {
      // On initial load, if initial transition is disabled, render children directly.
      return <>{children}</>;
    } else if (!isCurrentlyInitialLoad) {
      // For subsequent navigations, if transitions are generally disabled, render children directly.
      return <>{children}</>;
    }
    // If it's an initial load, disableInitialTransition is FALSE,
    // but effectiveDisabled is TRUE (e.g., due to prefersReducedMotion),
    // we fall through and render the transition container. The useEffect
    // above will set isVisible to true, effectively showing the content without animation.
  }

  const containerStyle: React.CSSProperties = {
    ...pageTransitionStyles.container,
    ...(pageTransitionStyles.transitions[type] || pageTransitionStyles.transitions.fadeSlide),
    opacity: isVisible ? 1 : 0,
    transform: getTransform(type, isVisible),
    transitionProperty: 'opacity, transform', // Explicitly state what transitions
    transitionDuration: `${finalDuration}ms`,
    transitionTimingFunction: finalEasing,
  };

  if (enableHardwareAcceleration) {
    containerStyle.willChange = 'opacity, transform';
  }

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
    case 'slide': // Default slide often means from right
    case 'slideRight':
      return isVisible ? 'translateX(0)' : 'translateX(20px)'; // Enters from right
    case 'slideLeft':
      return isVisible ? 'translateX(0)' : 'translateX(-20px)'; // Enters from left
    case 'slideUp': // Content slides up into view
      return isVisible ? 'translateY(0)' : 'translateY(10px)';  // Starts below, moves up
    case 'slideDown': // Content slides down into view
      return isVisible ? 'translateY(0)' : 'translateY(-10px)'; // Starts above, moves down
    case 'zoom':
      return isVisible ? 'scale(1)' : 'scale(0.98)'; // Zooms in
    case 'fadeSlide': // Fades and slides up slightly
      return isVisible ? 'translateY(0)' : 'translateY(10px)'; // Starts below, moves up
    case 'fade':
    default:
      return 'none';
  }
};

export default PageTransition;
