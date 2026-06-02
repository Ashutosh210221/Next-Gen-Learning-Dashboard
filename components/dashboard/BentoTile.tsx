"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { HOVER_SPRING, tileVariants } from "@/components/motion/variants";

interface BentoTileProps {
  children: ReactNode;
  className?: string;
  /** Optional accessible label for the article landmark. */
  ariaLabel?: string;
}

/**
 * The shared shell for every Bento tile.
 *
 * - Entrance: inherits the `hidden → show` variants from whichever motion
 *   container wraps it, so it participates in that container's stagger.
 * - Hover: elevates with a spring (transform: scale) and reveals a gradient
 *   border + glow via opacity only — zero layout shift, no repaint of siblings.
 *
 * It renders a semantic <article> (via motion) rather than a <div>.
 */
export function BentoTile({ children, className = "", ariaLabel }: BentoTileProps) {
  return (
    <motion.article
      aria-label={ariaLabel}
      variants={tileVariants}
      whileHover={{ scale: 1.02 }}
      transition={HOVER_SPRING}
      className={
        "group relative isolate overflow-hidden rounded-3xl " +
        "border border-white/5 bg-ink-900/80 transition-colors duration-300 hover:border-glow-cyan/30 " +
        "transform-gpu " +
        "shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] " +
        className
      }
    >
      {/* Soft inner glow revealed on hover — opacity only. */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(40rem 20rem at 50% -20%, rgba(34,211,238,0.18), transparent 60%)",
        }}
      />
      {children}
    </motion.article>
  );
}
