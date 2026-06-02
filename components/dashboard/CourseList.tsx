"use client";

import { motion } from "framer-motion";

import { gridContainerVariants } from "@/components/motion/variants";
import { CourseTile } from "@/components/dashboard/CourseTile";
import type { Course } from "@/lib/types";

/**
 * Client stagger container for the dynamic course tiles.
 *
 * Uses `display: contents` so the course <article>s become direct children of
 * the Bento CSS grid (no extra wrapping box), while this element still
 * orchestrates their staggered entrance via Framer Motion variants. It runs
 * its own `hidden → show` cycle on mount, so the stagger fires exactly when the
 * streamed Supabase data arrives.
 */
export function CourseList({ courses }: { courses: Course[] }) {
  if (courses.length === 0) {
    return (
      <article className="col-span-full grid place-items-center rounded-3xl border border-dashed border-white/10 bg-ink-900/50 p-10 text-center">
        <p className="text-sm text-slate-400">
          No courses yet — run{" "}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-slate-300">
            supabase/seed.sql
          </code>{" "}
          to add some.
        </p>
      </article>
    );
  }

  return (
    <motion.div
      style={{ display: "contents" }}
      variants={gridContainerVariants}
      initial="hidden"
      animate="show"
    >
      {courses.map((course, index) => (
        <CourseTile key={course.id} course={course} index={index} />
      ))}
    </motion.div>
  );
}
