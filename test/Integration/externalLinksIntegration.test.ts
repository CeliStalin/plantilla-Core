/**
 * Tests de integración para el sistema de URLs dinámicas
 * 
 * Estos tests verifican que las URLs cambien correctamente cuando
 * se actualiza la configuración del ambiente en runtime.
 */

import { describe, it, expect, beforeEach } from '@jest/globals';
import { getExternalLinks } from '../../src/core/components/HomePage/constants/externalLinks';
import { setCoreEnvConfig, GetAmbiente } from '../../src/core/utils';

describe('External Links Integration Tests - Runtime Behavior', () => {
    describe('Dynamic URL evaluation', () => {
    beforeEach(() => {
      // Reset configuration before each test
      setCoreEnvConfig({ VITE_AMBIENTE: 'Desarrollo' });
    });

    it('should update Portal Consalud URL when ambiente changes from Desarrollo to Testing', () => {
      // 1. Iniciar en Desarrollo
      setCoreEnvConfig({ VITE_AMBIENTE: 'Desarrollo' });
      const linksDev = getExternalLinks();
      const portalDev = linksDev.find(link => link.id === 'portal-consalud');
      
      expect(portalDev?.url).toBe('http://betaportal.consalud.des/login.aspx');
      expect(GetAmbiente()).toBe('Desarrollo');
      
      // 2. Cambiar a Testing
      setCoreEnvConfig({ VITE_AMBIENTE: 'Testing' });
      const linksTest = getExternalLinks();
      const portalTest = linksTest.find(link => link.id === 'portal-consalud');
      
      expect(portalTest?.url).toBe('http://betaportal.consalud.tes/login.aspx');
      expect(GetAmbiente()).toBe('Testing');
    });

    it('should update Portal Consalud URL when ambiente changes from Testing to Produccion', () => {
      // 1. Iniciar en Testing
      setCoreEnvConfig({ VITE_AMBIENTE: 'Testing' });
      const linksTest = getExternalLinks();
      const portalTest = linksTest.find(link => link.id === 'portal-consalud');
      
      expect(portalTest?.url).toBe('http://betaportal.consalud.tes/login.aspx');
      
      // 2. Cambiar a Producción
      setCoreEnvConfig({ VITE_AMBIENTE: 'Produccion' });
      const linksProd = getExternalLinks();
      const portalProd = linksProd.find(link => link.id === 'portal-consalud');
      
      expect(portalProd?.url).toBe('http://betaportal.consalud.net/login.aspx');
    });

    it('should update Portal Consalud URL when ambiente changes from Produccion to Desarrollo', () => {
      // 1. Iniciar en Producción
      setCoreEnvConfig({ VITE_AMBIENTE: 'Produccion' });
      const linksProd = getExternalLinks();
      const portalProd = linksProd.find(link => link.id === 'portal-consalud');
      
      expect(portalProd?.url).toBe('http://betaportal.consalud.net/login.aspx');
      
      // 2. Cambiar a Desarrollo
      setCoreEnvConfig({ VITE_AMBIENTE: 'Desarrollo' });
      const linksDev = getExternalLinks();
      const portalDev = linksDev.find(link => link.id === 'portal-consalud');
      
      expect(portalDev?.url).toBe('http://betaportal.consalud.des/login.aspx');
    });

    it('should keep Mi Intranet URL constant across ambiente changes', () => {
      const expectedUrl = 'https://intranet.consalud.cl';
      
      // Probar en Desarrollo
      setCoreEnvConfig({ VITE_AMBIENTE: 'Desarrollo' });
      let links = getExternalLinks();
      let miIntranet = links.find(link => link.id === 'mi-intranet');
      expect(miIntranet?.url).toBe(expectedUrl);
      
      // Probar en Testing
      setCoreEnvConfig({ VITE_AMBIENTE: 'Testing' });
      links = getExternalLinks();
      miIntranet = links.find(link => link.id === 'mi-intranet');
      expect(miIntranet?.url).toBe(expectedUrl);
      
      // Probar en Producción
      setCoreEnvConfig({ VITE_AMBIENTE: 'Produccion' });
      links = getExternalLinks();
      miIntranet = links.find(link => link.id === 'mi-intranet');
      expect(miIntranet?.url).toBe(expectedUrl);
    });

    it('should handle multiple successive ambiente changes correctly', () => {
      const ambientes = ['Desarrollo', 'Testing', 'Produccion', 'Desarrollo', 'Testing'];
      const expectedUrls = [
        'http://betaportal.consalud.des/login.aspx',
        'http://betaportal.consalud.tes/login.aspx',
        'http://betaportal.consalud.net/login.aspx',
        'http://betaportal.consalud.des/login.aspx',
        'http://betaportal.consalud.tes/login.aspx',
      ];

      ambientes.forEach((ambiente, index) => {
        setCoreEnvConfig({ VITE_AMBIENTE: ambiente });
        const links = getExternalLinks();
        const portal = links.find(link => link.id === 'portal-consalud');
        expect(portal?.url).toBe(expectedUrls[index]);
      });
    });

    it('should evaluate URLs on each function call, not on import', () => {
      // Este test verifica que getExternalLinks() evalúa las URLs cada vez,
      // no una sola vez al importar el módulo
      
      setCoreEnvConfig({ VITE_AMBIENTE: 'Desarrollo' });
      const links1 = getExternalLinks();
      const url1 = links1.find(link => link.id === 'portal-consalud')?.url;
      
      setCoreEnvConfig({ VITE_AMBIENTE: 'Produccion' });
      const links2 = getExternalLinks();
      const url2 = links2.find(link => link.id === 'portal-consalud')?.url;
      
      // Las URLs deben ser diferentes
      expect(url1).not.toBe(url2);
      expect(url1).toBe('http://betaportal.consalud.des/login.aspx');
      expect(url2).toBe('http://betaportal.consalud.net/login.aspx');
    });
  });

  describe('Case insensitivity in ambiente names', () => {
    it('should handle different casing variations', () => {
      const variations = [
        { input: 'desarrollo', expected: 'http://betaportal.consalud.des/login.aspx' },
        { input: 'DESARROLLO', expected: 'http://betaportal.consalud.des/login.aspx' },
        { input: 'Desarrollo', expected: 'http://betaportal.consalud.des/login.aspx' },
        { input: 'testing', expected: 'http://betaportal.consalud.tes/login.aspx' },
        { input: 'TESTING', expected: 'http://betaportal.consalud.tes/login.aspx' },
        { input: 'Testing', expected: 'http://betaportal.consalud.tes/login.aspx' },
        { input: 'produccion', expected: 'http://betaportal.consalud.net/login.aspx' },
        { input: 'PRODUCCION', expected: 'http://betaportal.consalud.net/login.aspx' },
        { input: 'Produccion', expected: 'http://betaportal.consalud.net/login.aspx' },
      ];

      variations.forEach(({ input, expected }) => {
        setCoreEnvConfig({ VITE_AMBIENTE: input });
        const links = getExternalLinks();
        const portal = links.find(link => link.id === 'portal-consalud');
        expect(portal?.url).toBe(expected);
      });
    });
  });

  describe('External links structure', () => {
    it('should return all expected external links', () => {
      setCoreEnvConfig({ VITE_AMBIENTE: 'Desarrollo' });
      const links = getExternalLinks();
      
      expect(links).toHaveLength(4);
      expect(links.map(l => l.id)).toEqual([
        'mi-intranet',
        'portal-consalud',
        'consalud-somos-cdc',
        'sucursal-digital'
      ]);
    });

    it('should have correct structure for each link', () => {
      setCoreEnvConfig({ VITE_AMBIENTE: 'Testing' });
      const links = getExternalLinks();
      
      links.forEach(link => {
        expect(link).toHaveProperty('id');
        expect(link).toHaveProperty('title');
        expect(link).toHaveProperty('url');
        expect(link).toHaveProperty('logoSrc');
        expect(link).toHaveProperty('alt');
        expect(link).toHaveProperty('fallbackSrc');
        
        expect(typeof link.id).toBe('string');
        expect(typeof link.title).toBe('string');
        expect(typeof link.url).toBe('string');
      });
    });
  });

  describe('Real-world scenario simulation', () => {
    it('should simulate app startup and ambiente configuration', () => {
      // Simular inicio de aplicación externa
      // 1. La app se inicia sin configuración (estado inicial)
      setCoreEnvConfig({ VITE_AMBIENTE: '' });
      
      // 2. La app lee la variable de entorno y configura el core
      const VITE_AMBIENTE = 'Testing'; // Simulando process.env.VITE_AMBIENTE
      setCoreEnvConfig({ VITE_AMBIENTE: VITE_AMBIENTE });
      
      // 3. El componente HomePage se monta y llama getExternalLinks()
      const links = getExternalLinks();
      const portal = links.find(link => link.id === 'portal-consalud');
      
      // 4. Verificar que Portal Consalud apunte al ambiente correcto
      expect(portal?.url).toBe('http://betaportal.consalud.tes/login.aspx');
      expect(GetAmbiente()).toBe('Testing');
    });

    it('should handle hot reload scenario', () => {
      // Simular hot reload en desarrollo
      setCoreEnvConfig({ VITE_AMBIENTE: 'Desarrollo' });
      
      // Primera carga
      const links1 = getExternalLinks();
      expect(links1.find(l => l.id === 'portal-consalud')?.url).toBe('http://betaportal.consalud.des/login.aspx');
      
      // Simular cambio de código y hot reload (el ambiente no cambia)
      const links2 = getExternalLinks();
      expect(links2.find(l => l.id === 'portal-consalud')?.url).toBe('http://betaportal.consalud.des/login.aspx');
      
      // Verificar consistencia
      expect(links1.find(l => l.id === 'portal-consalud')?.url)
        .toBe(links2.find(l => l.id === 'portal-consalud')?.url);
    });
  });

  describe('Sucursal Digital Dynamic URLs', () => {
    beforeEach(() => {
      // Reset configuration before each test
      setCoreEnvConfig({ VITE_AMBIENTE: 'Desarrollo' });
    });

    it('should update Sucursal Digital URL when ambiente changes from Desarrollo to Testing', () => {
      // 1. Iniciar en Desarrollo
      setCoreEnvConfig({ VITE_AMBIENTE: 'Desarrollo' });
      const linksDev = getExternalLinks();
      const sucursalDev = linksDev.find(link => link.id === 'sucursal-digital');
      
      expect(sucursalDev?.url).toBe('https://tclientes.consalud.cl/#/login');
      expect(GetAmbiente()).toBe('Desarrollo');
      
      // 2. Cambiar a Testing
      setCoreEnvConfig({ VITE_AMBIENTE: 'Testing' });
      const linksTest = getExternalLinks();
      const sucursalTest = linksTest.find(link => link.id === 'sucursal-digital');
      
      expect(sucursalTest?.url).toBe('https://tclientes.consalud.cl/#/login');
      expect(GetAmbiente()).toBe('Testing');
    });

    it('should update Sucursal Digital URL when ambiente changes from Testing to Produccion', () => {
      // 1. Iniciar en Testing
      setCoreEnvConfig({ VITE_AMBIENTE: 'Testing' });
      const linksTest = getExternalLinks();
      const sucursalTest = linksTest.find(link => link.id === 'sucursal-digital');
      
      expect(sucursalTest?.url).toBe('https://tclientes.consalud.cl/#/login');
      
      // 2. Cambiar a Producción
      setCoreEnvConfig({ VITE_AMBIENTE: 'Produccion' });
      const linksProd = getExternalLinks();
      const sucursalProd = linksProd.find(link => link.id === 'sucursal-digital');
      
      expect(sucursalProd?.url).toBe('https://clientes.consalud.cl/#/login');
    });

    it('should update Sucursal Digital URL when ambiente changes from Produccion to Desarrollo', () => {
      // 1. Iniciar en Producción
      setCoreEnvConfig({ VITE_AMBIENTE: 'Produccion' });
      const linksProd = getExternalLinks();
      const sucursalProd = linksProd.find(link => link.id === 'sucursal-digital');
      
      expect(sucursalProd?.url).toBe('https://clientes.consalud.cl/#/login');
      
      // 2. Cambiar a Desarrollo
      setCoreEnvConfig({ VITE_AMBIENTE: 'Desarrollo' });
      const linksDev = getExternalLinks();
      const sucursalDev = linksDev.find(link => link.id === 'sucursal-digital');
      
      expect(sucursalDev?.url).toBe('https://tclientes.consalud.cl/#/login');
    });

    it('should handle multiple successive ambiente changes for Sucursal Digital', () => {
      const ambientes = ['Produccion', 'Desarrollo', 'Testing'];
      const expectedUrls = [
        'https://clientes.consalud.cl/#/login',
        'https://tclientes.consalud.cl/#/login',
        'https://tclientes.consalud.cl/#/login',
      ];

      ambientes.forEach((ambiente, index) => {
        setCoreEnvConfig({ VITE_AMBIENTE: ambiente });
        const links = getExternalLinks();
        const sucursal = links.find(link => link.id === 'sucursal-digital');
        expect(sucursal?.url).toBe(expectedUrls[index]);
      });
    });
  });
});
