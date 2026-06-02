"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";

interface ProgressBarProps {
  /** Target completion, 0–100. */
  value: number;
  /** Tailwind gradient classes for the fill, e.g. "from-glow-cyan to-glow-blue". */
  gradient?: string;
  /** Delay before the bar starts filling (used to follow the tile's entrance). */
  delay?: number;
}

/**
 * Custom progress bar.
 *
 * The fill animates from 0 → `value` using `scaleX` (a GPU-composited
 * transform with a left transform-origin) instead of animating `width`, so it
 * never triggers layout. The percentage label counts up in lockstep.
 *
 * Both the bar's `scaleX` and the percentage label are derived from a single
 * `MotionValue` so they can never desync, and an `useReducedMotion()` guard
 * snaps to the final value for users who have requested reduced motion (the
 * imperative `animate()` API doesn't consult `MotionConfig` on its own).
 */
export function ProgressBar({
  value,
  gradient = "from-glow-cyan to-glow-blue",
  delay = 0.25,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const scaleX = useTransform(count, (latest) => latest / 100);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      count.set(clamped);
      return;
    }
    const controls = animate(count, clamped, {
      duration: 1.1,
      delay,
      ease: [0.16, 1, 0.3, 1], // expo-out: fast start, gentle settle
    });
    return controls.stop;
  }, [clamped, count, delay, reducedMotion]);

  return (
    <div className="flex items-center gap-3">
      <div
        className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/5"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className={`absolute inset-0 origin-left rounded-full bg-gradient-to-r ${gradient}`}
          style={{ transformOrigin: "0% 50%", scaleX }}
        />
      </div>
      <span className="w-10 shrink-0 text-right text-xs font-medium tabular-nums text-slate-400">
        <motion.span>{rounded}</motion.span>%
      </span>
    </div>
  );
}
