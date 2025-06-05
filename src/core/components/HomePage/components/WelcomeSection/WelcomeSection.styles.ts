import { theme } from '@/core/styles/theme';

export const welcomeSectionStyles = {
  container: {
    marginBottom: '40px',
    display: 'flex',
    alignItems: 'center',
    padding: '0', // padding para alineación con grids
  },
  
  iconContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: '50%',
    width: '80px',
    height: '80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '20px',
    flexShrink: 0, // Prevenir que se encoja
    cursor: 'pointer',
    position: 'relative' as const,
    overflow: 'hidden',
    willChange: 'transform, box-shadow',
    // Sombra base 
    boxShadow: '0 4px 8px rgba(4, 165, 155, 0.15), 0 2px 4px rgba(4, 165, 155, 0.1)',
    // Transición suave para interacciones
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    // Asegurar que el avatar esté sobre otros elementos
    zIndex: 1,
  },
  
  content: {
    flex: 1
  },
  
  title: {
    color: '#424242',
    marginBottom: '0.5rem',
    fontSize: '2rem',
    fontWeight: theme.typography.fontWeight.semibold,
    fontFamily: theme.typography.fontFamily, // Cambiado
    margin: 0
  },
  
  subtitle: {
    color: '#757575',
    fontSize: '0.95rem',
    lineHeight: '1.4',
    fontFamily: theme.typography.fontFamily, // Cambiado
    fontWeight: theme.typography.fontWeight.normal,
    margin: 0
  }
};

export const responsiveWelcomeStyles = {
  mobile: {
    container: {
      flexDirection: 'column' as const,
      textAlign: 'center' as const,
      padding: '0'
    },
    
    iconContainer: {
      marginRight: 0,
      marginBottom: '16px',
      // Reducir intensidad en móviles para mejor rendimiento
      boxShadow: '0 2px 4px rgba(4, 165, 155, 0.1)',
    }
  },
  
  tablet: {
    container: {
      padding: '0'
    },
    
    iconContainer: {
      // Efecto intermedio en tablets
      boxShadow: '0 3px 6px rgba(4, 165, 155, 0.12)',
    }
  }
};