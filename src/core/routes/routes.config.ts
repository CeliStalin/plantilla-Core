import { lazy } from 'react';
import { RouteConfig } from './types';

// Lazy loading de componentes

const Login = lazy(() => import('../components/Login/Login')); 
const MainPage = lazy(() => import('../components/MainPage')); 
const Dashboard = lazy(() => import('../components/Dashboard/DashboardPage')); 
const NotFound = lazy(() => import('../components/NotFound'));
const Unauthorized = lazy(() => import('../components/Unauthorized'));
const HomePage = lazy(() => import('../components/HomePage/HomePage')); 

export const routes: RouteConfig[] = [
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
    path: '/',
    component: MainPage,
    roles: ['USER', 'ADMIN', 'Developers'],
  },
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