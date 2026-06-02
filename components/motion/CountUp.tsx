"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

interface CountUpProps {
  to: number;
  /** Seconds. */
  duration?: number;
  delay?: number;
  className?: string;
}

/**
 * Animates an integer from 0 → `to`. Pure text update, no layout impact.
 *
 * The animation is driven by the imperative `animate()` API, which does not
 * automatically consult `MotionConfig`. We read `useReducedMotion()` here so
 * users with the OS "reduce motion" preference get the final value instantly
 * instead of watching the digits tick.
 */
export function CountUp({ to, duration = 1, delay = 0.3, className }: CountUpProps) {
  const value = useMotionValue(0);
  const rounded = useTransform(value, (latest) => Math.round(latest));
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      value.set(to);
      return;
    }
    const controls = animate(value, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [to, duration, delay, value, reducedMotion]);

  return <motion.span className={className}>{rounded}</motion.span>;
}
