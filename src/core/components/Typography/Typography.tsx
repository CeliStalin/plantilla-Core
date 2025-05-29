import React from 'react';
import { Theme, TextColors } from '../../theme';
import { TYPOGRAPHY_VARIANTS } from '../../styles/typography';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'body1' | 'body2' | 'bodyLarge' | 'bodySmall' | 'caption' | 'subtitle1' | 'subtitle2' | 'button';
export type TypographyColor = keyof TextColors | string; // Permitir strings adicionales
export type TypographyWeight = 'light' | 'normal' | 'medium' | 'bold' | number | string; // Expandir weight
export type TypographyAlign = 'left' | 'center' | 'right' | 'justify';

export interface TypographyProps {
  children: React.ReactNode;
  variant?: TypographyVariant;
  color?: TypographyColor;
  weight?: TypographyWeight;
  fontWeight?: TypographyWeight; // Agregar fontWeight como alias
  align?: TypographyAlign;
  className?: string;
  style?: React.CSSProperties;
  theme?: Theme;
  component?: React.ElementType | string;
  // Agregar propiedades adicionales comunes
  fontSize?: string | number;
  lineHeight?: string | number;
  letterSpacing?: string | number;
  // Propiedades de Material-UI para compatibilidad
  gutterBottom?: boolean;
  noWrap?: boolean;
  paragraph?: boolean;
  sx?: React.CSSProperties;
}

const variantMapping: Record<TypographyVariant, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  body1: 'p',
  body2: 'p',
  bodyLarge: 'p',
  bodySmall: 'p',
  caption: 'span',
  subtitle1: 'h6',
  subtitle2: 'h6',
  button: 'span',
};

// Función para mapear variantes legacy a las nuevas
const mapLegacyVariant = (variant: TypographyVariant): TypographyVariant => {
  const legacyMap: Record<string, TypographyVariant> = {
    'body': 'body',
    'body1': 'body',
    'body2': 'bodySmall',
    'bodyLarge': 'bodyLarge',
    'bodySmall': 'bodySmall',
  };
  return legacyMap[variant] || variant;
};

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body1',
  color = 'primary',
  weight = 'normal',
  fontWeight, // Nuevo prop
  align = 'left',
  className = '',
  style = {},
  theme,
  component,
  fontSize,
  lineHeight,
  letterSpacing,
  gutterBottom = false,
  noWrap = false,
  paragraph = false,
  sx = {},
}) => {
  const ElementType = component || variantMapping[variant];
  const mappedVariant = mapLegacyVariant(variant);
  
  // Usar fontWeight si está disponible, sino weight
  const finalWeight = fontWeight || weight;

  const getStyles = (): React.CSSProperties => {
    if (!theme) return { ...style, ...sx };

    // Resolver color dinámicamente
    const resolveColor = (colorValue: TypographyColor): string => {
      // Si es un color directo de textColors
      if (theme.textColors && typeof colorValue === 'string' && colorValue in theme.textColors) {
        return theme.textColors[colorValue as keyof TextColors];
      }
      
      // Manejar colores con notación de punto primero (ej: "gray.light")
      if (typeof colorValue === 'string' && colorValue.includes('.')) {
        const [mainColor, shade] = colorValue.split('.');
        
        // Buscar en textColors con notación de punto
        const dotNotationKey = `${mainColor}.${shade}`;
        if (theme.textColors && dotNotationKey in theme.textColors) {
          return theme.textColors[dotNotationKey as keyof TextColors];
        }
        
        // Buscar en theme.colors
        if (theme.colors && mainColor in theme.colors) {
          const colorObj = theme.colors[mainColor as keyof typeof theme.colors];
          if (typeof colorObj === 'object' && colorObj && shade in colorObj) {
            return colorObj[shade as keyof typeof colorObj];
          }
        }
      }
      
      // Si es un color del tema principal
      if (theme.colors && typeof colorValue === 'string' && colorValue in theme.colors) {
        const themeColor = theme.colors[colorValue as keyof typeof theme.colors];
        // Si el color es un string, devolverlo directamente
        if (typeof themeColor === 'string') {
          return themeColor;
        }
        // Si es un objeto (como gray), usar la propiedad medium por defecto
        if (typeof themeColor === 'object' && themeColor && 'medium' in themeColor) {
          return themeColor.medium;
        }
      }
      
      // Si es un valor directo de color (hex, rgb, etc.)
      return colorValue as string;
    };

    const baseStyles: React.CSSProperties = {
      margin: 0,
      fontFamily: theme.typography.fontFamily,
      color: resolveColor(color),
      fontWeight: finalWeight,
      textAlign: align,
      lineHeight: lineHeight || theme.typography.lineHeight.normal,
      fontSize: fontSize,
      letterSpacing: letterSpacing,
      // Estilos condicionales
      marginBottom: gutterBottom ? theme.spacing.md : undefined,
      whiteSpace: noWrap ? 'nowrap' : undefined,
      overflow: noWrap ? 'hidden' : undefined,
      textOverflow: noWrap ? 'ellipsis' : undefined,
    };

    // Usar los estilos del sistema de typography existente cuando estén disponibles
    const systemVariant = TYPOGRAPHY_VARIANTS[mappedVariant as keyof typeof TYPOGRAPHY_VARIANTS];
    if (systemVariant) {
      return {
        ...baseStyles,
        fontSize: systemVariant.fontSize,
        fontWeight: systemVariant.fontWeight,
        lineHeight: systemVariant.lineHeight,
        letterSpacing: systemVariant.letterSpacing,
        ...style,
      };
    }

    // Fallback para variantes no definidas en el sistema
    const variantStyles: Record<TypographyVariant, React.CSSProperties> = {
      h1: { fontSize: theme.typography.fontSize.xxl, fontWeight: theme.typography.fontWeight.bold },
      h2: { fontSize: theme.typography.fontSize.xl, fontWeight: theme.typography.fontWeight.bold },
      h3: { fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.bold },
      h4: { fontSize: theme.typography.fontSize.md, fontWeight: theme.typography.fontWeight.bold },
      h5: { fontSize: theme.typography.fontSize.sm, fontWeight: theme.typography.fontWeight.bold },
      h6: { fontSize: theme.typography.fontSize.xs, fontWeight: theme.typography.fontWeight.bold },
      body: { fontSize: theme.typography.fontSize.md },
      body1: { fontSize: theme.typography.fontSize.md },
      body2: { fontSize: theme.typography.fontSize.sm },
      bodyLarge: { fontSize: theme.typography.fontSize.lg },
      bodySmall: { fontSize: theme.typography.fontSize.sm },
      caption: { fontSize: theme.typography.fontSize.xs },
      subtitle1: { fontSize: theme.typography.fontSize.lg, fontWeight: theme.typography.fontWeight.medium },
      subtitle2: { fontSize: theme.typography.fontSize.md, fontWeight: theme.typography.fontWeight.medium },
      button: { fontSize: theme.typography.fontSize.md, fontWeight: theme.typography.fontWeight.medium },
    };

    return {
      ...baseStyles,
      ...variantStyles[variant],
      ...style,
      ...sx,
    };
  };

  // Si paragraph es true, forzar el componente a 'p'
  const FinalElementType = paragraph ? 'p' : ElementType;

  return (
    <FinalElementType className={className} style={getStyles()}>
      {children}
    </FinalElementType>
  );
};

export default Typography;
