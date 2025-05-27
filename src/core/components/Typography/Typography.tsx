import React from 'react';
import { useTypography } from '../../hooks/useTypography';
import { TYPOGRAPHY_VARIANTS, FONT_SIZES, FONT_WEIGHTS, LINE_HEIGHTS, FONT_FAMILIES } from '../../styles/typography';

interface TypographyProps {
  variant?: keyof typeof TYPOGRAPHY_VARIANTS;
  size?: keyof typeof FONT_SIZES;
  weight?: keyof typeof FONT_WEIGHTS;
  lineHeight?: keyof typeof LINE_HEIGHTS;
  fontFamily?: keyof typeof FONT_FAMILIES;
  component?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  size,
  weight,
  lineHeight,
  fontFamily,
  component,
  children,
  className = '',
  style = {},
  ...props
}) => {
  const typographyStyles = useTypography({
    variant,
    size,
    weight,
    lineHeight,
    fontFamily,
  });

  // Determinar el componente a renderizar
  const Component = component || getDefaultComponent(variant);

  const combinedStyles = {
    ...typographyStyles,
    ...style,
  };

  return (
    <Component
      className={className}
      style={combinedStyles}
      {...props}
    >
      {children}
    </Component>
  );
};

// Función auxiliar para determinar el componente por defecto según la variante
const getDefaultComponent = (variant: keyof typeof TYPOGRAPHY_VARIANTS): React.ElementType => {
  const componentMap: Record<string, React.ElementType> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    body: 'p',
    bodyLarge: 'p',
    bodySmall: 'p',
    caption: 'span',
    button: 'span',
  };

  return componentMap[variant] || 'p';
};

export default Typography;
