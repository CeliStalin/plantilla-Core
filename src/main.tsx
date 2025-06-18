/// <reference types="vite/client" />
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { setCoreEnvConfig } from './core/utils/GetEnvVariables';
import { initializeMsalConfig } from './core/services/auth/authProviderMsal';
import { ensureMsalInitialized } from './core/hooks/useAuth';
import App from './App';
import './core/styles/global.css';

// Inicializa la configuración del core usando variables de entorno de Vite
console.log('Todas las variables de entorno disponibles en main:', import.meta.env);
setCoreEnvConfig({
  VITE_AMBIENTE: import.meta.env.VITE_AMBIENTE,
  VITE_APP_AMBIENTE: import.meta.env.VITE_APP_AMBIENTE,
  VITE_API_ARQUITECTURA_URL: import.meta.env.VITE_API_ARQUITECTURA_URL,
  VITE_APP_API_ARQUITECTURA_URL: import.meta.env.VITE_APP_API_ARQUITECTURA_URL,
  VITE_NAME_API_KEY: import.meta.env.VITE_NAME_API_KEY,
  VITE_APP_NAME_API_KEY: import.meta.env.VITE_APP_NAME_API_KEY,
  VITE_KEY_PASS_API_ARQ: import.meta.env.VITE_KEY_PASS_API_ARQ,
  VITE_APP_KEY_PASS_API_ARQ: import.meta.env.VITE_APP_KEY_PASS_API_ARQ,
  VITE_SISTEMA: import.meta.env.VITE_SISTEMA,
  VITE_APP_SISTEMA: import.meta.env.VITE_APP_SISTEMA,
  VITE_NOMBRE_SISTEMA: import.meta.env.VITE_NOMBRE_SISTEMA,
  VITE_APP_NOMBRE_SISTEMA: import.meta.env.VITE_APP_NOMBRE_SISTEMA,
  VITE_TIMEOUT: import.meta.env.VITE_TIMEOUT,
  VITE_APP_TIMEOUT: import.meta.env.VITE_APP_TIMEOUT,
  VITE_CLIENT_ID: import.meta.env.VITE_CLIENT_ID,
  VITE_APP_CLIENT_ID: import.meta.env.VITE_APP_CLIENT_ID,
  VITE_AUTHORITY: import.meta.env.VITE_AUTHORITY,
  VITE_APP_AUTHORITY: import.meta.env.VITE_APP_AUTHORITY,
});

// Verificación directa de variables de entorno y coreEnvConfig
console.log('Verificación directa en main (import.meta.env):', {
  VITE_APP_CLIENT_ID: import.meta.env.VITE_APP_CLIENT_ID,
  VITE_CLIENT_ID: import.meta.env.VITE_CLIENT_ID,
  VITE_APP_AUTHORITY: import.meta.env.VITE_APP_AUTHORITY,
  VITE_AUTHORITY: import.meta.env.VITE_AUTHORITY,
});

import { setCoreEnvConfig as getCoreEnvConfig } from './core/utils/GetEnvVariables';
// @ts-ignore
console.log('Verificación directa en coreEnvConfig:', window.coreEnvConfig || 'No window.coreEnvConfig');

initializeMsalConfig();
console.log('Variables de entorno en main:', import.meta.env.VITE_AMBIENTE);
console.log('Variables de entorno en main:', import.meta.env.VITE_NAME_API_KEY);

function Root() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    ensureMsalInitialized().then(() => setReady(true));
  }, []);

  if (!ready) return <div>Cargando autenticación...</div>;
  // Los componentes hijos que usen useAuth deben recibir msalReady={ready} si es necesario
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);