import { useState, useEffect, useRef } from 'react';
import { ElementMenu } from '@/core/interfaces/IMenusElementos';
import { ApiGetMenus } from '@/core/services/GetApiArq';
import { useAuth } from '@/core/hooks/useAuth';
import { ANIMATION_DELAYS } from '../constants';
import { useMenuConfig } from '@/core/hooks';

export const useMenuItems = () => {
  const { roles, isSignedIn } = useAuth();
  const { enableDynamicMenu } = useMenuConfig();
  const [menuItems, setMenuItems] = useState<ElementMenu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Ref para trackear si ya hemos cargado los datos
  const hasLoadedRef = useRef(false);
  const lastRoleRef = useRef<string>('');

  useEffect(() => {
    const fetchMenuItems = async () => {
      console.log('[useMenuItems] isSignedIn:', isSignedIn);
      console.log('[useMenuItems] enableDynamicMenu:', enableDynamicMenu);
      console.log('[useMenuItems] roles:', roles);
      // Si no está habilitado el menú dinámico, no cargar
      if (!enableDynamicMenu) { 
        setMenuItems([]);
        setLoading(false);
        hasLoadedRef.current = true;
        return;
      }

      // Si no está autenticado, limpiar estado
      if (!isSignedIn) {
        setMenuItems([]);
        setLoading(false);
        hasLoadedRef.current = false;
        lastRoleRef.current = '';
        return;
      }

      // Determinar el rol actual
      const currentRole = roles.find(r => r.Rol === 'Developers')?.Rol || 
                         (roles.length > 0 ? roles[0].Rol : '');
      console.log('[useMenuItems] Rol seleccionado para menú:', currentRole);

      // Si ya hemos cargado con el mismo rol, no volver a cargar
      if (hasLoadedRef.current && lastRoleRef.current === currentRole) {
        return;
      }

      // Si no hay rol, limpiar y marcar como cargado
      if (!currentRole) {
        setMenuItems([]);
        setLoading(false);
        hasLoadedRef.current = true;
        lastRoleRef.current = '';
        return;
      }

      // Solo mostrar loading si realmente vamos a hacer una llamada nueva
      if (!hasLoadedRef.current || lastRoleRef.current !== currentRole) {
        setLoading(true);
        setError(null);
      }

      try {
        const items = await ApiGetMenus(currentRole);
        setMenuItems(items || []);
        hasLoadedRef.current = true;
        lastRoleRef.current = currentRole;
      } catch (err) {
        console.error("Error fetching menu items:", err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setMenuItems([]);
      } finally {
        setTimeout(() => setLoading(false), ANIMATION_DELAYS.LOADING_TIMEOUT);
      }
    };
    
    fetchMenuItems();
  }, [isSignedIn, roles, enableDynamicMenu]); 

  return { menuItems, loading, error };
};