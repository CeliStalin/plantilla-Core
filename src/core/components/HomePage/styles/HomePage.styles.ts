import { theme } from '@/core/styles/theme';

export const homePageStyles = {
  container: {
    padding: '20px 40px', // Reducir padding vertical para optimizar espacio
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%', // Asegurar altura completa
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: 0, // Importante para flexbox
  },
  
  mainContent: {
    display: 'flex',
    gap: '2rem', // Reducir gap para optimizar espacio
    alignItems: 'flex-start',
    marginTop: '1.5rem', // Reducir margen superior
    width: '100%', // Asegurar ancho completo
    flex: 1, // Hacer que ocupe el espacio disponible
    minHeight: 0, // Importante para flexbox
  },
  
  leftColumn: {
    flex: '1 1 65%', 
    minWidth: 0,
    maxWidth: '800px', // Limitar ancho máximo de aplicaciones
    minHeight: 0, // Importante para flexbox
  },
  
  rightColumn: {
    flex: '1 1 35%',
    minWidth: 0,
    maxWidth: '400px', // Limitar ancho máximo de accesos directos
    minHeight: 0, // Importante para flexbox
  }
};

export const responsiveHomePageStyles = {
  mobile: {
    container: {
      padding: '15px 20px', // Reducir padding en móvil
      backgroundColor: '#ffffff',
      height: '100%',
      display: 'flex',
      flexDirection: 'column' as const,
      minHeight: 0,
    },
    
    mainContent: {
      flexDirection: 'column' as const,
      gap: '1.5rem', // Reducir gap en móvil
      marginTop: '1rem', // Reducir margen en móvil
      flex: 1,
      minHeight: 0,
    },
    
    leftColumn: {
      flex: '1 1 100%',
      maxWidth: '100%',
      minHeight: 0,
    },
    
    rightColumn: {
      flex: '1 1 100%',
      maxWidth: '100%',
      minHeight: 0,
    }
  },
  
  tablet: {
    container: {
      padding: '20px 30px', // Reducir padding en tablet
      height: '100%',
      display: 'flex',
      flexDirection: 'column' as const,
      minHeight: 0,
    },
    
    mainContent: {
      gap: '1.5rem', // Reducir gap en tablet
      flex: 1,
      minHeight: 0,
    }
  }
};