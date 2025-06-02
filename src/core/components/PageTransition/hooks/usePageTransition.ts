import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export interface UsePageTransitionOptions {
  duration?: number;
  type?: 'fade' | 'slide' | 'slideLeft' | 'slideRight' | 'slideUp' | 'slideDown' | 'zoom' | 'fadeSlide';
  preset?: 'fast' | 'normal' | 'slow' | 'custom' | 'fadeIn' | 'scale' | 'none';
  easing?: string;
  disabled?: boolean;
}

export interface TransitionConfig {
  preset?: 'fadeIn' | 'slideLeft' | 'slideRight' | 'slideUp' | 'slideDown' | 'scale' | 'none';
  duration?: number;
  easing?: string;
}

export interface TransitionState {
  isTransitioning: boolean;
  currentRoute: string;
  config: TransitionConfig;
}

export interface UsePageTransitionReturn {
  isTransitioning: boolean;
  triggerTransition: () => void;
  transitionProps: {
    duration?: number;
    type: string;
    preset: string;
    easing?: string;
    disabled: boolean;
  };
  // Nuevos métodos para tu aplicación
  state: TransitionState;
  updateConfig: (config: TransitionConfig) => void;
  startTransition: (route?: string) => void;
}

// Hook seguro para obtener la ubicación
const useSafeLocation = () => {
  try {
    return useLocation();
  } catch (error) {
    // Si no está dentro de un Router, retornamos un objeto mock
    return { pathname: window.location.pathname };
  }
};

export const usePageTransition = (options: UsePageTransitionOptions = {}): UsePageTransitionReturn => {
  const {
    duration,
    type = 'fadeSlide',
    preset = 'normal',
    easing,
    disabled = false
  } = options;

  const location = useSafeLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentConfig, setCurrentConfig] = useState<TransitionConfig>({
    preset: preset as TransitionConfig['preset'],
    duration,
    easing
  });
  
  const [isRouterContext, setIsRouterContext] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const configRef = useRef(currentConfig);
  const transitionTimeoutRef = useRef<number | null>(null);
  const prevPathnameRef = useRef<string | null>(null);

  // Detectar contexto de Router
  useEffect(() => {
    try {
      if (!location || typeof location.pathname !== 'string') {
        setIsRouterContext(false);
      }
    } catch {
      setIsRouterContext(false);
    }
  }, [location]);

  // Actualizar ref cuando cambie la configuración
  useEffect(() => {
    configRef.current = currentConfig;
  }, [currentConfig]);

  // Memoized transition duration calculation
  const transitionDuration = useMemo(() => {
    return configRef.current.duration || 
           duration || 
           (preset === 'fast' ? 200 : preset === 'slow' ? 500 : 300);
  }, [configRef.current.duration, duration, preset]);

  const updateConfig = useCallback((config: TransitionConfig) => {
    setCurrentConfig(prev => ({
      ...prev,
      ...config
    }));
  }, []);

  const startTransition = useCallback((route?: string) => {
    if (disabled) return;
    
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    
    setIsTransitioning(true);
    
    transitionTimeoutRef.current = window.setTimeout(() => {
      setIsTransitioning(false);
    }, transitionDuration);
  }, [transitionDuration, disabled]);

  const triggerTransition = useCallback(() => {
    startTransition();
  }, [startTransition]);

  // Optimized effect for route changes
  useEffect(() => {
    if (!isInitialized) {
      setIsInitialized(true);
      prevPathnameRef.current = isRouterContext ? location.pathname : window.location.pathname;
      return;
    }

    const currentPath = isRouterContext ? location.pathname : window.location.pathname;
    
    if (isRouterContext && currentPath !== prevPathnameRef.current) {
      triggerTransition();
      prevPathnameRef.current = currentPath;
    }
  }, [location.pathname, triggerTransition, isRouterContext, isInitialized]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  // Estado completo de la transición
  const state: TransitionState = {
    isTransitioning,
    currentRoute: isRouterContext ? location.pathname : window.location.pathname,
    config: currentConfig
  };

  return {
    isTransitioning,
    triggerTransition,
    transitionProps: {
      duration: currentConfig.duration || duration,
      type,
      preset: currentConfig.preset || preset,
      easing: currentConfig.easing || easing,
      disabled,
    },
    state,
    updateConfig,
    startTransition,
  };
};
