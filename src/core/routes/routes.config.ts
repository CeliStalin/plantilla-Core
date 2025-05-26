import React from 'react';
import { lazy } from 'react';
import { RouteConfig } from './types';

// Lazy loading de componentes
const Login = lazy(() => import('../components/Login/Login')); 
const MainPage = lazy(() => import('../components/MainPage')); 
const Dashboard = lazy(() => import('../components/Dashboard/DashboardPage')); 
const NotFound = lazy(() => import('../components/NotFound'));
const Unauthorized = lazy(() => import('../components/Unauthorized'));
const HomePage = lazy(() => import('../components/HomePage/HomePage')); 

// Componente especial para manejar redirección de raíz
const RootRedirect = lazy(() => 
  Promise.resolve({
    default: () => {
      React.useEffect(() => {
        window.location.href = '/home';
      }, []);
      return React.createElement('div', { 
        style: { 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        } 
      }, 'Redirigiendo...');
    }
  })
);

export const routes: RouteConfig[] = [
  // Redirección de raíz
  {
    path: '/',
    component: RootRedirect,
    public: true,
  },
  
  // Rutas públicas
  {
    path: '/login',
    component: Login,
    public: true,
  },
  {
    path: '/404',
    component: NotFound,
    public: true,
  },
  {
    path: '/unauthorized',
    component: Unauthorized,
    public: true,
  },
  
  // Rutas privadas
  {
    path: '/home', 
    component: HomePage,
    roles: ['USER', 'ADMIN', 'Developers'],
  },
  {
    path: '/dashboard',
    component: Dashboard,
    roles: ['ADMIN', 'Developers'],
  },
];