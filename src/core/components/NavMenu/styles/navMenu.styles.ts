import { theme } from '../../../styles/theme';

// Estilos de animación como objetos para mejor portabilidad
export const menuAnimations = {
  rotateCW: {
    animationName: 'rotateCW',
    animationDuration: 'var(--menu-rotation-duration, 0.7s)',
    animationTimingFunction: 'var(--menu-rotation-easing, cubic-bezier(0.25, 0.1, 0.25, 1))',
    transformOrigin: 'center',
    perspective: '1000px',
    backfaceVisibility: 'hidden' as const,
    WebkitFontSmoothing: 'subpixel-antialiased' as const,
  },
  rotateCCW: {
    animationName: 'rotateCCW',
    animationDuration: 'var(--menu-rotation-duration, 0.7s)',
    animationTimingFunction: 'var(--menu-rotation-easing, cubic-bezier(0.25, 0.1, 0.25, 1))',
    transformOrigin: 'center',
    perspective: '1000px',
    backfaceVisibility: 'hidden' as const,
    WebkitFontSmoothing: 'subpixel-antialiased' as const,
  }
};

// Keyframes como strings para inyección dinámica
export const keyframes = `
@keyframes rotateCW {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes rotateCCW {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}
`;

export const navMenuStyles = {
  container: (isCollapsed: boolean) => ({
    width: isCollapsed ? '50px' : '220px',
    position: 'fixed' as const,
    left: 0,
    top: '4rem', 
    height: 'calc(100vh - 4rem)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    backgroundColor: '#FFF', 
    zIndex: 100,
    padding: 0, 
    boxShadow: isCollapsed ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.07)',
    border: 'none !important',
    outline: 'none !important',
  }),
  
  menuLabel: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.75rem',
    margin: 0,
    color: '#555',
    fontWeight: theme.typography.fontWeight.medium,
    fontFamily: theme.typography.fontFamily,
    backgroundColor: 'transparent', 
    borderRadius: '4px',
    transition: 'background-color 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    }
  },
  
  menuIcon: (isCollapsed: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    width: '24px',
    height: '24px',
    transition: 'all 0.3s ease',
    color: theme.colors.primary,
    opacity: isCollapsed ? 0.8 : 1,
    transform: isCollapsed ? 'scale(1)' : 'scale(1.1)',
  }),
  
  // Nuevos estilos para el botón hamburguesa
  menuToggleButton: {
    cursor: 'pointer',
    backgroundColor: '#FFF', // Solo una declaración de backgroundColor
    border: 'none',
    borderRadius: 0,
    padding: 'var(--menu-button-padding, 12px 15px)',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.2s ease',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box' as const,
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
    '&:focus': {
      outline: 'none !important',
      border: 'none !important',
      boxShadow: 'none !important',
    },
    '&:active': {
      outline: 'none !important',
      border: 'none !important',
      boxShadow: 'none !important',
    },
    '&:focusVisible': { // Changed from &:focus-visible
      outline: 'none !important',
      border: 'none !important',
      boxShadow: 'none !important',
      backgroundColor: '#f0f0f0', // Consistent with hover and index.css for focus-visible
    },
    '&:focusWithin': { // Changed from &:focus-within
      outline: 'none !important',
      border: 'none !important',
      boxShadow: 'none !important',
    },
    '&.expanded': {
      backgroundColor: '#FFF',
      color: theme.colors.primary,
    }
  },

  menuHamburger: {
    position: 'relative' as const,
    width: 'var(--menu-icon-size, 36px)',
    height: 'var(--menu-icon-size, 36px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuHamburgerSvg: {
    transition: 'transform 0.3s ease, opacity 0.2s ease',
    color: theme.colors.primary,
    width: 'var(--menu-svg-size, 28px)',
    height: 'var(--menu-svg-size, 28px)',
    transformOrigin: 'center center',
    willChange: 'transform',
    '&:hover': {
      transform: 'scale(1.1)',
    },
    '&:active': {
      transform: 'scale(0.95)',
    }
  },

  menuText: {
    marginLeft: 'var(--menu-text-spacing, 12px)',
    color: '#555',
    fontSize: 'var(--menu-text-size, 18px)',
    fontWeight: theme.typography.fontWeight.medium,
    fontFamily: theme.typography.fontFamily,
    letterSpacing: 'var(--menu-letter-spacing, 0.5px)',
  },
  
  menuContent: (isCollapsed: boolean) => ({
    opacity: isCollapsed ? 0 : 1,
    visibility: isCollapsed ? 'hidden' as const : 'visible' as const,
    transition: 'opacity 0.3s ease, visibility 0.3s ease',
    paddingTop: isCollapsed ? '0' : '0.5rem',
    paddingRight: isCollapsed ? '0' : '1rem',
    paddingBottom: isCollapsed ? '0' : '1rem',
    paddingLeft: isCollapsed ? '0' : '1rem',
    height: isCollapsed ? '0' : 'auto',
    overflow: 'hidden',
  }),
  
  // Estilo para elementos activos del menú
  activeLink: {
    backgroundColor: theme.colors.primary + '10', // Color primario con 10% de opacidad
    color: theme.colors.primary,
    fontWeight: 500,
    borderLeft: `3px solid ${theme.colors.primary}`,
    transition: 'all 0.2s ease-in-out',
    borderRadius: '4px',
  },
  
  // Estilo normal para elementos de menú 
  normalLink: {
    color: '#444',
    transition: 'all 0.2s ease-in-out',
    borderLeft: '3px solid transparent',
    backgroundColor: 'transparent', 
    borderRadius: '4px',
  },
  
  sectionTitle: {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.75em 0.5em',
    userSelect: 'none' as const,
    color: '#666',
    fontSize: '13px',
    letterSpacing: '0.5px',
    textTransform: 'uppercase' as const,
    fontWeight: theme.typography.fontWeight.semibold,
    fontFamily: theme.typography.fontFamily,
    borderRadius: '4px',
    marginBottom: '0.5rem',
    backgroundColor: 'transparent',
    transition: 'background-color 0.2s ease',
    '&:hover': {backgroundColor: 'rgba(0, 0, 0, 0.05)'},
    '& img': {marginRight: '6px',  }
  },
  
  sectionArrow: (isExpanded: boolean) => ({
    fontSize: '10px',
    transition: 'all 0.3s ease',
    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
    color: theme.colors.primary,
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: isExpanded ? 'rgba(4, 165, 155, 0.1)' : 'transparent',
  }),


  sectionContent: (isExpanded: boolean) => ({
    overflow: 'hidden',
    transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out',
    maxHeight: isExpanded ? '500px' : '0',
    opacity: isExpanded ? 1 : 0,
  }),

  // Estilos adicionales para los enlaces del menú
  menuItem: {
    display: 'block',
    padding: '10px 12px',
    borderRadius: '4px',
    margin: '2px 0',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: theme.typography.fontWeight.normal,
    fontFamily: theme.typography.fontFamily,
    transition: 'all 0.2s ease',
  },
  
  // Estilos para el estado hover
  menuItemHover: {
    backgroundColor: '#f0f0f0', // Gris claro para hover
    color: theme.colors.primary,
  }
};