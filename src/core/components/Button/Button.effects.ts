import { useCallback, useRef, useState } from 'react';
import type { ButtonEffects } from './Button.types';

interface RippleState {
  x: number;
  y: number;
  size: number;
  show: boolean;
}

export const useButtonEffects = (effects: ButtonEffects = {}) => {
  const [ripples, setRipples] = useState<RippleState[]>([]);
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const rippleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const createRipple = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (!effects.ripple) return;

    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple: RippleState = {
      x,
      y,
      size,
      show: true,
    };

    setRipples(prev => [...prev, newRipple]);

    if (rippleTimeoutRef.current) {
      clearTimeout(rippleTimeoutRef.current);
    }

    rippleTimeoutRef.current = setTimeout(() => {
      setRipples(prev => prev.slice(1));
    }, 600);
  }, [effects.ripple]);

  const handleMouseDown = useCallback(() => {
    if (effects.bounce) {
      setIsPressed(true);
    }
  }, [effects.bounce]);

  const handleMouseUp = useCallback(() => {
    if (effects.bounce) {
      setIsPressed(false);
    }
  }, [effects.bounce]);

  const getEffectClasses = useCallback(() => {
    const classes: string[] = [];
    
    if (effects.hover) classes.push('button-effect-hover');
    if (effects.bounce) classes.push('button-effect-bounce');
    if (effects.glow) classes.push('button-effect-glow');
    if (effects.shadowEffect) classes.push('button-effect-shadow');
    if (isPressed && effects.bounce) classes.push('button-pressed');

    return classes.join(' ');
  }, [effects, isPressed]);

  return {
    ripples,
    createRipple,
    handleMouseDown,
    handleMouseUp,
    getEffectClasses,
    isPressed,
  };
};
