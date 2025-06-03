import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { pageTransitionStyles } from './PageTransition.styles';
import type { PageTransitionProps } from './PageTransition.types';

// Configuración de presets - Add fade preset
const PRESET_CONFIG = {
  fast: { duration: 200, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  normal: { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  slow: { duration: 500, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  custom: { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  minimal: { duration: 150, easing: 'ease-out' }, // Preset minimal optimizado para apps externas
  fade: { duration: 250, easing: 'ease-in-out' }, // New fade preset for external apps
  none: { duration: 0, easing: 'linear' }
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
  style,
  disabled = false,
  enableHardwareAcceleration = false,
  respectReducedMotion = true,
  disableInitialTransition = false,
  immediateMode = false,
  standalone = false,
  triggerKey,
  exitBeforeEnter = false,
  mode = 'sync',
}) => {
  const location = useSafeLocation();
  const [isVisible, setIsVisible] = useState(!disableInitialTransition); 
  const [displayChildren, setDisplayChildren] = useState(children);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isRouterContext, setIsRouterContext] = useState(true);
  
  // New states for exit-before-enter functionality
  const [isExiting, setIsExiting] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [pendingChildren, setPendingChildren] = useState<React.ReactNode>(null);
  
  const prevLocationPathnameRef = useRef<string | null>(null);
  const prevTriggerKeyRef = useRef<string | number | undefined>(triggerKey);
  const animationTimerRef = useRef<number | null>(null);
  const exitTimerRef = useRef<number | null>(null);
  const enterTimerRef = useRef<number | null>(null);
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

  // Configuración final considerando el preset minimal
  const finalDuration = useMemo(() => {
    if (preset === 'none') return 0;
    return duration ?? PRESET_CONFIG[preset]?.duration ?? 300;
  }, [duration, preset]);

  const finalEasing = useMemo(() => {
    return easing ?? PRESET_CONFIG[preset]?.easing ?? 'cubic-bezier(0.4, 0, 0.2, 1)';
  }, [easing, preset]);

  // Para preset minimal, simplificar la detección de reduced motion
  const prefersReducedMotion = useMemo(() => {
    if (preset === 'minimal') {
      // En modo minimal, ser más conservador con las animaciones
      return typeof window !== 'undefined' && respectReducedMotion && 
             (window.matchMedia('(prefers-reduced-motion: reduce)').matches || 
              /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    }
    
    if (typeof window !== 'undefined' && respectReducedMotion) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  }, [respectReducedMotion, preset]);

  const effectiveDisabled = disabled || prefersReducedMotion || preset === 'none';

  // Enhanced animation trigger function with exit-before-enter support
  const triggerAnimation = useCallback((immediate = false) => {
    if (!mountedRef.current || effectiveDisabled) return;

    // Clear existing timers
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
    }
    if (exitTimerRef.current) {
      clearTimeout(exitTimerRef.current);
    }
    if (enterTimerRef.current) {
      clearTimeout(enterTimerRef.current);
    }

    const shouldUseImmediate = immediate || immediateMode || preset === 'minimal';
    // Handle concurrent mode as sync for compatibility
    const effectiveMode = exitBeforeEnter ? 'out-in' : (mode === 'concurrent' ? 'sync' : mode);

    if (effectiveDisabled) {
      setDisplayChildren(children);
      setIsVisible(true);
      return;
    }

    // Handle exit-before-enter mode
    if (exitBeforeEnter || effectiveMode === 'out-in') {
      setPendingChildren(children);
      setIsExiting(true);
      setIsVisible(false);
      
      exitTimerRef.current = window.setTimeout(() => {
        if (mountedRef.current) {
          setIsExiting(false);
          setDisplayChildren(pendingChildren);
          setIsEntering(true);
          
          enterTimerRef.current = window.setTimeout(() => {
            if (mountedRef.current) {
              setIsVisible(true);
              setIsEntering(false);
              setPendingChildren(null);
            }
          }, shouldUseImmediate ? (preset === 'minimal' ? 5 : 10) : 50);
        }
      }, shouldUseImmediate ? (preset === 'minimal' ? 5 : 10) : finalDuration);
      
      return;
    }

    // Handle in-out mode (enter new before old exits)
    if (effectiveMode === 'in-out') {
      setDisplayChildren(children);
      setIsEntering(true);
      setIsVisible(true);
      
      enterTimerRef.current = window.setTimeout(() => {
        if (mountedRef.current) {
          setIsEntering(false);
        }
      }, shouldUseImmediate ? (preset === 'minimal' ? 5 : 10) : finalDuration);
      
      return;
    }

    // Default sync mode (existing behavior) - also handles concurrent mode
    if (shouldUseImmediate) {
      setDisplayChildren(children);
      setIsVisible(false);
      animationTimerRef.current = window.setTimeout(() => {
        if (mountedRef.current) {
          setIsVisible(true);
        }
      }, preset === 'minimal' ? 5 : 10);
    } else {
      setIsVisible(false);
      animationTimerRef.current = window.setTimeout(() => {
        if (mountedRef.current) {
          setDisplayChildren(children);
          setIsVisible(true);
        }
      }, finalDuration);
    }
  }, [children, effectiveDisabled, finalDuration, immediateMode, preset, exitBeforeEnter, mode, pendingChildren]);

  // Handle mount and unmount
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
      }
      if (enterTimerRef.current) {
        clearTimeout(enterTimerRef.current);
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
        }, preset === 'minimal' ? 5 : 10);
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

  // Enhanced visibility logic for exit-before-enter
  const getEffectiveVisibility = (): boolean => {
    if (exitBeforeEnter || mode === 'out-in') {
      return isVisible && !isExiting;
    }
    return isVisible;
  };

  // Enhanced opacity calculation
  const getEffectiveOpacity = (): number => {
    if (exitBeforeEnter || mode === 'out-in') {
      if (isExiting) return 0;
      if (isEntering) return isVisible ? 1 : 0;
      return isVisible ? 1 : 0;
    }
    return isVisible ? 1 : 0;
  };

  const containerStyle: React.CSSProperties = {
    ...pageTransitionStyles.container,
    ...(pageTransitionStyles.transitions[type] || pageTransitionStyles.transitions.fadeSlide),
    ...style, // Merge user-provided styles
    opacity: getEffectiveOpacity(),
    transform: getMinimalTransform(type, getEffectiveVisibility()),
    transitionProperty: preset === 'minimal' ? 'opacity' : 'opacity, transform',
    transitionDuration: `${finalDuration}ms`,
    transitionTimingFunction: finalEasing,
  };

  if (enableHardwareAcceleration && preset !== 'minimal') {
    containerStyle.willChange = 'opacity, transform';
  } else if (preset === 'minimal') {
    containerStyle.willChange = 'opacity';
  }

  // Add transition state classes for CSS targeting
  const getTransitionClasses = (): string => {
    const classes = [`page-transition`];
    
    if (preset === 'minimal') {
      classes.push('page-transition--minimal');
    }
    
    if (preset === 'fade') {
      classes.push('page-transition--fade');
    }
    
    if (exitBeforeEnter) {
      classes.push('page-transition--exit-before-enter');
    }
    
    if (isExiting) {
      classes.push('page-transition--exiting');
    }
    
    if (isEntering) {
      classes.push('page-transition--entering');
    }
    
    if (mode && mode !== 'sync') {
      classes.push(`page-transition--${mode}`);
    }
    
    return classes.join(' ');
  };

  return (
    <div 
      className={`${getTransitionClasses()} ${className}`}
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
      return isVisible ? 'translateY(0)' : 'translateY(10px)';
    case 'slideDown':
      return isVisible ? 'translateY(0)' : 'translateY(-10px)';
    case 'zoom':
      return isVisible ? 'scale(1)' : 'scale(0.98)';
    case 'fadeSlide':
      return isVisible ? 'translateY(0)' : 'translateY(10px)';
    case 'fade':
    default:
      return 'none';
  }
};

const getMinimalTransform = (type: PageTransitionProps['type'], isVisible: boolean): string => {
  // For minimal preset, use simpler transforms
  switch (type) {
    case 'slide':
    case 'slideRight':
      return isVisible ? 'translateX(0)' : 'translateX(10px)';
    case 'slideLeft':
      return isVisible ? 'translateX(0)' : 'translateX(-10px)';
    case 'slideUp':
      return isVisible ? 'translateY(0)' : 'translateY(5px)';
    case 'slideDown':
      return isVisible ? 'translateY(0)' : 'translateY(-5px)';
    case 'zoom':
      return isVisible ? 'scale(1)' : 'scale(0.99)';
    case 'fadeSlide':
      return isVisible ? 'translateY(0)' : 'translateY(5px)';
    case 'fade':
    default:
      return 'none';
  }
};

export default PageTransition;
