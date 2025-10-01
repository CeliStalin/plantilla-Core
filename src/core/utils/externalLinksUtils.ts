import { GetAmbiente } from './GetEnvVariables';

/**
 * Obtiene la URL de Mi Intranet basada en el ambiente.
 * Mi Intranet siempre apunta a la misma URL sin importar el ambiente.
 * @returns URL de Mi Intranet
 */
export const getMiIntranetUrl = (): string => {
  return 'https://intranet.consalud.cl';
};

/**
 * Obtiene la URL de Portal Consalud basada en el ambiente.
 * La URL varía según el ambiente configurado.
 * @returns URL de Portal Consalud según el ambiente
 */
export const getPortalConsaludUrl = (): string => {
  const ambiente = GetAmbiente().toLowerCase();
  
  // Mapeo de ambientes a URLs
  const urlMap: Record<string, string> = {
    'desarrollo': 'http://betaportal.consalud.des/login.aspx',
    'development': 'http://betaportal.consalud.des/login.aspx',
    'testing': 'http://betaportal.consalud.tes/login.aspx',
    'test': 'http://betaportal.consalud.tes/login.aspx',
    'produccion': 'http://betaportal.consalud.net/login.aspx',
    'production': 'http://betaportal.consalud.net/login.aspx',
  };
  
  // Retornar la URL correspondiente al ambiente, o la de desarrollo por defecto
  return urlMap[ambiente] || urlMap['desarrollo'];
};

/**
 * Obtiene todas las URLs de accesos directos basadas en el ambiente actual.
 * @returns Objeto con las URLs de todos los accesos directos
 */
export const getExternalLinksUrls = () => {
  return {
    miIntranet: getMiIntranetUrl(),
    portalConsalud: getPortalConsaludUrl(),
  };
};
