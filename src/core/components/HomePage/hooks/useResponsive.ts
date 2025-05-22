import { useState, useEffect } from 'react';
import { RESPONSIVE_BREAKPOINTS } from '../constants';

export const useResponsive = () => {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => window.innerWidth < RESPONSIVE_BREAKPOINTS.MOBILE
  );
  
  const [isTablet, setIsTablet] = useState<boolean>(
    () => window.innerWidth < RESPONSIVE_BREAKPOINTS.TABLET
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < RESPONSIVE_BREAKPOINTS.MOBILE);
      setIsTablet(window.innerWidth < RESPONSIVE_BREAKPOINTS.TABLET);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile, isTablet };
};