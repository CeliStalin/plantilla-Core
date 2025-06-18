/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AMBIENTE: string;
  readonly VITE_SISTEMA: string;
  readonly VITE_NOMBRE_SISTEMA: string;
  readonly VITE_API_EXPLOTACION_URL: string;
  readonly VITE_API_ARQUITECTURA_URL: string;
  readonly VITE_TIMEOUT: string;
  readonly VITE_NAME_API_KEY: string;
  readonly VITE_KEY_PASS_API_ARQ: string;
  // Variables alternativas y legacy (compatibilidad)
  readonly VITE_APP_API_ARQUITECTURA_URL: string;
  readonly VITE_APP_TIMEOUT: string;
  readonly VITE_APP_NAME_API_KEY: string;
  readonly VITE_APP_KEY_PASS_API_ARQ: string;
  readonly VITE_APP_CLIENT_ID: string;
  readonly VITE_APP_AUTHORITY: string;
  readonly VITE_CLIENT_ID: string;
  readonly VITE_AUTHORITY: string;
  readonly VITE_REDIRECT_URI: string;
  readonly VITE_APP_SISTEMA: string;
  readonly VITE_APP_NOMBRE_SISTEMA: string;
  // Vite built-in
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  // Agrega aquí cualquier otra variable que uses en el core
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

declare module '*.bmp' {
  const value: string;
  export default value;
}

declare module '*.tiff' {
  const value: string;
  export default value;
}

// Typography font declarations
declare module '*.woff' {
  const value: string;
  export default value;
}

declare module '*.woff2' {
  const value: string;
  export default value;
}

declare module '*.ttf' {
  const value: string;
  export default value;
}

declare module '*.eot' {
  const value: string;
  export default value;
}