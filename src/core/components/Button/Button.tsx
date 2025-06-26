import React from 'react';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { ButtonProps } from './Button.types';
import { useButtonStyles } from './Button.styles';
import { useButtonEffects } from './Button.effects';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  onClick,
  type = 'button',
  className = '',
  effects = {},
  ...props
}) => {
  const styles = useButtonStyles({ variant, size, fullWidth, disabled });
  const {
    ripples,
    createRipple,
    handleMouseDown,
    handleMouseUp,
    getEffectClasses,
  } = useButtonEffects(effects);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading) {
      createRipple(event);
      onClick?.(event);
    }
  };

  const handleMouseDownCombined = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleMouseDown();
    props.onMouseDown?.(event);
  };

  const handleMouseUpCombined = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleMouseUp();
    props.onMouseUp?.(event);
  };

  return (
    <button
      type={type}
      className={`${styles.button} ${getEffectClasses()} ${className}`}
      onClick={handleClick}
      onMouseDown={handleMouseDownCombined}
      onMouseUp={handleMouseUpCombined}
      onMouseLeave={handleMouseUp}
      disabled={disabled || loading}
      style={{ ...styles.buttonStyle, width: '100%' }}
      {...props}
    >
      {loading ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <LoadingSpinner size={size} color={variant === 'primary' ? '#fff' : '#000'} />
          <span style={{ marginLeft: 12, whiteSpace: 'nowrap', fontWeight: 600 }}>{children}</span>
        </span>
      ) : (
        <>
          {icon && <span style={styles.iconStyle}>{icon}</span>}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

export default Button;