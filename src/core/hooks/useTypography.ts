import { useMemo } from 'react';
import { TYPOGRAPHY_VARIANTS, FONT_FAMILIES, FONT_SIZES, FONT_WEIGHTS, LINE_HEIGHTS } from '../styles/typography';
import { TypographyVariant } from '../components/Typography/Typography';

interface UseTypographyProps {
  variant?: TypographyVariant;
  size?: keyof typeof FONT_SIZES;
  weight?: keyof typeof FONT_WEIGHTS;
  lineHeight?: keyof typeof LINE_HEIGHTS;
  fontFamily?: keyof typeof FONT_FAMILIES;
}

export const useTypography = ({
  variant,
  size,
  weight,
  lineHeight,
  fontFamily = 'primary'
}: UseTypographyProps = {}) => {
  
  return useMemo(() => {
    const baseStyle = {
      fontFamily: FONT_FAMILIES[fontFamily],
    };

    // Si se especifica una variante, usar sus estilos
    if (variant) {
      const variantStyle = TYPOGRAPHY_VARIANTS[variant];
      return {
        ...baseStyle,
        ...variantStyle,
        // Permitir sobrescribir propiedades específicas
        ...(size && { fontSize: FONT_SIZES[size] }),
        ...(weight && { fontWeight: FONT_WEIGHTS[weight] }),
        ...(lineHeight && { lineHeight: LINE_HEIGHTS[lineHeight] }),
      };
    }

    // Si no hay variante, construir desde las propiedades individuales
    return {
      ...baseStyle,
      ...(size && { fontSize: FONT_SIZES[size] }),
      ...(weight && { fontWeight: FONT_WEIGHTS[weight] }),
      ...(lineHeight && { lineHeight: LINE_HEIGHTS[lineHeight] }),
    };
  }, [variant, size, weight, lineHeight, fontFamily]);
};

// Hook específico para obtener estilos CSS como string
export const useTypographyCSS = (props: UseTypographyProps = {}) => {
  const styles = useTypography(props);
  
  return useMemo(() => {
    return Object.entries(styles)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
      .join('; ');
  }, [styles]);
};

// Hook para obtener variables CSS
export const useTypographyVariables = () => {
  return useMemo(() => ({
    fontSizes: FONT_SIZES,
    fontWeights: FONT_WEIGHTS,
    lineHeights: LINE_HEIGHTS,
    fontFamilies: FONT_FAMILIES,
    variants: TYPOGRAPHY_VARIANTS,
  }), []);
};

// Exportar constantes para uso externo
export {
  FONT_SIZES,
  FONT_WEIGHTS,
  LINE_HEIGHTS,
  FONT_FAMILIES,
  TYPOGRAPHY_VARIANTS
} from '../styles/typography';

// Exportar tipos para uso externo
export type {
  UseTypographyProps
};
