import { Sistema } from '../interfaces/ISistema';
import { FetchTimeoutOptions } from '../interfaces/IFectTimeOutOptions'

interface CoreEnvConfig {
  VITE_AMBIENTE?: string;
  VITE_APP_AMBIENTE?: string;
  VITE_API_ARQUITECTURA_URL?: string;
  VITE_APP_API_ARQUITECTURA_URL?: string;
  VITE_NAME_API_KEY?: string;
  VITE_APP_NAME_API_KEY?: string;
  VITE_KEY_PASS_API_ARQ?: string;
  VITE_APP_KEY_PASS_API_ARQ?: string;
  VITE_SISTEMA?: string;
  VITE_APP_SISTEMA?: string;
  VITE_NOMBRE_SISTEMA?: string;
  VITE_APP_NOMBRE_SISTEMA?: string;
  VITE_TIMEOUT?: string;
  VITE_APP_TIMEOUT?: string;
  VITE_CLIENT_ID?: string;
  VITE_APP_CLIENT_ID?: string;
  VITE_AUTHORITY?: string;
  VITE_APP_AUTHORITY?: string;
}

let coreEnvConfig: CoreEnvConfig = {};

function setCoreEnvConfig(config: CoreEnvConfig) {
  coreEnvConfig = config;
}

const getEnv = (key: keyof CoreEnvConfig): string | undefined => {
  return coreEnvConfig[key];
};

const GetAmbiente = (): string => {
  return getEnv('VITE_AMBIENTE') || getEnv('VITE_APP_AMBIENTE') || '';
};

const GetApiArquitectura = (): string => {
  return getEnv('VITE_API_ARQUITECTURA_URL') || getEnv('VITE_APP_API_ARQUITECTURA_URL') || '';
};

const GetNameApiKey = (): string => {
  return getEnv('VITE_NAME_API_KEY') || getEnv('VITE_APP_NAME_API_KEY') || '';
};

const GetKeyApiKey = (): string => {
  return getEnv('VITE_KEY_PASS_API_ARQ') || getEnv('VITE_APP_KEY_PASS_API_ARQ') || '';
};

const GetSistema = (): Sistema => {
  return {
    codigo: getEnv('VITE_SISTEMA') || getEnv('VITE_APP_SISTEMA') || '',
    nombre: getEnv('VITE_NOMBRE_SISTEMA') || getEnv('VITE_APP_NOMBRE_SISTEMA') || '',
  };
};

const FetchWithTimeout = async (resource: RequestInfo | URL, options: FetchTimeoutOptions = {}): Promise<Response> => {
  const defaultTimeout = Number(getEnv('VITE_TIMEOUT') || getEnv('VITE_APP_TIMEOUT')) || 10000;
  const { timeout = defaultTimeout, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(resource, {
      ...fetchOptions,
      signal: controller.signal,
    });
    return response;
  } catch (error) {
    const errorMessage = (error as Error).name === 'AbortError'
      ? new Error(`La petición ha excedido el tiempo límite de ${timeout}ms`)
      : error;
    throw errorMessage;
  } finally {
    clearTimeout(timeoutId);
  }
};

const GetTimeout = (): FetchTimeoutOptions => {
  const timeout = parseInt(getEnv('VITE_TIMEOUT') || getEnv('VITE_APP_TIMEOUT') || '10000');
  return { timeout };
};

const GetMsalAuthority = (): string => {
  const value = coreEnvConfig['VITE_APP_AUTHORITY'] || coreEnvConfig['VITE_AUTHORITY'] || '';
  return value;
};

const GetMsalClientId = (): string => {
  const value = coreEnvConfig['VITE_APP_CLIENT_ID'] || coreEnvConfig['VITE_CLIENT_ID'] || '';
  return value;
};

export {
  GetAmbiente,
  GetApiArquitectura,
  GetNameApiKey,
  GetKeyApiKey,
  GetSistema,
  FetchWithTimeout,
  GetTimeout,
  setCoreEnvConfig,
  GetMsalAuthority,
  GetMsalClientId
};
export type { CoreEnvConfig };

// Re-exportar utilidades de roles
export { 
  getPrimaryRole, 
  hasRole, 
  hasAnyRole, 
  getRoleNames, 
  hasValidRole 
} from './roleUtils';