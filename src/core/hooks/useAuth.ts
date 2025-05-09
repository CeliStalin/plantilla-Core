import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { AuthProvider } from '../services/auth/authProviderMsal';
import { getMe, getUsuarioAD, getRoles } from '../services/auth/authService';
import useLocalStorage from './useLocalStorage';
import { IUser } from '../interfaces/IUserAz';
import { RolResponse } from '../interfaces/IRol';
import { UsuarioAd } from '../interfaces/IUsuarioAD';
import { useAuthContext } from '../context/AuthContext';
import { SecureStorageWrapper } from '../services/SecureStorageWrapper';

interface AuthState {
  isSignedIn: boolean;
  usuario: IUser | null;
  usuarioAD: UsuarioAd | null;
  roles: RolResponse[];
  loading: boolean;
  error: string | null;
  errorAD: string | null;
  errorRoles: string | null;
}

interface UseAuthReturn extends AuthState {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  checkAuthentication: () => Promise<boolean>;
  loadUserData: () => Promise<void>;
  hasRole: (roleName: string) => boolean;
  hasAnyRole: (allowedRoles: string[]) => boolean;
  isInitializing: boolean;
  isLoggingOut: boolean;
  authAttempts: number;
  maxAuthAttempts: number;
}

export const useAuth = (): UseAuthReturn => {
  const { isLoggingOut, setIsLoggingOut } = useAuthContext();
  
  // CAMBIO SEGURO: Usar SecureStorageWrapper para la inicialización
  // pero manteniendo useLocalStorage para compatibilidad con código existente
  const [isSignedIn, setIsSignedIn] = useLocalStorage<boolean>('isLogin', SecureStorageWrapper.isAuthenticated());
  const [usuario, setUsuario] = useLocalStorage<IUser | null>('usuario', null);
  const [usuarioAD, setUsuarioAD] = useLocalStorage<UsuarioAd | null>('usuarioAD', null);
  const [roles, setRoles] = useLocalStorage<RolResponse[]>('roles', []);
  
  // Estado local sin persistencia
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [errorAD, setErrorAD] = useState<string | null>(null);
  const [errorRoles, setErrorRoles] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);
  const [authAttempts, setAuthAttempts] = useState<number>(0);
  const maxAuthAttempts = 3; // Máximo número de intentos
  const cache = useRef(new Map());

  // Inicialización y verificación de estado de autenticación
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Asegurarse de que MSAL esté inicializado
        await AuthProvider.initialize();
        
        if (!mounted) return;

        // Verificar si hay redirección pendiente
        const redirectResponse = await AuthProvider.handleRedirectPromise();
        
        if (redirectResponse && redirectResponse.account) {
          console.log("Respuesta de redirección procesada en useAuth");
          
          // CAMBIO SEGURO: Actualizar SecureStorageWrapper
          SecureStorageWrapper.setAuthenticationState(true);
          
          setIsSignedIn(true);
          
          // CAMBIO SEGURO: Guardar información básica no sensible
          if (redirectResponse.account) {
            SecureStorageWrapper.saveUserBasicInfo({
              id: redirectResponse.account.homeAccountId,
              displayName: redirectResponse.account.name || ''
            });
          }
        } else {
          // Verificar estado de autenticación usando método mejorado
          const signedIn = await AuthProvider.isAuthenticated();
          
          if (signedIn !== isSignedIn) {
            // CAMBIO SEGURO: Actualizar SecureStorageWrapper
            SecureStorageWrapper.setAuthenticationState(signedIn);
            
            setIsSignedIn(signedIn);
          }
        }
      } catch (error) {
        console.error('[useAuth] Error en inicialización:', error);
      } finally {
        if (mounted && !isLoggingOut) {
          setIsInitializing(false);
        }
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, []);

  const loadUserData = useCallback(async () => {
    if (!isSignedIn) {
      setUsuario(null);
      setUsuarioAD(null);
      setRoles([]);
      setError(null);
      setErrorAD(null);
      setErrorRoles(null);
      return;
    }
    
    // Si ya tenemos todos los datos, no volvemos a cargarlos
    if (usuario && usuarioAD && roles.length > 0) {
      console.log("Datos de usuario ya cargados, omitiendo carga");
      return;
    }

    console.log("Iniciando carga de datos de usuario...");
    setLoading(true);

    try {
      // Obtener datos del usuario
      const userData = await getMe();
      
      if (typeof userData === 'string') {
        try {
          const parsedError = JSON.parse(userData);
          if (parsedError.Error) {
            console.error('[useAuth] Error al obtener datos de usuario:', parsedError.Error);
            setError(parsedError.Error);
            setUsuario(null);
          }
        } catch (e) {
          console.error('[useAuth] Error al procesar la respuesta:', e);
          setError('Error al procesar la respuesta');
          setUsuario(null);
        }
      } else {
        console.log("Datos de usuario obtenidos correctamente:", userData.displayName);
        setUsuario(userData);
        cache.current.set(userData.id, userData);
        
        // CAMBIO SEGURO: Guardar solo datos básicos no sensibles
        SecureStorageWrapper.saveUserBasicInfo({
          id: userData.id,
          displayName: userData.displayName
        });
        
        if (userData.mail || userData.userPrincipalName) {
          const email = userData.mail || userData.userPrincipalName;
          console.log("Usando email para obtener datos adicionales:", email);

          // Obtener datos de AD
          try {
            console.log("Obteniendo datos de AD...");
            const adData = await getUsuarioAD(email);
            console.log("Datos de AD obtenidos correctamente");
            setUsuarioAD(adData);
            setErrorAD(null);
          } catch (error) {
            console.error('[useAuth] Error al obtener datos de AD:', error);
            setErrorAD(error instanceof Error ? error.message : String(error));
          }

          // Obtener roles
          try {
            console.log("Obteniendo roles...");
            const rolesData = await getRoles(email);
            console.log(`Roles obtenidos: ${rolesData.length}`);
            setRoles(rolesData);
            setErrorRoles(null);
            
            // CAMBIO SEGURO: Guardar nombres de rol (no sensibles) en el wrapper seguro
            if (rolesData && rolesData.length > 0) {
              const roleNames = rolesData.map(role => role.Rol);
              SecureStorageWrapper.saveUserBasicInfo({
                roles: roleNames
              });
            }
          } catch (error) {
            console.error('[useAuth] Error al obtener roles:', error);
            setErrorRoles(error instanceof Error ? error.message : String(error));
          }
        } else {
          console.warn("El usuario no tiene email o userPrincipalName para obtener datos adicionales");
        }
      }
    } catch (err) {
      console.error('[useAuth] Error general al cargar datos de usuario:', err);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
      console.log("Carga de datos de usuario completada");
    }
  }, [isSignedIn]);

  // Asegurarnos de que loadUserData se llame cuando el usuario inicie sesión
  useEffect(() => {
    if (isSignedIn && !loading) {
      console.log("Usuario autenticado, cargando datos...");
      loadUserData();
    }
  }, [isSignedIn, loadUserData]);

  const checkAuthentication = useCallback(async () => {
    try {
      const authenticated = await AuthProvider.isAuthenticated();
      
      if (authenticated !== isSignedIn) {
        // CAMBIO SEGURO: Actualizar SecureStorageWrapper
        SecureStorageWrapper.setAuthenticationState(authenticated);
        
        setIsSignedIn(authenticated);
      }
      
      // Incrementar contador de intentos si no está autenticado
      if (!authenticated) {
        setAuthAttempts(prevAttempts => prevAttempts + 1);
      }
      
      return authenticated;
    } catch (error) {
      console.error('[useAuth] Error al verificar autenticación:', error);
      return false;
    }
  }, [isSignedIn, setIsSignedIn]);

  const login = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Asegurarse de que MSAL esté inicializado
      await AuthProvider.initialize();
      // Iniciar sesión
      await AuthProvider.login();
      
      // CAMBIO SEGURO: Actualizar SecureStorageWrapper
      SecureStorageWrapper.setAuthenticationState(true);
      
      setIsSignedIn(true);
    } catch (err) {
      console.error('[useAuth] Error en proceso de login:', err);
      setError(err instanceof Error ? err.message : String(err));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [setIsSignedIn]);

  const logout = useCallback(async () => {
    setIsLoggingOut(true);
    
    try {
      setLoading(true);
      
      // CAMBIO SEGURO: Limpiar datos de SecureStorageWrapper
      SecureStorageWrapper.clearAuthData();
      
      // Limpiar estado local ANTES del logout de MSAL
      localStorage.removeItem('isLogin');
      localStorage.removeItem('usuario');
      localStorage.removeItem('usuarioAD');
      localStorage.removeItem('roles');
      sessionStorage.removeItem('authMethod');
      
      // Determinar si estamos usando el flujo de redirección
      const isRedirectFlow = AuthProvider.isUsingRedirectFlow();
      
      if (isRedirectFlow) {
        // Logout con redirección
        await AuthProvider.logoutRedirect();
        // No continuamos la ejecución aquí, ya que la redirección nos llevará a otra página
        return;
      } else {
        // Logout normal
        await AuthProvider.logout();
      }
      
      // Limpiar estados (solo se ejecuta para logout normal, no redirect)
      setUsuario(null);
      setUsuarioAD(null);
      setRoles([]);
      setIsSignedIn(false);
      cache.current.clear();
      
      // Redirección manual al login después del logout
      window.location.href = '/login';
    } catch (err) {
      console.error('[useAuth] Error en proceso de logout:', err);
      setError(err instanceof Error ? err.message : String(err));
      
      // Limpieza manual en caso de error
      try {
        sessionStorage.clear();
        localStorage.removeItem('isLogin');
        localStorage.removeItem('usuario');
        localStorage.removeItem('usuarioAD');
        localStorage.removeItem('roles');
        
        // CAMBIO SEGURO: Limpiar wrapper seguro
        SecureStorageWrapper.clearAuthData();
        
        setIsSignedIn(false);
        
        // Redirección al login en caso de error
        window.location.href = '/login';
      } catch (e) {
        console.error('[useAuth] Error en limpieza manual:', e);
      }
      
      throw err;
    } finally {
      setLoading(false);
      // Dar tiempo para que la redirección se complete o para mostrar mensaje de carga
      setTimeout(() => {
        setIsLoggingOut(false);
      }, 2000);
    }
  }, [setIsLoggingOut]);

  const hasRole = useCallback((roleName: string): boolean => {
    if (!roles || roles.length === 0) {
      return false;
    }
    
    // Verificar caso exacto
    const exactMatch = roles.some(role => 
      role && typeof role === 'object' && 'Rol' in role && role.Rol === roleName
    );
    
    // Verificar ignorando mayúsculas/minúsculas
    const caseInsensitiveMatch = roles.some(role => 
      role && typeof role === 'object' && 'Rol' in role && 
      role.Rol.toLowerCase() === roleName.toLowerCase()
    );
    
    // Devolver coincidencia exacta o insensible a mayúsculas según necesidades
    return exactMatch || caseInsensitiveMatch;
  }, [roles]);

  const hasAnyRole = useCallback((allowedRoles: string[]): boolean => {
    // Si no se requieren roles, permitir acceso
    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }
    
    // Si no hay roles asignados, denegar acceso
    if (!roles || roles.length === 0) {
      console.log('Usuario sin roles intentando acceder a ruta protegida');
      return false;
    }
    
    // Crear arrays normalizados para comparación case-insensitive
    const normalizedAllowedRoles = allowedRoles.map(role => 
      typeof role === 'string' ? role.toLowerCase() : ''
    );
    
    const normalizedUserRoles = roles.map(role => 
      role && typeof role === 'object' && 'Rol' in role && typeof role.Rol === 'string' 
        ? role.Rol.toLowerCase() 
        : ''
    );
    
    // Verificar si tiene alguno de los roles permitidos
    const hasPermission = normalizedAllowedRoles.some(role => 
      normalizedUserRoles.includes(role)
    );
    
    if (!hasPermission) {
      console.log(
        `Usuario sin permisos. Roles requeridos: [${allowedRoles.join(', ')}], ` +
        `Roles de usuario: [${roles.map(r => r.Rol).join(', ')}]`
      );
    }
    
    return hasPermission;
  }, [roles]);

  return useMemo(() => ({
    isSignedIn,
    usuario,
    usuarioAD,
    roles,
    loading,
    error,
    errorAD,
    errorRoles,
    login,
    logout,
    checkAuthentication,
    loadUserData,
    hasRole,
    hasAnyRole,
    isInitializing,
    isLoggingOut,
    authAttempts,
    maxAuthAttempts
  }), [
    isSignedIn,
    usuario,
    usuarioAD,
    roles,
    loading,
    error,
    errorAD,
    errorRoles,
    login,
    logout,
    checkAuthentication,
    loadUserData,
    hasRole,
    hasAnyRole,
    isInitializing,
    isLoggingOut,
    authAttempts
  ]);
};

export default useAuth;