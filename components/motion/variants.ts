import type { Transition, Variants } from "framer-motion";

/**
 * Centralised animation tokens so every tile shares one physical "feel".
 * Entrance and hover both use spring physics per the brief; every animated
 * property is `transform`/`opacity` only, so nothing triggers layout.
 */

/** Hover elevation — the exact spring the brief asks for. */
export const HOVER_SPRING: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};

/** Slightly softer spring for entrance so tiles settle without overshooting. */
const ENTRANCE_SPRING: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 24,
  mass: 0.9,
};

/** Container: orchestrates a sequential reveal of its children. */
export const gridContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.09,
    },
  },
};

/** Child tile: fades in while translating up on the Y-axis (transform only). */
export const tileVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: ENTRANCE_SPRING,
  },
};
