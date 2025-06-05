export interface FontFace {
  fontFamily: string;
  src: string;
  fontWeight: number;
  fontStyle: string;
  fontDisplay: string;
}

export interface TypographyScale {
  xs: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string; // Mantenemos '2xl' por si se usa directamente en otro lugar
  xxl: string; // Añadimos xxl que es requerido por ThemeTypography
  '3xl': string;
  '4xl': string;
  '5xl': string;
}

export interface FontWeights {
  light: number;
  normal: number;
  medium: number;
  semibold: number;
  bold: number;
  extrabold: number;
}

export interface LineHeights {
  none: number;
  tight: number;
  snug: number;
  normal: number;
  relaxed: number;
  loose: number;
}

export interface LetterSpacing {
  tighter: string;
  tight: string;
  normal: string;
  wide: string;
  wider: string;
  widest: string;
}

// Definición de fuentes como constantes exportables
export const FONT_FACES: FontFace[] = [
  {
    fontFamily: 'Work Sans',
    src: "url('./assets/fonts/work-sans/WorkSans-Regular.woff2') format('woff2')",
    fontWeight: 400,
    fontStyle: 'normal',
    fontDisplay: 'swap',
  },
  {
    fontFamily: 'Work Sans',
    src: "url('./assets/fonts/work-sans/WorkSans-Italic.woff2') format('woff2')",
    fontWeight: 400,
    fontStyle: 'italic',
    fontDisplay: 'swap',
  },
  {
    fontFamily: 'Work Sans',
    src: "url('./assets/fonts/work-sans/WorkSans-Bold.woff2') format('woff2')",
    fontWeight: 700,
    fontStyle: 'normal',
    fontDisplay: 'swap',
  },
];

// Escalas de tipografía exportables
export const FONT_SIZES: TypographyScale = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  md: '1rem',       // 16px (alias de base)
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px (se mantiene por compatibilidad si se usa directamente)
  xxl: '1.5rem',    // 24px (este es el que requiere ThemeTypography.fontSize)
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem',    // 48px
};

export const FONT_WEIGHTS: FontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
};

export const LINE_HEIGHTS: LineHeights = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 1.75,
};

export const LETTER_SPACING: LetterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
};

// Familias de fuentes
export const FONT_FAMILIES = {
  primary: "'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  fallback: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  mono: "'Fira Code', 'Monaco', 'Cascadia Code', 'Segoe UI Mono', monospace",
} as const;

// Tipos predefinidos para componentes comunes
export const TYPOGRAPHY_VARIANTS = {
  h1: {
    fontSize: FONT_SIZES['4xl'],
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.tight,
    letterSpacing: LETTER_SPACING.tight,
  },
  h2: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: LINE_HEIGHTS.tight,
    letterSpacing: LETTER_SPACING.tight,
  },
  h3: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: FONT_WEIGHTS.semibold,
    lineHeight: LINE_HEIGHTS.snug,
    letterSpacing: LETTER_SPACING.normal,
  },
  h4: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: LINE_HEIGHTS.snug,
    letterSpacing: LETTER_SPACING.normal,
  },
  h5: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: LINE_HEIGHTS.normal,
    letterSpacing: LETTER_SPACING.normal,
  },
  h6: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: LINE_HEIGHTS.normal,
    letterSpacing: LETTER_SPACING.normal,
  },
  body: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.normal,
    lineHeight: LINE_HEIGHTS.normal,
    letterSpacing: LETTER_SPACING.normal,
  },
  bodyLarge: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.normal,
    lineHeight: LINE_HEIGHTS.relaxed,
    letterSpacing: LETTER_SPACING.normal,
  },
  bodySmall: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.normal,
    lineHeight: LINE_HEIGHTS.normal,
    letterSpacing: LETTER_SPACING.normal,
  },
  caption: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.normal,
    lineHeight: LINE_HEIGHTS.tight,
    letterSpacing: LETTER_SPACING.wide,
  },
  button: {
    fontSize: FONT_SIZES.base,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: LINE_HEIGHTS.none,
    letterSpacing: LETTER_SPACING.wide,
  },
} as const;

