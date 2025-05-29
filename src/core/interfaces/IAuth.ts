import { IUsuarioAD } from './IUsuarioAD'
import { IUserExterno } from './IUserExterno'
import { RolResponse } from './IRol'

export type IUser = IUsuarioAD | IUserExterno

export interface IAuthConfig {
    clientId: string;
    authority: string;
    scopes: string[];
  }
  
  export interface IAuthResponse<T> {
    data: T;
    error: string;
  }
  
  export interface IAuthService {
    getMe(): Promise<IUser | string>;
    getUsuarioAD(email: string): Promise<IAuthResponse<IUsuarioAD>>;
    getRoles(email: string): Promise<IAuthResponse<RolResponse[]>>;
  }
  
  export interface IUseLocalStorage<T> {
    (key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void];
  }
  
  export type UseLocalStorageType = <T>(key: string, initialValue: T) => [T, (value: T | ((val: T) => T)) => void];
  export interface ILoginContextState {
    isSignedIn: boolean;
    usuario: IUser | null;
    usuarioAD: IUsuarioAD | null;
    roles: RolResponse[];
    loading: boolean;
    error: string;
    errorAD: string;
    errorRoles: string;
    login: () => Promise<void>;
    logout: () => Promise<void>;
  }