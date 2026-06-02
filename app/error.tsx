"use client";

import { motion } from "framer-motion";
import { RefreshCw, ServerCrash } from "lucide-react";
import { useEffect } from "react";

/**
 * Route-level error boundary. Backstops anything the per-section handling in
 * `CourseSection` doesn't already catch, with a graceful retry.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-screen place-items-center px-6">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="group relative max-w-md overflow-hidden rounded-3xl border border-white/5 bg-ink-900/70 p-8 text-center transition-colors hover:border-glow-cyan/30"
      >
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-glow-rose/30 bg-glow-rose/10 text-glow-rose">
          <ServerCrash className="h-7 w-7" aria-hidden />
        </span>
        <h1 className="mt-5 text-lg font-semibold text-slate-100">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          We hit a snag loading your dashboard. This is often a missing or
          invalid Supabase configuration.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-100 outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-glow-cyan/60"
        >
          <RefreshCw className="h-4 w-4" aria-hidden />
          Try again
        </button>
      </motion.section>
    </main>
  );
}
