// Re-export hooks
export { useAuth } from './useAuth';
export { default as useLocalStorage } from './useLocalStorage';
export { useTypography, useTypographyCSS, useTypographyVariables } from './useTypography';

// Re-export context hooks
export { useMenuConfig, useMenuCollapse } from '../context/menu';

// Backwards compatibility exports
export { useAuth as default } from './useAuth';
