import { theme } from '@/core/styles/theme';

export const homePageStyles = {
  container: {
    padding: '40px 40px', // Reducir padding lateral
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    width: '100%',
    // Eliminar maxWidth para usar todo el ancho disponible
    // maxWidth: '1400px', // ELIMINAR ESTA LÍNEA
    // margin: '0 auto' // ELIMINAR ESTA LÍNEA
  },
  
  mainContent: {
    display: 'flex',
    gap: '2.5rem', // Ajustar gap entre columnas
    alignItems: 'flex-start',
    marginTop: '2rem',
    width: '100%' // Asegurar ancho completo
  },
  
  leftColumn: {
    flex: '1 1 65%', // Cambiar a flex-grow para mejor distribución
    minWidth: 0,
    maxWidth: '800px' // Limitar ancho máximo de aplicaciones
  },
  
  rightColumn: {
    flex: '1 1 35%', // Cambiar a flex-grow
    minWidth: 0,
    maxWidth: '400px' // Limitar ancho máximo de accesos directos
  }
};

export const responsiveHomePageStyles = {
  mobile: {
    container: {
      padding: '20px',
      backgroundColor: '#ffffff'
    },
    
    mainContent: {
      flexDirection: 'column' as const,
      gap: '2rem',
      marginTop: '1.5rem'
    },
    
    leftColumn: {
      flex: '1 1 100%',
      maxWidth: '100%'
    },
    
    rightColumn: {
      flex: '1 1 100%',
      maxWidth: '100%'
    }
  },
  
  tablet: {
    container: {
      padding: '30px'
    },
    
    mainContent: {
      gap: '2rem'
    }
  }
};