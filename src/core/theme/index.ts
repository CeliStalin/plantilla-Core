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
    tight: number;
    normal: number;
    relaxed: number;
  };
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
  layout: {
    headerHeight: string;
    sidebarWidth: string;
    boxWidth: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  transitions: {
    default: string;
    fast: string;
    slow: string;
  };
  animations: {
    duration: {
      fast: string;
      normal: string;
      slow: string;
    };
  };
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
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      xxl: '1.5rem',
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.8,
    },
  },
  borderRadius: {
    small: '4px',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '1rem',
    full: '9999px',
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
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  transitions: {
    default: 'all 0.3s ease',
    fast: 'all 0.15s ease',
    slow: 'all 0.5s ease',
  },
  animations: {
    duration: {
      fast: '0.15s',
      normal: '0.3s',
      slow: '0.5s',
    },
  },
};

// Export theme as default
export const theme = defaultTheme;
