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
  const [isVisible, setIsVisible] = useState(false); // Start hidden for initial animation
  const [displayChildren, setDisplayChildren] = useState(children); // Children to actually render
  
  const prevLocationPathnameRef = useRef<string | null>(null); // Use null to detect initial load
  const animationTimerRef = useRef<number | null>(null);

  const finalDuration = duration ?? PRESET_CONFIG[preset]?.duration ?? 300;
  const finalEasing = easing ?? PRESET_CONFIG[preset]?.easing ?? 'cubic-bezier(0.4, 0, 0.2, 1)';

  useEffect(() => {
    // Clear timer on unmount
    return () => {
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (disabled) {
      setDisplayChildren(children);
      setIsVisible(true);
      prevLocationPathnameRef.current = location.pathname; // Keep ref updated
      return;
    }

    // Clear any pending animation timer before starting a new one
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
    }

    const isInitialLoad = prevLocationPathnameRef.current === null;
    const hasPathChanged = !isInitialLoad && prevLocationPathnameRef.current !== location.pathname;

    if (isInitialLoad) {
      // Initial load: set children and animate in
      setDisplayChildren(children);
      // A tiny delay ensures CSS transitions trigger correctly on mount for the "in" animation
      animationTimerRef.current = window.setTimeout(() => {
        setIsVisible(true);
      }, 10); // Minimal delay
      prevLocationPathnameRef.current = location.pathname;
    } else if (hasPathChanged) {
      // Path has changed: animate out current content, then update children and animate in
      setIsVisible(false); // Animate out current displayChildren
      animationTimerRef.current = window.setTimeout(() => {
        setDisplayChildren(children); // Update to new children
        setIsVisible(true);           // Animate in new children
        prevLocationPathnameRef.current = location.pathname;
      }, finalDuration); // Wait for out-animation to (partially) complete
    } else {
      // Path is the same. Children prop might have changed, or it's a re-render.
      // If children prop itself changed, update displayChildren.
      if (displayChildren !== children) {
        // For children-only updates without path change, you might want a different animation
        // or just update. For now, update content. If isVisible is true, it will appear.
        setDisplayChildren(children);
      }
      // Ensure visibility if it was false and component is not disabled (e.g., after 'disabled' toggled off)
      if (!isVisible && !disabled) {
        setIsVisible(true);
      }
    }
  }, [children, location.pathname, disabled, finalDuration, displayChildren]); // displayChildren added to deps to handle direct child updates

  // Si las transiciones están deshabilitadas, renderizar directamente
  if (disabled) {
    return <>{children}</>;
  }

  const containerStyle = {
    ...pageTransitionStyles.container,
    ...(pageTransitionStyles.transitions[type] || pageTransitionStyles.transitions.fadeSlide),
    opacity: isVisible ? 1 : 0,
    transform: getTransform(type, isVisible),
    transitionProperty: 'opacity, transform', // Explicitly state what transitions
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
