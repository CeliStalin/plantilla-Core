export const pageTransitionStyles = {
  container: {
    width: '100%',
    height: '100%',
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden' as const,
    perspective: 1000,
  },
  
  transitions: {
    fade: {
      transition: 'opacity var(--transition-duration, 300ms) var(--transition-easing, cubic-bezier(0.4, 0, 0.2, 1))',
    },
    
    slide: {
      transition: 'all var(--transition-duration, 300ms) var(--transition-easing, cubic-bezier(0.4, 0, 0.2, 1))',
    },
    
    slideLeft: {
      transition: 'all var(--transition-duration, 300ms) var(--transition-easing, cubic-bezier(0.4, 0, 0.2, 1))',
    },
    
    slideRight: {
      transition: 'all var(--transition-duration, 300ms) var(--transition-easing, cubic-bezier(0.4, 0, 0.2, 1))',
    },
    
    slideUp: {
      transition: 'all var(--transition-duration, 300ms) var(--transition-easing, cubic-bezier(0.4, 0, 0.2, 1))',
    },
    
    slideDown: {
      transition: 'all var(--transition-duration, 300ms) var(--transition-easing, cubic-bezier(0.4, 0, 0.2, 1))',
    },
    
    zoom: {
      transition: 'all var(--transition-duration, 300ms) var(--transition-easing, cubic-bezier(0.4, 0, 0.2, 1))',
    },
    
    fadeSlide: {
      transition: 'all var(--transition-duration, 300ms) var(--transition-easing, cubic-bezier(0.4, 0, 0.2, 1))',
    },
  },
};

export const pageTransitionConfig = {
  durations: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  
  easings: {
    easeOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  
  presets: {
    fast: { duration: 200, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    normal: { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    slow: { duration: 500, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    custom: { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }
  }
};
