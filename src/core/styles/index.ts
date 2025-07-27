// Import all CSS files to ensure they are included in the build
import './animations.css';
import './global.css';
import './external-apps.css';
import '../components/HomePage/styles/animations.css';
import '../components/HomePage/components/ApplicationsGrid/ApplicationsGrid.css';
import '../components/HomePage/components/DirectAccessGrid/DirectAccessGrid.css';

// Export theme
export * from './theme';

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
