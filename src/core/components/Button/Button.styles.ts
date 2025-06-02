import { useMemo } from 'react';
import { theme } from '@/core/styles/theme';

interface StyleProps {
  variant: string;
  size: string;
  fullWidth: boolean;
  disabled: boolean;
}

export const useButtonStyles = ({ variant, size, fullWidth, disabled }: StyleProps) => {
  return useMemo(() => {
    const baseStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.borderRadius.full,
      fontWeight: 'bold',
      transition: 'all 0.2s ease-in-out',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      width: fullWidth ? '100%' : 'auto',
      border: 'none',
      position: 'relative' as const,
      overflow: 'hidden' as const,
      outline: 'none',
    };

    const variantStyles = {
      primary: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.white,
        boxShadow: theme.shadows.button,
      },
      secondary: {
        backgroundColor: 'transparent',
        color: theme.colors.primary,
        border: `2px solid ${theme.colors.primary}`,
      },
      danger: {
        backgroundColor: theme.colors.danger,
        color: theme.colors.white,
      },
      ghost: {
        backgroundColor: 'transparent',
        color: theme.colors.gray.dark,
      },
    };

    const sizeStyles = {
      small: {
        padding: '8px 16px',
        fontSize: theme.typography.fontSize.sm,
      },
      medium: {
        padding: '12px 24px',
        fontSize: theme.typography.fontSize.md,
      },
      large: {
        padding: '16px 32px',
        fontSize: theme.typography.fontSize.lg,
      },
    };

    const effectStyles = `
      .button-ripple-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        border-radius: inherit;
      }

      .button-ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
      }

      @keyframes ripple {
        to {
          transform: scale(1);
          opacity: 0;
        }
      }

      .button-effect-hover:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      }

      .button-effect-bounce.button-pressed {
        transform: scale(0.95);
      }

      .button-effect-glow:hover:not(:disabled) {
        box-shadow: 0 0 20px rgba(var(--button-color, 59, 130, 246), 0.5);
      }

      .button-effect-shadow {
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s ease;
      }

      .button-effect-shadow:hover:not(:disabled) {
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      }

      @keyframes loading-bounce {
        0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
        40% { transform: scale(1); opacity: 1; }
      }

      .loading-spinner {
        animation: loading-bounce 1.4s infinite ease-in-out both;
      }
    `;

    // Inject styles if not already present
    if (typeof document !== 'undefined' && !document.getElementById('button-effects-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'button-effects-styles';
      styleSheet.textContent = effectStyles;
      document.head.appendChild(styleSheet);
    }

    return {
      button: `button-${variant} button-${size}`,
      buttonStyle: {
        ...baseStyles,
        ...variantStyles[variant as keyof typeof variantStyles],
        ...sizeStyles[size as keyof typeof sizeStyles],
        '--button-color': getButtonColorVar(variant),
      },
      iconStyle: {
        marginRight: '8px',
        display: 'inline-flex',
      },
    };
  }, [variant, size, fullWidth, disabled]);
};

const getButtonColorVar = (variant: string): string => {
  switch (variant) {
    case 'primary': return '59, 130, 246';
    case 'danger': return '239, 68, 68';
    case 'secondary': return '107, 114, 128';
    default: return '107, 114, 128';
  }
};