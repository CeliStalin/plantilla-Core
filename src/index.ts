// Core exports principales
export { 
  // Theme
  theme,
  defaultTheme
} from './core/theme';

// Component exports - Solo los más importantes
export { 
  Layout,
  SecureLayout,
  ProtectedRoute,
  NotFound,
  Unauthorized,
  HomePage,
  Dashboard,
  Button,
  Card,
  Typography,
  Footer,
  Login
} from './core/components';

// Export interfaces from interfaces module
export * from './core/interfaces';

// Export theme types from theme module
export type { 
  Theme, 
  ThemeColors, 
  TextColors 
} from './core/theme';

// Export typography types from typography components
export type { 
  TypographyProps, 
  TypographyVariant, 
  TypographyColor 
} from './core/components/Typography';

// Context exports
export { 
  AuthProvider,
  MenuConfigProvider,
  useAuthContext,
  useMenuConfig
} from './core/context';

// Hooks exports
export { 
  useAuth,
  useLocalStorage
} from './core/hooks';

// Services exports - Solo los esenciales
export { 
  getMe,
  getUsuarioAD,
  getRoles,
  apiClient,
  ApiGetMenus
} from './core/services';

// Utils exports - Solo los más utilizados
export {
  GetApiArquitectura,
  GetSistema
} from './core/utils';