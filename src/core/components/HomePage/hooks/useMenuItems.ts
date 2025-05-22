import { useState, useEffect } from 'react';
import { ElementMenu } from '@/core/interfaces/IMenusElementos';
import { ApiGetMenus } from '@/core/services/GetApiArq';
import { useAuth } from '@/core/hooks/useAuth';
import { ANIMATION_DELAYS } from '../constants';

export const useMenuItems = () => {
  const { roles, isSignedIn } = useAuth();
  const [menuItems, setMenuItems] = useState<ElementMenu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      if (!isSignedIn) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Find the Developers role or use the first role available
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
        // Add a small delay to ensure the loading animation is visible
        setTimeout(() => setLoading(false), ANIMATION_DELAYS.LOADING_TIMEOUT);
      }
    };
    
    fetchMenuItems();
  }, [isSignedIn, roles]);

  return { menuItems, loading, error };
};