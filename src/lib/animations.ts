import type { Variants, Transition } from "framer-motion";

// Shared spring transition
const spring: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

const smooth: Transition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1],
};

// Fade in from bottom
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: smooth,
  },
};

// Fade in from left
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: smooth,
  },
};

// Fade in from right
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: smooth,
  },
};

// Scale up fade
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: spring,
  },
};

// Stagger container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// Stagger fast (for hero text)
export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

// Card hover
export const cardHover = {
  scale: 1.03,
  transition: { type: "spring" as const, stiffness: 300, damping: 20 },
};

// Button hover
export const buttonHover = {
  scale: 1.05,
  transition: { type: "spring" as const, stiffness: 400, damping: 17 },
};

// Viewport trigger settings
export const viewportOnce = {
  once: true,
  margin: "-80px" as const,
};
