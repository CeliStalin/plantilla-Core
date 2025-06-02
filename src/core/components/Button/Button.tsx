import React from 'react';
import { LoadingDots } from '../../components/Login/components/LoadingDots';
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
      style={styles.buttonStyle}
      {...props}
    >
      {effects.ripple && (
        <span className="button-ripple-container">
          {ripples.map((ripple, index) => (
            <span
              key={index}
              className="button-ripple"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
              }}
            />
          ))}
        </span>
      )}
      
      {loading ? (
        <LoadingDots size="small" color={variant === 'primary' ? '#fff' : '#000'} />
      ) : (
        <>
          {icon && <span style={styles.iconStyle}>{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;