// Función para generar CSS de @font-face
export const generateFontFaceCSS = (fontFaces: FontFace[] = FONT_FACES): string => {
  return fontFaces.map(face => `
@font-face {
  font-family: '${face.fontFamily}';
  src: ${face.src};
  font-weight: ${face.fontWeight};
  font-style: ${face.fontStyle};
  font-display: ${face.fontDisplay};
}
  `).join('\n');
};

// Función para generar CSS variables
export const generateTypographyVariables = (): string => {
  const fontSizeVars = Object.entries(FONT_SIZES)
    .map(([key, value]) => `  --font-size-${key}: ${value};`)
    .join('\n');
  
  const fontWeightVars = Object.entries(FONT_WEIGHTS)
    .map(([key, value]) => `  --font-weight-${key}: ${value};`)
    .join('\n');
    
  const lineHeightVars = Object.entries(LINE_HEIGHTS)
    .map(([key, value]) => `  --line-height-${key}: ${value};`)
    .join('\n');
    
  const letterSpacingVars = Object.entries(LETTER_SPACING)
    .map(([key, value]) => `  --letter-spacing-${key}: ${value};`)
    .join('\n');

  return `
:root {
  /* Font Families */
  --font-family-primary: ${FONT_FAMILIES.primary};
  --font-family-fallback: ${FONT_FAMILIES.fallback};
  --font-family-mono: ${FONT_FAMILIES.mono};
  
  /* Font Sizes */
${fontSizeVars}
  
  /* Font Weights */
${fontWeightVars}
  
  /* Line Heights */
${lineHeightVars}
  
  /* Letter Spacing */
${letterSpacingVars}
}
  `;
};

// Objeto de utilidades de tipografía (renombrado para evitar conflictos)
export const TypographyUtils = {
  // Constantes principales
  FONT_FACES,
  FONT_SIZES,
  FONT_WEIGHTS,
  LINE_HEIGHTS,
  LETTER_SPACING,
  FONT_FAMILIES,
  TYPOGRAPHY_VARIANTS,
  
  // Funciones utilitarias
  generateFontFaceCSS,
  generateTypographyVariables,
  
  // Acceso directo a variantes comunes
  variants: TYPOGRAPHY_VARIANTS,
  sizes: FONT_SIZES,
  weights: FONT_WEIGHTS,
  families: FONT_FAMILIES,
  lineHeights: LINE_HEIGHTS,
  letterSpacing: LETTER_SPACING,
  
  // Métodos de conveniencia
  getFontFace: (fontFaces: FontFace[] = FONT_FACES) => generateFontFaceCSS(fontFaces),
  getVariables: () => generateTypographyVariables(),
  
  // CSS helpers
  createTypographyStyle: (variant: keyof typeof TYPOGRAPHY_VARIANTS) => {
    return TYPOGRAPHY_VARIANTS[variant];
  },
  
  // Función para obtener estilos de texto completos
  getTextStyle: (options: {
    variant?: keyof typeof TYPOGRAPHY_VARIANTS;
    size?: keyof typeof FONT_SIZES;
    weight?: keyof typeof FONT_WEIGHTS;
    family?: keyof typeof FONT_FAMILIES;
    lineHeight?: keyof typeof LINE_HEIGHTS;
    letterSpacing?: keyof typeof LETTER_SPACING;
  } = {}) => {
    const {
      variant,
      size,
      weight,
      family = 'primary',
      lineHeight = 'normal',
      letterSpacing = 'normal'
    } = options;
    
    // Si se especifica una variante, usar sus valores
    if (variant && TYPOGRAPHY_VARIANTS[variant]) {
      return {
        fontFamily: FONT_FAMILIES[family],
        ...TYPOGRAPHY_VARIANTS[variant]
      };
    }
    
    // Construir estilo personalizado
    return {
      fontFamily: FONT_FAMILIES[family],
      fontSize: size ? FONT_SIZES[size] : FONT_SIZES.base,
      fontWeight: weight ? FONT_WEIGHTS[weight] : FONT_WEIGHTS.normal,
      lineHeight: LINE_HEIGHTS[lineHeight],
      letterSpacing: LETTER_SPACING[letterSpacing]
    };
  }
} as const;
