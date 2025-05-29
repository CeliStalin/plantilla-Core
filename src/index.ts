// Core exports
export * from './core';

// Main exports - explicit exports for better tree-shaking
export { 
  // Components
  Layout,
  SecureLayout,
  ProtectedRoute,
  NotFound,
  Unauthorized,
  HomePage,
  Dashboard,
  Login,
  Button,
  Card,
  Typography,
  Footer,
  LazyComponents
} from './core/components';

export { 
  // Context
  AuthProvider,
  MenuConfigProvider,
  useAuthContext,
  useMenuConfig
} from './core/context';

export { 
  // Hooks
  useAuth,
  useLocalStorage
} from './core/hooks';

export { 
  // Services
  AuthService,
  getMe,
  getUsuarioAD,
  getRoles,
  apiClient,
  ApiGetMenus
} from './core/services';

export { 
  // Styles and Theme
  theme,
  TypographyUtils
} from './core/styles';

export { 
  // Interfaces
  IUser,
  IAuthConfig as IAuth, // Usar IAuthConfig en lugar de IAuth
  IRol,
  IUsuarioAD,
  IUserExterno
} from './core/interfaces';

export { 
  // Routes
  RouteConfig
} from './core/routes';

// Assets
export * from './assets';