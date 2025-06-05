export interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  danger: string;
  warning: string;
  info: string;
  white: string;
  black: string;
  gray: {
    light: string;
    medium: string;
    dark: string;
  };
}

export interface TextColors {
  primary: string;
  secondary: string;
  muted: string;
  inverse: string;
  success: string;
  danger: string;
  warning: string;
  info: string;
  white: string;
  black: string;
  gray: string;
  'gray.light': string;
  'gray.medium': string;
  'gray.dark': string;
  inherit: string;
  current: string;
  transparent: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface ThemeTypography {
  fontFamily: string;
  fontSize: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    none: number; // o string
    tight: number; // o string
    snug: number; // o string
    normal: number; // o string
    relaxed: number; // o string
    loose: number; // o string
  };
  letterSpacing: {
    tighter: string;
    tight: string;
    normal: string;
    wide: string;
    wider: string;
    widest: string;
  };
  fontFamilies: {
    primary: string;
    fallback: string;
    mono: string;
  };
  variants?: Record<string, React.CSSProperties>;
}

export interface ThemeLayout {
  headerHeight: string;
  sidebarWidth: string;
  boxWidth: string;
  containerMaxWidth?: string;
}

export interface ThemeBreakpoints {
  xs?: string; // Añadido para consistencia si se usa
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl?: string; // Añadido para consistencia si se usa
}

export interface ThemeTransitions {
  default: string;
  fast: string;
  slow: string;
}

export interface ThemeAnimations {
  duration: {
    fast: string;
    normal: string;
    slow: string;
  };
  spin?: string;
  spinKeyframes?: string;
}

export interface Theme {
  colors: ThemeColors;
  textColors: TextColors;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
  borderRadius: {
    small: string;
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    card: string;
    button: string;
  };
  layout: ThemeLayout;
  breakpoints: ThemeBreakpoints;
  transitions: ThemeTransitions;
  animations: ThemeAnimations;
}

export const defaultTheme: Theme = {
  colors: {
    primary: '#04A59B',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    white: '#ffffff',
    black: '#000000',
    gray: {
      light: '#f8f9fa',
      medium: '#6c757d',
      dark: '#343a40',
    },
  },
  textColors: {
    primary: '#212529',
    secondary: '#6c757d',
    muted: '#868e96',
    inverse: '#ffffff',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    white: '#ffffff',
    black: '#000000',
    gray: '#6c757d',
    'gray.light': '#f8f9fa',
    'gray.medium': '#6c757d',
    'gray.dark': '#343a40',
    inherit: 'inherit',
    current: 'currentColor',
    transparent: 'transparent',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '3rem',
  },
  typography: {
    fontFamily: "'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontSize: {
      xs: '0.75rem', sm: '0.875rem', md: '1rem', lg: '1.125rem', xl: '1.25rem', xxl: '1.5rem',
    },
    fontWeight: {
      light: 300, normal: 400, medium: 500, semibold: 600, bold: 700,
    },
    lineHeight: {
      none: 1, tight: 1.25, snug: 1.375, normal: 1.5, relaxed: 1.625, loose: 2,
    },
    letterSpacing: {
      tighter: '-0.05em', tight: '-0.025em', normal: '0', wide: '0.025em', wider: '0.05em', widest: '0.1em',
    },
    fontFamilies: {
      primary: "'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      fallback: "'Helvetica Neue', Arial, sans-serif",
      mono: "'Courier New', Courier, monospace",
    },
  },
  borderRadius: {
    small: '4px', sm: '0.25rem', md: '0.5rem', lg: '1rem', full: '9999px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 25px rgba(0, 0, 0, 0.1)',
    card: '0 2px 8px rgba(0, 0, 0, 0.1)',
    button: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  layout: {
    headerHeight: '4rem',
    sidebarWidth: '250px',
    boxWidth: '350px',
    containerMaxWidth: '1200px',
  },
  breakpoints: {
    sm: '576px', md: '768px', lg: '992px', xl: '1200px',
  },
  transitions: {
    default: 'all 0.3s ease', fast: 'all 0.15s ease', slow: 'all 0.5s ease',
  },
  animations: {
    duration: { fast: '0.15s', normal: '0.3s', slow: '0.5s' },
  },
};

export const theme = defaultTheme; 
