export const pageTransitionStyles = {
  container: {
    width: '100%',
    height: '100%',
    contain: 'layout style paint',
    backfaceVisibility: 'hidden' as const,
  },
  
  transitions: {
    fade: {
      transitionProperty: 'opacity',
      transitionTimingFunction: 'var(--transition-easing, cubic-bezier(0.4, 0, 0.2, 1))',
      transitionDuration: 'var(--transition-duration, 300ms)',
    },
    
    slide: {
      transitionProperty: 'transform, opacity',
      transitionTimingFunction: 'var(--transition-easing, cubic-bezier(0.4, 0, 0.2, 1))',
      transitionDuration: 'var(--transition-duration, 300ms)',
    },
    
    slideLeft: {
      transitionProperty: 'transform, opacity',
      transitionTimingFunction: 'var(--transition-easing, cubic-bezier(0.4, 0, 0.2, 1))',
      transitionDuration: 'var(--transition-duration, 300ms)',
    },
    
    slideRight: {
      transitionProperty: 'transform, opacity',
      transitionTimingFunction: 'var(--transition-easing, cubic-bezier(0.4, 0, 0.2, 1))',
      transitionDuration: 'var(--transition-duration, 300ms)',
    },
    
    slideUp: {
      transitionProperty: 'transform, opacity',
      transitionTimingFunction: 'var(--transition-easing, cubic-bezier(0.4, 0, 0.2, 1))',
      transitionDuration: 'var(--transition-duration, 300ms)',
    },
    
    slideDown: {
      transitionProperty: 'transform, opacity',
      transitionTimingFunction: 'var(--transition-easing, cubic-bezier(0.4, 0, 0.2, 1))',
      transitionDuration: 'var(--transition-duration, 300ms)',
    },
    
    zoom: {
      transitionProperty: 'transform, opacity',
      transitionTimingFunction: 'var(--transition-easing, cubic-bezier(0.4, 0, 0.2, 1))',
      transitionDuration: 'var(--transition-duration, 300ms)',
    },
    
    fadeSlide: {
      transitionProperty: 'transform, opacity',
      transitionTimingFunction: 'var(--transition-easing, cubic-bezier(0.4, 0, 0.2, 1))',
      transitionDuration: 'var(--transition-duration, 300ms)',
    },
    
    minimal: {
      transitionProperty: 'opacity',
      transitionTimingFunction: 'ease-out',
      transitionDuration: '150ms',
    },
  },
};

export const pageTransitionConfig = {
  durations: {
    fast: 200,
    normal: 300,
    slow: 500,
    minimal: 150,
  },
  
  easings: {
    easeOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    minimal: 'ease-out',
  },
  
  presets: {
    fast: { duration: 200, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    normal: { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    slow: { duration: 500, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    custom: { duration: 300, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    minimal: { duration: 150, easing: 'ease-out' },
    none: { duration: 0, easing: 'linear' }
  }
};
