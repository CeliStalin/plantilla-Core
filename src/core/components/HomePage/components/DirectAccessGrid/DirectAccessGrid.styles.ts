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
    border: '1px solid #E0E0E0',
    borderRadius: '8px',
    padding: '24px',
    cursor: 'pointer',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.2s ease',
    minHeight: '100px',
    textDecoration: 'none',
    color: 'inherit',
    overflow: 'hidden'
  },
  
  cardImage: {
    maxHeight: '60px',
    maxWidth: '180px',
    width: 'auto',
    height: 'auto',
    objectFit: 'contain' as const
  }
};