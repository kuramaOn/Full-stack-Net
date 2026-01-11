/**
 * Icon Animation Variants Library
 * Reusable animation configurations for icons throughout the admin interface
 */

// Base animation variants for icons
export const iconVariants = {
  // Hover animations
  hover: {
    scale: {
      scale: 1.2,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    rotate: {
      rotate: [0, -10, 10, -10, 0],
      transition: { duration: 0.5 }
    },
    shake: {
      x: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.4 }
    },
    bounce: {
      y: [0, -8, 0],
      transition: { duration: 0.4, ease: "easeOut" }
    },
    spin: {
      rotate: 360,
      transition: { duration: 0.6, ease: "easeInOut" }
    },
    pulse: {
      scale: [1, 1.3, 1],
      transition: { duration: 0.4 }
    },
    wiggle: {
      rotate: [0, 10, -10, 10, 0],
      transition: { duration: 0.5 }
    },
    flipX: {
      rotateY: 180,
      transition: { duration: 0.4 }
    },
    flipY: {
      rotateX: 180,
      transition: { duration: 0.4 }
    }
  },
  
  // Tap/Click animations
  tap: {
    scale: 0.9,
    transition: { duration: 0.1 }
  },
  
  // Continuous loop animations
  loop: {
    bounce: {
      y: [0, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    rotate: {
      rotate: [0, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    },
    pulse: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    beat: {
      scale: [1, 1.3, 1, 1.3, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    breathe: {
      scale: [1, 1.15, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    swing: {
      rotate: [0, 10, -10, 10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    float: {
      y: [0, -15, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  
  // Glow effects
  glow: {
    basic: {
      boxShadow: [
        "0 0 0px rgba(129, 199, 212, 0)",
        "0 0 20px rgba(129, 199, 212, 0.5)",
        "0 0 0px rgba(129, 199, 212, 0)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    intense: {
      filter: [
        "drop-shadow(0 0 0px rgba(129, 199, 212, 0))",
        "drop-shadow(0 0 10px rgba(129, 199, 212, 0.8))",
        "drop-shadow(0 0 0px rgba(129, 199, 212, 0))"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }
};

// Preset animation combinations for specific use cases
export const iconPresets = {
  // Sidebar navigation icons
  sidebar: {
    whileHover: {
      scale: 1.2,
      rotate: 10,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    whileTap: {
      scale: 0.9
    }
  },
  
  // Action button icons (edit, delete, etc.)
  action: {
    whileHover: {
      scale: 1.15,
      rotate: [0, -5, 5, 0],
      transition: { duration: 0.3 }
    },
    whileTap: {
      scale: 0.9
    }
  },
  
  // Stat card icons
  statCard: {
    whileHover: {
      rotate: [0, -10, 10, -10, 0],
      transition: { duration: 0.5 }
    }
  },
  
  // Table row icons
  tableIcon: {
    whileHover: {
      scale: 1.2,
      transition: { type: "spring", stiffness: 300 }
    },
    whileTap: {
      scale: 0.85
    }
  },
  
  // Loading/processing icons
  loading: {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  },
  
  // Success/confirmation icons
  success: {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: [0, 1.3, 1],
      opacity: 1,
      transition: {
        duration: 0.5,
        times: [0, 0.6, 1],
        ease: "easeOut"
      }
    }
  },
  
  // Error/warning icons
  error: {
    animate: {
      x: [-5, 5, -5, 5, 0],
      transition: {
        duration: 0.5
      }
    }
  },
  
  // Notification bell
  notification: {
    whileHover: {
      rotate: [0, -20, 20, -20, 20, 0],
      transition: { duration: 0.6 }
    },
    whileTap: {
      scale: 0.9
    }
  }
};

// Helper function to get animation by type
export const getLoopAnimation = (type) => {
  const animations = {
    bounce: { y: [0, -10, 0] },
    rotate: { rotate: [0, 360] },
    pulse: { scale: [1, 1.2, 1] },
    beat: { scale: [1, 1.3, 1, 1.3, 1] },
    breathe: { scale: [1, 1.15, 1], opacity: [1, 0.8, 1] },
    swing: { rotate: [0, 10, -10, 10, 0] },
    float: { y: [0, -15, 0] }
  };
  
  return animations[type] || {};
};

// Get animation duration by type
export const getAnimationDuration = (type) => {
  const durations = {
    bounce: 2,
    rotate: 2,
    pulse: 2,
    beat: 1,
    breathe: 3,
    swing: 2,
    float: 3
  };
  
  return durations[type] || 2;
};

// Icon wrapper component props generator
export const generateIconWrapperProps = (preset, customProps = {}) => {
  return {
    ...iconPresets[preset],
    ...customProps
  };
};

// Animated icon background glow
export const getGlowAnimation = (color = 'glacier') => {
  const colors = {
    glacier: 'rgba(129, 199, 212, 0.5)',
    purple: 'rgba(168, 85, 247, 0.5)',
    green: 'rgba(34, 197, 94, 0.5)',
    red: 'rgba(239, 68, 68, 0.5)',
    yellow: 'rgba(234, 179, 8, 0.5)',
    blue: 'rgba(59, 130, 246, 0.5)'
  };
  
  return {
    animate: {
      scale: [1, 1.5, 1],
      opacity: [0, 0.5, 0]
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };
};

export default {
  iconVariants,
  iconPresets,
  getLoopAnimation,
  getAnimationDuration,
  generateIconWrapperProps,
  getGlowAnimation
};
