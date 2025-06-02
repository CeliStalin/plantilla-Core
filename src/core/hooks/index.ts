// Hooks principales
export { useAuth, default as useAuthDefault } from './useAuth';
export { default as useLocalStorage } from './useLocalStorage';

// Typography hooks
export {
  useTypography,
  useTypographyCSS,
  useTypographyVariables
} from './useTypography';

// Re-exportar useAuth como default para compatibilidad
export { useAuth as default } from './useAuth';
