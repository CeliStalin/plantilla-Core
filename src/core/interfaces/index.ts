export * from './IAuth';
export * from './IFectTimeOutOptions';
export * from './IMenusElementos';
export * from './IRawMenusElmento';
export * from './IRawRolResponse';
export * from './IRawUsuarioAD';
export * from './IRawUsuarioExterno';
export * from './IRol';
export * from './ISistema';
export * from './IUserExterno';

// Explicit re-exports to resolve conflicts
export { IUsuarioAD } from './IUsuarioAD'; // or from './IUserAz' - choose one// IUsuarioAD type is now exported from IUserAz.ts (or choose IUsuarioAD.ts instead)
export { IUser } from './IAuth';
// IUser type is now exported from IAuth.ts
