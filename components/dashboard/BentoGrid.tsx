"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { gridContainerVariants } from "@/components/motion/variants";

/**
 * The Bento CSS grid AND the stagger orchestrator for the tiles that are
 * available on first paint (Hero, Activity). It renders a semantic <section>
 * via Framer Motion and reveals its direct variant-children sequentially.
 *
 * The course tiles arrive through a <Suspense> child and run their own nested
 * stagger (see CourseList), so they animate in the moment Supabase data streams.
 */
export function BentoGrid({
  children,
  label = "Dashboard overview",
}: {
  children: ReactNode;
  label?: string;
}) {
  return (
    <motion.section
      aria-label={label}
      variants={gridContainerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3"
    >
      {children}
    </motion.section>
  );
}
