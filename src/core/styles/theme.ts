import {
  FONT_SIZES,
  FONT_WEIGHTS,
  LINE_HEIGHTS,
  FONT_FAMILIES,
  TYPOGRAPHY_VARIANTS
} from './typography';
// Importar defaultTheme desde el archivo theme/index.ts que ahora es la fuente de verdad
import { defaultTheme as baseTheme, Theme } from '../theme';

// Construir el objeto theme final, extendiendo o sobrescribiendo baseTheme
export const theme: Theme = {
  ...baseTheme, // Comenzar con la base de defaultTheme
  colors: {
    ...baseTheme.colors,
    primary: '#04A59B', // Valor específico de styles/theme.ts
    gray: { // Asegurar consistencia o sobrescribir si es necesario
      light: '#D0D0D0', // Valor de styles/theme.ts
      medium: '#808080', // Valor de styles/theme.ts
      dark: '#333333',   // Valor de styles/theme.ts
    },
  },
  textColors: {
    ...baseTheme.textColors, // Mantener la base
    // Sobrescribir o añadir valores específicos de styles/theme.ts si es necesario
    primary: '#04A59B', // Ejemplo de sobrescritura
    white: '#FFFFFF',
    black: '#000000',
    gray: '#808080',
    'gray.light': '#D0D0D0',
    'gray.medium': '#808080',
    'gray.dark': '#333333',
    danger: '#dc3545', // Asegurar que todos los colores usados estén aquí
    warning: '#ffc107',
    info: '#17a2b8',
    // ...otros textColors que estaban definidos en el theme original de styles/theme.ts
  },
  // textColorsComplex: { /* ... si esta estructura es necesaria ... */ },
  spacing: {
    ...baseTheme.spacing,
    xs: '4px', // Valor de styles/theme.ts
    sm: '8px', // Valor de styles/theme.ts
    md: '16px',// Valor de styles/theme.ts
    lg: '24px',// Valor de styles/theme.ts
    xl: '32px',// Valor de styles/theme.ts
  },
  typography: { // Combinar inteligentemente
    ...baseTheme.typography, // Empezar con la base
    fontFamily: FONT_FAMILIES.primary, // Usar FONT_FAMILIES de ./typography
    fontSize: FONT_SIZES,     // Usar FONT_SIZES de ./typography
    fontWeight: FONT_WEIGHTS, // Usar FONT_WEIGHTS de ./typography
    lineHeight: LINE_HEIGHTS, // Usar LINE_HEIGHTS de ./typography
    fontFamilies: FONT_FAMILIES, // Sobrescribir con FONT_FAMILIES de ./typography
    variants: TYPOGRAPHY_VARIANTS, // Usar TYPOGRAPHY_VARIANTS de ./typography
  },
  layout: {
    ...baseTheme.layout,
    headerHeight: '64px',
    sidebarWidth: '240px',
    containerMaxWidth: '1200px',
    boxWidth: '367px',
  },
  shadows: {
    ...baseTheme.shadows,
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    card: '0 2px 10px rgba(0, 0, 0, 0.1)',
    button: '0px 2px 14px 4px rgba(208, 208, 208, 0.35)',
  },
  borderRadius: {
    ...baseTheme.borderRadius,
    sm: '4px',
    md: '8px',
    lg: '16px',
    small: '15px', // Este parece un valor inusual, verificar si es correcto o un typo
    // full: '9999px' // Ya debería estar en baseTheme
  },
  breakpoints: {
    ...baseTheme.breakpoints,
    xs: '0px',
    xxl: '1400px',
  },
  transitions: {
    ...baseTheme.transitions,
    default: 'all 0.2s ease-in-out',
    fast: 'all 0.1s ease-in-out',
    slow: 'all 0.3s ease-in-out',
  },
  animations: {
    ...baseTheme.animations,
    spin: 'spin 1s linear infinite',
    spinKeyframes: 'spin', // Asumiendo que 'spin' es el nombre de los keyframes
  },
};

// Exportar las piezas individuales del theme finalizado
export const colors = theme.colors;
export const textColors = theme.textColors;
export const spacing = theme.spacing;
export const typography = theme.typography;
export const borderRadius = theme.borderRadius;
export const shadows = theme.shadows;
export const layout = theme.layout;
export const breakpoints = theme.breakpoints;
export const transitions = theme.transitions;
export const animations = theme.animations;