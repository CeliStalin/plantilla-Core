export { default, Typography } from './Typography';
export type { TypographyProps, TypographyVariant, TypographyColor, TypographyWeight, TypographyAlign } from './Typography';

// Typography styles exports
export * from '../../styles/typography';

// Legacy compatibility - definir aquí para evitar importaciones circulares
export type LegacyTypographyVariant = 'body' | 'title' | 'subtitle' | 'text';

// Importar TypographyVariant desde Typography.tsx y combinarlo
import type { TypographyVariant } from './Typography';
export type ExtendedTypographyVariant = TypographyVariant | LegacyTypographyVariant;

// Export para facilitar el uso
export type TypographyComponent = React.ElementType | string;
