import { Variants, Transition } from 'framer-motion';

// Shared transition configs
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 15,
};

export const easeTransition: Transition = {
  duration: 0.5,
  ease: [0.25, 0.46, 0.45, 0.94],
};

// Page transition variants (compositor-friendly: transform + opacity only)
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
    },
  },
};

// Fade in from bottom (default entrance)
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: easeTransition,
  },
};

// Stagger container - wraps children that should animate in sequence
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Stagger item - use inside staggerContainer
export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Card hover animation props (use with whileHover)
export const cardHover = {
  scale: 1.02,
  y: -4,
  transition: { duration: 0.2 },
};

// Button hover animation props
export const buttonHover = {
  scale: 1.02,
  y: -2,
  transition: { duration: 0.15 },
};

// Button tap animation props
export const buttonTap = {
  scale: 0.98,
};

// Icon hover animation props
export const iconHover = {
  scale: 1.1,
  rotate: 5,
  transition: { duration: 0.2 },
};
