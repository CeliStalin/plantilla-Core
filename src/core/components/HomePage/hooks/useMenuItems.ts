import { useState, useEffect } from 'react';
import { ElementMenu } from '@/core/interfaces/IMenusElementos';
import { ApiGetMenus } from '@/core/services/GetApiArq';
import { useAuth } from '@/core/hooks/useAuth';
import { ANIMATION_DELAYS } from '../constants';
import { useMenuConfig } from '@/core/context/MenuConfigContext'; 

export const useMenuItems = () => {
  const { roles, isSignedIn } = useAuth();
  const { enableDynamicMenu } = useMenuConfig();
  const [menuItems, setMenuItems] = useState<ElementMenu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      if (!isSignedIn || !enableDynamicMenu) { 
        setMenuItems([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const role = roles.find(r => r.Rol === 'Developers')?.Rol || 
                   (roles.length > 0 ? roles[0].Rol : '');
        
        if (role) {
          const items = await ApiGetMenus(role);
          setMenuItems(items || []);
        } else {
          setMenuItems([]);
        }
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