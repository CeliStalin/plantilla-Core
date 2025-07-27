import React, { useEffect } from 'react';

interface AnimationProviderProps {
  children: React.ReactNode;
}

/**
 * AnimationProvider ensures that animations work correctly in external apps
 * by injecting the necessary CSS styles when the component mounts.
 */
export const AnimationProvider: React.FC<AnimationProviderProps> = ({ children }) => {
  useEffect(() => {
    // Inject CSS for external apps if not already present
    const injectAnimationsCSS = () => {
      const existingStyle = document.getElementById('consalud-core-animations');
      if (existingStyle) return;

      const style = document.createElement('style');
      style.id = 'consalud-core-animations';
      style.textContent = `
        /* Consalud Core Animations for External Apps */
        @keyframes fadeInCard {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes rotateChevron {
          0% { transform: translateX(0); }
          100% { transform: translateX(3px); }
        }

        /* Access Card Animations - Only apply animations, don't hide initially */
        .access-card {
          transition: all 0.3s ease !important;
        }

        .access-card:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15) !important;
        }

        .access-card:focus {
          outline: 2px solid #04A59B !important;
          outline-offset: 2px !important;
        }

        /* App Card Animations - Only apply animations, don't hide initially */
        .app-card {
          transition: all 0.3s ease !important;
        }

        .app-card:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15) !important;
        }

        .app-card:hover svg {
          animation: rotateChevron 0.3s forwards !important;
        }

        .app-card:focus {
          outline: 2px solid #04A59B !important;
          outline-offset: 2px !important;
        }

        /* Welcome Section Animation */
        .welcome-section {
          animation: fadeInUp 0.8s ease-out forwards !important;
        }

        /* Reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .access-card,
          .app-card,
          .welcome-section {
            animation: none !important;
            transition: none !important;
          }
          
          .access-card:hover,
          .app-card:hover {
            transform: none !important;
            box-shadow: none !important;
          }
          
          .app-card:hover svg {
            animation: none !important;
          }
        }

        /* Responsive animations */
        @media screen and (max-width: 768px) {
          .access-card,
          .app-card {
            animation-duration: 0.3s !important;
          }
          
          .welcome-section {
            animation-duration: 0.5s !important;
          }
        }
      `;

      document.head.appendChild(style);
    };

    injectAnimationsCSS();
  }, []);

  return <>{children}</>;
}; 