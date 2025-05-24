import { theme } from '@/core/styles/theme';

export const welcomeSectionStyles = {
  container: {
    marginBottom: '40px',
    display: 'flex',
    alignItems: 'center',
    padding: '0', // Eliminar padding para alineación con grids
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
    flexShrink: 0 // Prevenir que se encoja
  },
  
  content: {
    flex: 1
  },
  
  title: {
    color: '#424242',
    marginBottom: '0.5rem',
    fontSize: '2rem',
    fontWeight: 600,
    margin: 0
  },
  
  subtitle: {
    color: '#757575',
    fontSize: '0.95rem',
    lineHeight: '1.4',
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
      marginBottom: '16px'
    }
  },
  
  tablet: {
    container: {
      padding: '0'
    }
  }
};