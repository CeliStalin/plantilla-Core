import { theme } from '@/core/styles/theme';

export const welcomeSectionStyles = {
  container: {
    marginBottom: '40px',
    display: 'flex',
    alignItems: 'center',
    padding: '0', // padding para alineación con grids
  },
  
  iconContainer: {
    backgroundColor: '#00CBBF', // Usar el mismo color del IconLog en lugar del verde del tema
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
    // Sin sombra para eliminar el borde verde
    boxShadow: 'none',
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
      // Sin sombra para eliminar el borde verde
      boxShadow: 'none',
    }
  },
  
  tablet: {
    container: {
      padding: '0'
    },
    
    iconContainer: {
      // Sin sombra para eliminar el borde verde
      boxShadow: 'none',
    }
  }
};