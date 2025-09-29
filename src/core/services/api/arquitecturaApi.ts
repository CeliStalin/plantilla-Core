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
      const rawData = await apiClient.get<RawRolResponse[]>(url);
      return mapRawArrayToRolResponseArray(rawData);
    } catch (error) {
      throw new Error(`Error al obtener roles para ${email}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  public static async getUsuarioAD(email: string): Promise<UsuarioAd> {
    try {
      const rawData = await apiClient.get<RawUsuarioAD>(`/Usuario/mail/${email}`);
      return mapRawToUsuarioAd(rawData);
    } catch (error) {
      throw new Error(`Error al obtener usuario AD para ${email}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  public static async getMenus(rol: string): Promise<ElementMenu[]> {
    if (!rol) {
      return [];
    }

    try {
      const sistema = import.meta.env.VITE_SISTEMA || import.meta.env.VITE_APP_SISTEMA;
      const url = `/Elemento/${rol}/${sistema}`;
      const rawData = await apiClient.get<RawMenusElemento[]>(url);
      return mapRawArrayToElementMenuArray(rawData);
    } catch (error) {
      throw new Error(`Error al obtener menús para rol ${rol}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
}

export const arquitecturaApi = ArquitecturaApi;