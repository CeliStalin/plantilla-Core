// Core Hooks
export { default as useAuth } from './useAuth';
export { default as useLocalStorage } from './useLocalStorage';
export { default as useMenuConfig } from './useMenuConfig';

// Typography Hooks
export {
  useTypography,
  useTypographyCSS,
  useTypographyVariables,
  type UseTypographyProps
} from './useTypography';

// Re-export types
export type { MenuConfigContextType } from '../context/MenuConfigContext';

// Backwards compatibility exports
export { useAuth as default } from './useAuth';
