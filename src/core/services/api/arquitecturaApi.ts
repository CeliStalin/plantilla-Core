import { apiClient } from './apiClient';
import { RolResponse } from '../../interfaces/IRol';
import { UsuarioAd } from '../../interfaces/IUsuarioAD';
import { ElementMenu } from '../../interfaces/IMenusElementos';
import { RawRolResponse } from '../../interfaces/IRawRolResponse';
import { RawUsuarioAD } from '../../interfaces/IRawUsuarioAD';
import { RawMenusElemento } from '../../interfaces/IRawMenusElmento';
import { 
  mapRawArrayToRolResponseArray, 
  mapRawToUsuarioAd, 
  mapRawArrayToElementMenuArray 
} from '../../utils/mappers';

export class ArquitecturaApi {

  public static async getRoles(email: string): Promise<RolResponse[]> {
    try {
      const sistema = import.meta.env.VITE_SISTEMA || import.meta.env.VITE_APP_SISTEMA;
      const url = `/Rol/mail/${email}/app/${sistema}`;
      console.log('[getRoles] URL construida:', url);
      const rawData = await apiClient.get<RawRolResponse[]>(url);
      console.log('[getRoles] Respuesta cruda de la API:', rawData);
      return mapRawArrayToRolResponseArray(rawData);
    } catch (error) {
      console.error('Error al obtener roles:', error);
      throw new Error(`Error al obtener roles para ${email}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  public static async getUsuarioAD(email: string): Promise<UsuarioAd> {
    try {
      const rawData = await apiClient.get<RawUsuarioAD>(`/Usuario/mail/${email}`);
      return mapRawToUsuarioAd(rawData);
    } catch (error) {
      console.error('Error al obtener usuario AD:', error);
      throw new Error(`Error al obtener usuario AD para ${email}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  public static async getMenus(rol: string): Promise<ElementMenu[]> {
    if (!rol) {
      console.warn('[getMenus] Rol vacío, no se realizará la petición.');
      return [];
    }

    try {
      const sistema = import.meta.env.VITE_SISTEMA || import.meta.env.VITE_APP_SISTEMA;
      const url = `/Elemento/${rol}/${sistema}`;
      console.log('[getMenus] Rol:', rol);
      console.log('[getMenus] Sistema:', sistema);
      console.log('[getMenus] URL construida:', url);
      const rawData = await apiClient.get<RawMenusElemento[]>(url);
      console.log('[getMenus] Respuesta cruda de la API:', rawData);
      return mapRawArrayToElementMenuArray(rawData);
    } catch (error) {
      console.error('Error al obtener menús:', error);
      throw new Error(`Error al obtener menús para rol ${rol}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

export const arquitecturaApi = ArquitecturaApi;