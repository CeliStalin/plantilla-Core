export * from './theme';
export * from './typography';
export { TypographyUtils } from './typography';

// Re-export individual typography utilities for direct access
export {
  FONT_FACES,
  FONT_SIZES,
  FONT_WEIGHTS,
  LINE_HEIGHTS,
  LETTER_SPACING,
  FONT_FAMILIES,
  TYPOGRAPHY_VARIANTS,
  generateFontFaceCSS,
  generateTypographyVariables
} from './typography';

// Re-export theme for convenience
export { theme } from './theme';

// Re-export types for better TypeScript support
export type {
  FontFace,
  TypographyScale,
  FontWeights,
  LineHeights,
  LetterSpacing
} from './typography';

export type {
  Theme,
  ThemeColors,
  TextColors
} from '../theme'; // Cambiado de './theme' a '../theme'
