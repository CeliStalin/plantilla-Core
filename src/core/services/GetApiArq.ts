import { GetApiArquitectura, GetSistema,FetchWithTimeout,GetNameApiKey,GetKeyApiKey} from '../Utils/GetEnvVariables'
import { RolResponse } from '../interfaces/IRol'
import { UsuarioAd } from '../interfaces/IUsuarioAD'
import { RawUsuarioAD } from '../interfaces/IRawUsuarioAD'
import { mapRawToUsuarioAd } from '../Utils/MapperRawToUsuarioAd'
import { mapRawArrayToRolResponseArray } from '../Utils/MapperRawToRol'
import { RawMenusElemento } from '../interfaces/IRawMenusElmento'
import { mapRawArrayToElementMenuArray } from '../Utils/MapperRawMenus'
import { ElementMenu } from '../interfaces/IMenusElementos'

const ApiRoles = async(mail: string): Promise<RolResponse[]> => {
  const ApiUrl = `${GetApiArquitectura()}/Rol/mail/${mail}/app/${GetSistema().codigo}`;
  try {
      const Response = await FetchWithTimeout(ApiUrl, {
          method: "GET",
          headers: {
              [GetNameApiKey()]: GetKeyApiKey(),
              "Content-Type": "application/json; charset=utf-8",
          }
      });
      
      if (!Response.ok) {
          throw new Error(`${Response.status} - ${Response.statusText}`);
      }
      
      const Rawdata = await Response.json();
      
      const formattedData: RolResponse[] = mapRawArrayToRolResponseArray(Rawdata);
      
      return formattedData;
  } catch (ex) {
      const errorMessage = ex instanceof Error 
          ? ex.message 
          : String(ex);
      
      console.error(`[ApiRoles] Error al obtener roles para ${mail}:`, errorMessage);
      throw new Error(`Error al obtener roles para ${mail}: ${errorMessage}`);
  }
}

const ApiGetUsuarioAd = async (mail: string): Promise<UsuarioAd > => {
    const Url = `${GetApiArquitectura()}/Usuario/mail/${mail}`;
    
    try {
      const Response = await FetchWithTimeout(Url, {
        method: "GET",
        headers: {
          [GetNameApiKey()]: GetKeyApiKey(),
          "Content-Type": "application/json; charset=utf-8",
        }
      });
      
      if (!Response.ok) {
        throw new Error(`${Response.status} - ${Response.statusText}`);
      }
      
      const rawData: RawUsuarioAD = await Response.json();
      
      return mapRawToUsuarioAd(rawData);
      
    } catch (ex) {
      const errorMessage = ex instanceof Error 
          ? ex.message 
          : String(ex);
      
      console.error(`[ApiGetUsuarioAd] Error al obtener usuario para ${mail}:`, errorMessage);
      throw new Error(`Error al obtener roles para ${mail}: ${errorMessage}`);
    }
};

const ApiGetMenus = async (rol :string) : Promise<ElementMenu[] | null>   =>  {
   if(!rol){
    return null;
   }
   
   const Url = `${GetApiArquitectura()}/Elemento/${rol}/${GetSistema().codigo}`;
   
   try{
        const Response = await FetchWithTimeout(Url, {
          method: "GET",
          headers: {
            [GetNameApiKey()]: GetKeyApiKey(),
            "Content-Type": "application/json; charset=utf-8",
          }
        });
        
        if (!Response.ok) {
          throw new Error(`${Response.status} - ${Response.statusText}`);
        }
        
        const rawData: RawMenusElemento[] = await Response.json();
        const menuItems = mapRawArrayToElementMenuArray(rawData);
        return menuItems;

   } catch (ex) {
    const errorMessage = ex instanceof Error 
    ? ex.message 
    : String(ex);
    
    console.error(`[ApiGetMenus] Error al obtener menús para rol ${rol}:`, errorMessage);
    throw new Error(`Error al obtener roles para ${rol}: ${errorMessage}`);
  }
}

export {
    ApiRoles,
    ApiGetUsuarioAd,
    ApiGetMenus
}