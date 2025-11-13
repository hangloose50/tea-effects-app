/**
 * Framer Motion Animation Variants Library
 * Organic, tea-inspired motion design patterns
 */

import { Variants, Transition } from 'framer-motion';

// ==========================================
// Easing Functions - Organic Motion
// ==========================================

export const easings = {
  organic: [0.33, 0, 0.2, 1],      // Smooth, natural easing
  spring: [0.34, 1.56, 0.64, 1],   // Gentle bounce
  tea: [0.25, 0.1, 0.25, 1],       // Custom tea motion
} as const;

// ==========================================
// Transitions - Pre-configured
// ==========================================

export const transitions = {
  fastest: { duration: 0.1, ease: easings.organic },
  fast: { duration: 0.2, ease: easings.organic },
  normal: { duration: 0.3, ease: easings.tea },
  slow: { duration: 0.5, ease: easings.tea },
  slowest: { duration: 0.7, ease: easings.tea },
  spring: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 17,
  },
  springGentle: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 20,
  },
} as const;

// ==========================================
// Page Transitions
// ==========================================

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: transitions.normal,
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: transitions.fast,
  },
};

export const pageFadeVariants: Variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: transitions.slow,
  },
  exit: {
    opacity: 0,
    transition: transitions.fast,
  },
};

// ==========================================
// Card Animations
// ==========================================

export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.normal,
  },
  hover: {
    y: -4,
    scale: 1.02,
    transition: transitions.spring,
  },
  tap: {
    scale: 0.98,
    transition: transitions.fastest,
  },
};

export const cardHoverVariants: Variants = {
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: transitions.spring,
  },
};

// ==========================================
// Stagger Animations - For Lists
// ==========================================

export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.normal,
  },
};

export const staggerFade: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: transitions.normal,
  },
};

// ==========================================
// Modal/Dialog Animations
// ==========================================

export const modalOverlayVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: transitions.fast,
  },
  exit: {
    opacity: 0,
    transition: transitions.fast,
  },
};

export const modalContentVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: transitions.spring,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: transitions.fast,
  },
};

// ==========================================
// Button Interactions
// ==========================================

export const buttonVariants: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: transitions.spring,
  },
  tap: {
    scale: 0.95,
    transition: transitions.fastest,
  },
};

// ==========================================
// Fade In Animations
// ==========================================

export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: transitions.normal,
  },
};

export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.normal,
  },
};

export const fadeInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.normal,
  },
};

export const fadeInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.normal,
  },
};

export const fadeInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.normal,
  },
};

// ==========================================
// Scale Animations
// ==========================================

export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.spring,
  },
};

export const scalePop: Variants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: transitions.springGentle,
  },
};

// ==========================================
// Tea-Specific Animations
// ==========================================

// Steam rising animation for brewing timer
export const steamVariants: Variants = {
  rising: {
    y: [-5, -15, -25],
    opacity: [0.3, 0.6, 0],
    scale: [1, 1.1, 1.2],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeOut',
    },
  },
};

// Tea cup fill animation
export const teaCupFillVariants: Variants = {
  empty: {
    scaleY: 0,
    originY: 1,
  },
  filling: {
    scaleY: 1,
    transition: {
      duration: 2,
      ease: 'easeInOut',
    },
  },
};

// Leaf floating animation
export const leafFloatVariants: Variants = {
  float: {
    y: [0, -10, 0],
    rotate: [0, 5, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Ripple effect for interactive elements
export const rippleVariants: Variants = {
  start: {
    scale: 0,
    opacity: 0.5,
  },
  end: {
    scale: 2,
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// Brewing progress animation
export const brewingProgressVariants: Variants = {
  brewing: {
    rotate: 360,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// ==========================================
// Loading States
// ==========================================

export const loadingSpinner: Variants = {
  spin: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

export const loadingDots: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const loadingPulse: Variants = {
  pulse: {
    scale: [1, 1.1, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ==========================================
// Notification/Toast Animations
// ==========================================

export const toastVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -50,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: transitions.spring,
  },
  exit: {
    opacity: 0,
    y: -50,
    scale: 0.8,
    transition: transitions.fast,
  },
};

export const slideInFromRight: Variants = {
  hidden: {
    x: '100%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: transitions.normal,
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: transitions.fast,
  },
};

// ==========================================
// Accordion/Collapse Animations
// ==========================================

export const accordionVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: transitions.fast,
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: transitions.normal,
  },
};

// ==========================================
// Hover Effects
// ==========================================

export const hoverLift: Variants = {
  rest: {
    y: 0,
  },
  hover: {
    y: -4,
    transition: transitions.fast,
  },
};

export const hoverGlow: Variants = {
  rest: {
    boxShadow: '0 2px 8px rgba(43, 57, 32, 0.08)',
  },
  hover: {
    boxShadow: '0 8px 24px rgba(90, 111, 82, 0.2)',
    transition: transitions.fast,
  },
};

// ==========================================
// Custom Hook Helpers
// ==========================================

/**
 * Get animation props with reduced motion support
 * @param variants - Framer Motion variants object
 * @param prefersReducedMotion - Whether user prefers reduced motion
 * @returns Animation props respecting accessibility preferences
 */
export const getAnimationProps = (
  variants: Variants,
  prefersReducedMotion = false
) => {
  if (prefersReducedMotion) {
    return {
      initial: false,
      animate: 'visible',
      exit: false,
      transition: { duration: 0.01 },
    };
  }

  return {
    initial: 'hidden',
    animate: 'visible',
    exit: 'exit',
    variants,
  };
};

/**
 * Create a stagger container with custom delay
 * @param staggerDelay - Delay between children (in seconds)
 * @param delayChildren - Initial delay before first child (in seconds)
 * @returns Custom stagger container variants
 */
export const createStaggerContainer = (
  staggerDelay = 0.1,
  delayChildren = 0
): Variants => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren,
    },
  },
});

/**
 * Create a custom fade-in animation
 * @param direction - Direction to fade in from ('up' | 'down' | 'left' | 'right')
 * @param distance - Distance to travel (in pixels)
 * @returns Custom fade-in variants
 */
export const createFadeIn = (
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance = 20
): Variants => {
  const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';
  const value = direction === 'up' || direction === 'left' ? distance : -distance;

  return {
    hidden: {
      opacity: 0,
      [axis]: value,
    },
    visible: {
      opacity: 1,
      [axis]: 0,
      transition: transitions.normal,
    },
  };
};

export default {
  // Variants
  pageVariants,
  pageFadeVariants,
  cardVariants,
  cardHoverVariants,
  staggerContainer,
  staggerItem,
  staggerFade,
  modalOverlayVariants,
  modalContentVariants,
  buttonVariants,
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  scalePop,
  steamVariants,
  teaCupFillVariants,
  leafFloatVariants,
  rippleVariants,
  brewingProgressVariants,
  loadingSpinner,
  loadingDots,
  loadingPulse,
  toastVariants,
  slideInFromRight,
  accordionVariants,
  hoverLift,
  hoverGlow,

  // Transitions
  transitions,

  // Helpers
  getAnimationProps,
  createStaggerContainer,
  createFadeIn,
};
