import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { getMiIntranetUrl, getPortalConsaludUrl, getExternalLinksUrls } from '../externalLinksUtils';
import { setCoreEnvConfig } from '../GetEnvVariables';

describe('externalLinksUtils', () => {
  // Guardar la configuración original
  const originalConfig = {
    VITE_AMBIENTE: '',
  };

  beforeEach(() => {
    // Reset config before each test
    setCoreEnvConfig({
      VITE_AMBIENTE: '',
    });
  });

  afterEach(() => {
    // Restore original config
    setCoreEnvConfig(originalConfig);
  });

  describe('getMiIntranetUrl', () => {
    it('debe retornar siempre la misma URL independiente del ambiente', () => {
      const expectedUrl = 'https://intranet.consalud.cl';
      
      // Probar sin ambiente configurado
      expect(getMiIntranetUrl()).toBe(expectedUrl);
      
      // Probar con ambiente de desarrollo
      setCoreEnvConfig({ VITE_AMBIENTE: 'Desarrollo' });
      expect(getMiIntranetUrl()).toBe(expectedUrl);
      
      // Probar con ambiente de testing
      setCoreEnvConfig({ VITE_AMBIENTE: 'Testing' });
      expect(getMiIntranetUrl()).toBe(expectedUrl);
      
      // Probar con ambiente de producción
      setCoreEnvConfig({ VITE_AMBIENTE: 'Produccion' });
      expect(getMiIntranetUrl()).toBe(expectedUrl);
    });
  });

  describe('getPortalConsaludUrl', () => {
    it('debe retornar URL de desarrollo cuando VITE_AMBIENTE es "Desarrollo"', () => {
      setCoreEnvConfig({ VITE_AMBIENTE: 'Desarrollo' });
      expect(getPortalConsaludUrl()).toBe('http://betaportal.consalud.des/login.aspx');
    });

    it('debe retornar URL de desarrollo cuando VITE_AMBIENTE es "development"', () => {
      setCoreEnvConfig({ VITE_AMBIENTE: 'development' });
      expect(getPortalConsaludUrl()).toBe('http://betaportal.consalud.des/login.aspx');
    });

    it('debe retornar URL de testing cuando VITE_AMBIENTE es "Testing"', () => {
      setCoreEnvConfig({ VITE_AMBIENTE: 'Testing' });
      expect(getPortalConsaludUrl()).toBe('http://betaportal.consalud.tes/login.aspx');
    });

    it('debe retornar URL de testing cuando VITE_AMBIENTE es "test"', () => {
      setCoreEnvConfig({ VITE_AMBIENTE: 'test' });
      expect(getPortalConsaludUrl()).toBe('http://betaportal.consalud.tes/login.aspx');
    });

    it('debe retornar URL de producción cuando VITE_AMBIENTE es "Produccion"', () => {
      setCoreEnvConfig({ VITE_AMBIENTE: 'Produccion' });
      expect(getPortalConsaludUrl()).toBe('http://betaportal.consalud.net/login.aspx');
    });

    it('debe retornar URL de producción cuando VITE_AMBIENTE es "production"', () => {
      setCoreEnvConfig({ VITE_AMBIENTE: 'production' });
      expect(getPortalConsaludUrl()).toBe('http://betaportal.consalud.net/login.aspx');
    });

    it('debe retornar URL de desarrollo por defecto cuando el ambiente no está configurado', () => {
      setCoreEnvConfig({ VITE_AMBIENTE: '' });
      expect(getPortalConsaludUrl()).toBe('http://betaportal.consalud.des/login.aspx');
    });

    it('debe retornar URL de desarrollo por defecto cuando el ambiente no es reconocido', () => {
      setCoreEnvConfig({ VITE_AMBIENTE: 'unknown' });
      expect(getPortalConsaludUrl()).toBe('http://betaportal.consalud.des/login.aspx');
    });

    it('debe ser case-insensitive', () => {
      setCoreEnvConfig({ VITE_AMBIENTE: 'DESARROLLO' });
      expect(getPortalConsaludUrl()).toBe('http://betaportal.consalud.des/login.aspx');
      
      setCoreEnvConfig({ VITE_AMBIENTE: 'TESTING' });
      expect(getPortalConsaludUrl()).toBe('http://betaportal.consalud.tes/login.aspx');
      
      setCoreEnvConfig({ VITE_AMBIENTE: 'PRODUCCION' });
      expect(getPortalConsaludUrl()).toBe('http://betaportal.consalud.net/login.aspx');
    });
  });

  describe('getExternalLinksUrls', () => {
    it('debe retornar objeto con todas las URLs para ambiente de desarrollo', () => {
      setCoreEnvConfig({ VITE_AMBIENTE: 'Desarrollo' });
      const urls = getExternalLinksUrls();
      
      expect(urls).toHaveProperty('miIntranet');
      expect(urls).toHaveProperty('portalConsalud');
      expect(urls.miIntranet).toBe('https://intranet.consalud.cl');
      expect(urls.portalConsalud).toBe('http://betaportal.consalud.des/login.aspx');
    });

    it('debe retornar objeto con todas las URLs para ambiente de testing', () => {
      setCoreEnvConfig({ VITE_AMBIENTE: 'Testing' });
      const urls = getExternalLinksUrls();
      
      expect(urls.miIntranet).toBe('https://intranet.consalud.cl');
      expect(urls.portalConsalud).toBe('http://betaportal.consalud.tes/login.aspx');
    });

    it('debe retornar objeto con todas las URLs para ambiente de producción', () => {
      setCoreEnvConfig({ VITE_AMBIENTE: 'Produccion' });
      const urls = getExternalLinksUrls();
      
      expect(urls.miIntranet).toBe('https://intranet.consalud.cl');
      expect(urls.portalConsalud).toBe('http://betaportal.consalud.net/login.aspx');
    });
  });
});
