import { theme } from '../../../styles/theme';

export const footerStyles = {
  container: {
    width: '100%',
    backgroundColor: theme.colors.white,
    borderTop: `1px solid ${theme.colors.gray.light}`,
    marginTop: 'auto', // Empuja el footer hacia abajo
    position: 'relative' as const,
    overflow: 'hidden',
    boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.05)',
  },
  
  image: {
    width: '100%',
    height: 'auto',
    display: 'block',
    maxHeight: '200px', // Limitar altura máxima
    objectFit: 'contain' as const,
  }
};

// Estilos responsivos
export const responsiveFooterStyles = `
  @media (max-width: 768px) {
    .app-footer.hide-on-mobile {
      display: none;
    }
    
    .app-footer img {
      max-height: 150px;
    }
  }
  
  @media (max-width: 480px) {
    .app-footer img {
      max-height: 100px;
    }
  }
`;