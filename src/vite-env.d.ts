/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_AMBIENTE: string
    readonly VITE_SISTEMA: string
    readonly VITE_NOMBRE_SISTEMA: string
    readonly VITE_API_EXPLOTACION_URL: string
    readonly VITE_API_ARQUITECTURA_URL: string
    readonly VITE_TIMEOUT: string
    readonly VITE_NAME_API_KEY: string
    readonly VITE_KEY_PASS_API_ARQ: string
    // Otras variables que puedas necesitar
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
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
