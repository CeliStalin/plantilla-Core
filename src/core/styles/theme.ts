import { 
  FONT_SIZES, 
  FONT_WEIGHTS, 
  LINE_HEIGHTS, 
  FONT_FAMILIES,
  TYPOGRAPHY_VARIANTS 
} from './typography';
import { defaultTheme } from '../theme';

export const theme = {
    colors: {
      primary: '#04A59B',
      secondary: '#6c757d',
      success: '#28a745',
      danger: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8',
      white: '#FFFFFF',
      black: '#000000',
      gray: {
        light: '#D0D0D0',
        medium: '#808080',
        dark: '#333333',
      },
    },
    textColors: {
      ...defaultTheme.textColors,
      // Agregar todos los colores básicos
      white: '#FFFFFF',
      black: '#000000',
      // Agregar colores del tema principal como textColors
      primary: '#04A59B',
      secondary: '#6c757d',
      success: '#28a745',
      danger: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8',
      // Manejar gray como string simple y con notación de punto
      gray: '#808080',
      'gray.light': '#D0D0D0',
      'gray.medium': '#808080',
      'gray.dark': '#333333',
      // Colores especiales
      inherit: 'inherit',
      current: 'currentColor',
      transparent: 'transparent',
    },
    // Agregar estructura adicional para compatibilidad
    textColorsComplex: {
      gray: {
        light: '#D0D0D0',
        medium: '#808080',
        dark: '#333333',
      },
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
    typography: {
      fontFamily: FONT_FAMILIES,
      fontSize: FONT_SIZES,
      fontWeight: FONT_WEIGHTS,
      lineHeight: LINE_HEIGHTS,
      variants: TYPOGRAPHY_VARIANTS,
    },
    layout: {
      headerHeight: '64px',
      sidebarWidth: '240px',
      containerMaxWidth: '1200px',
      boxWidth: '367px',
    },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
      card: '0 2px 10px rgba(0, 0, 0, 0.1)',
      button: '0px 2px 14px 4px rgba(208, 208, 208, 0.35)',
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '16px',
      full: '9999px',
      small: '15px',
    },
    breakpoints: {
      xs: '0px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      xxl: '1400px',
    },
    transitions: {
      default: 'all 0.2s ease-in-out',
      fast: 'all 0.1s ease-in-out',
      slow: 'all 0.3s ease-in-out',
    },
    animations: {
      spin: 'spin 1s linear infinite',
      spinKeyframes: 'spin',
    },
  };

// Export individual theme pieces for easier access
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

// Export types
export type { Theme, ThemeColors, TextColors } from '../theme';