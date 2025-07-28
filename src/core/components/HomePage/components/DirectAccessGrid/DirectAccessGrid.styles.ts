import { theme } from '@/core/styles/theme';

export const directAccessGridStyles = {
  container: {
    marginBottom: '2rem'
  },
    sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px'
  },
  
  sectionTitle: {
    color: '#424242',
    marginLeft: '8px',
    fontSize: '1.25rem',
    fontWeight: 500,
    margin: 0
  },
    divider: {
    width: '100%',
    height: '2px',
    backgroundColor: '#D1D5DB',
    marginTop: '8px',
    marginBottom: '24px',
    borderRadius: '1px',
    opacity: 0.8
  },
    grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px'
  },
  card: {
    border: '1px solid #B1EAEA',
    borderRadius: '8px',
    padding: '20px 30px',
    cursor: 'pointer',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.2s ease',
    minHeight: '80px', // Altura mínima estandarizada para todas las cards
    height: 'auto', // Cambiar de altura fija a auto para permitir que el contenido se expanda
    textDecoration: 'none',
    color: 'inherit',
    overflow: 'visible' // Cambiar de hidden a visible para permitir que los SVG se muestren completamente
  },
  cardImage: {
    maxHeight: '60px',
    maxWidth: '200px',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain' as const
  }
};