import { theme } from '../../styles/theme';

export const heroWrapper = {
  paddingTop: theme.layout.headerHeight,
};

export const loginBox = {
  display: 'flex',
  padding: theme.spacing.lg,
  flexDirection: 'column' as const,
  alignItems: 'flex-start',
  gap: theme.spacing.md,
  borderRadius: theme.borderRadius.small,
  background: theme.colors.white,
  width: theme.layout.boxWidth,
  boxShadow: theme.shadows.card,
};

export const titleStyles = {
  width: '270.5px',
  textAlign: 'center' as const,
  fontSize: '14px', 
  lineHeight: theme.typography.lineHeight.normal,
  margin: '0 auto', 
  padding: '0 20px', 
};

export const primaryButton = {
  display: 'flex',
  padding: '13px 24px',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'stretch',
  borderRadius: theme.borderRadius.full,
  backgroundColor: theme.colors.primary,
  color: theme.colors.white,
  boxShadow: theme.shadows.button,
  border: 'none',
  fontWeight: 'bold' as const,
};

// Nuevos estilos para advertencia de red
export const networkWarning = {
  container: {
    marginTop: '1rem', 
    color: '#721c24',
    padding: '12px 16px',
    border: '1px solid #f5c6cb',
    borderRadius: '6px',
    backgroundColor: '#f8d7da',
    fontSize: '15px',
    textAlign: 'center' as const,
    fontWeight: '500',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },
  title: {
    fontSize: '16px', 
    fontWeight: 'bold', 
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    marginRight: '6px',
    fontSize: '18px'
  },
  message: {
    margin: '0', 
    lineHeight: '1.5'
  },
  note: {
    textAlign: 'center' as const, 
    fontSize: '12px', 
    color: '#666',
    marginTop: '8px'
  }
};

// Estilo para el botón de carga
export const loadingButton = {
  ...primaryButton,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '48px'
};