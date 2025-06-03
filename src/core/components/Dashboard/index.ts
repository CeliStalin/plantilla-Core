// Archivo auxiliar para manejar exportaciones condicionales de Dashboard

// Intentar exportar desde Dashboard específico
export { default as Dashboard } from './DashboardPage';

// Si no existe, crear un componente fallback
export const DashboardFallback = () => {
  console.warn('Dashboard component not found, using fallback');
  return null;
};
