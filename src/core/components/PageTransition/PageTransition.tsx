import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
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
  enableHardwareAcceleration = false,
  respectReducedMotion = true,
  disableInitialTransition = false,
  immediateMode = false,
  standalone = false,
  triggerKey,
}) => {
  const location = useSafeLocation();
  const [isVisible, setIsVisible] = useState(!disableInitialTransition); 
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isRouterContext, setIsRouterContext] = useState(true); // Estado faltante agregado
  
  const prevLocationPathnameRef = useRef<string | null>(null);
  const prevTriggerKeyRef = useRef<string | number | undefined>(triggerKey);
  const animationTimerRef = useRef<number | null>(null);
  const mountedRef = useRef(true);

  // Detectar si estamos en un contexto de Router - Mejorado
  useEffect(() => {
    // Solo ejecutar si no estamos en modo standalone
    if (standalone) {
      setIsRouterContext(false);
      return;
    }

    try {
      // Verificar si location es válido y tiene las propiedades esperadas
      const hasValidLocation = location && 
        typeof location === 'object' && 
        typeof location.pathname === 'string' &&
        location.pathname.length > 0;
      
      setIsRouterContext(hasValidLocation);
    } catch (error) {
      // En caso de error, asumir que no hay contexto de Router
      setIsRouterContext(false);
    }
  }, [location, standalone]);

  const finalDuration = duration ?? PRESET_CONFIG[preset]?.duration ?? 300;
  const finalEasing = easing ?? PRESET_CONFIG[preset]?.easing ?? 'cubic-bezier(0.4, 0, 0.2, 1)';

  const prefersReducedMotion = useMemo(() => {
    if (typeof window !== 'undefined' && respectReducedMotion) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  }, [respectReducedMotion]);

  const effectiveDisabled = disabled || prefersReducedMotion;

  // Optimized animation trigger function
  const triggerAnimation = useCallback((immediate = false) => {
    if (!mountedRef.current || effectiveDisabled) return;

    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
    }

    if (immediate || immediateMode) {
      setDisplayChildren(children);
      setIsVisible(false);
      animationTimerRef.current = window.setTimeout(() => {
        if (mountedRef.current) {
          setIsVisible(true);
        }
      }, 10);
    } else {
      setIsVisible(false);
      animationTimerRef.current = window.setTimeout(() => {
        if (mountedRef.current) {
          setDisplayChildren(children);
          setIsVisible(true);
        }
      }, finalDuration);
    }
  }, [children, effectiveDisabled, finalDuration, immediateMode]);

  // Handle mount and unmount
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
    };
  }, []);

  // Optimized main effect with better dependency management
  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
      setDisplayChildren(children);
      if (!disableInitialTransition && !effectiveDisabled) {
        setIsVisible(false);
        animationTimerRef.current = window.setTimeout(() => {
          if (mountedRef.current) {
            setIsVisible(true);
          }
        }, 10);
      }
      prevLocationPathnameRef.current = standalone ? null : location.pathname;
      prevTriggerKeyRef.current = triggerKey;
      return;
    }

    if (effectiveDisabled) {
      setDisplayChildren(children);
      setIsVisible(true);
      return;
    }

    // Handle standalone mode with triggerKey
    if (standalone && triggerKey !== prevTriggerKeyRef.current) {
      triggerAnimation();
      prevTriggerKeyRef.current = triggerKey;
      return;
    }

    // Handle router navigation
    if (!standalone && location.pathname !== prevLocationPathnameRef.current) {
      triggerAnimation();
      prevLocationPathnameRef.current = location.pathname;
      return;
    }

    // Handle children changes without navigation
    if (displayChildren !== children && location.pathname === prevLocationPathnameRef.current) {
      setDisplayChildren(children);
    }

  }, [
    children, 
    location.pathname, 
    effectiveDisabled, 
    triggerAnimation, 
    standalone, 
    triggerKey, 
    disableInitialTransition,
    isInitialized
  ]);

  // Early return for disabled states
  if (effectiveDisabled) {
    return <>{children}</>;
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
