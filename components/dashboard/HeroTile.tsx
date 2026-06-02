"use client";

import { motion } from "framer-motion";
import { Flame, Sparkles } from "lucide-react";

import { BentoTile } from "@/components/dashboard/BentoTile";
import { CountUp } from "@/components/motion/CountUp";

interface HeroTileProps {
  name: string;
  streakDays: number;
  /** Booleans for the trailing 7 days, oldest → today. */
  weekActivity?: boolean[];
  className?: string;
}

const DEFAULT_WEEK = [true, true, false, true, true, true, true];

export function HeroTile({
  name,
  streakDays,
  weekActivity = DEFAULT_WEEK,
  className = "md:col-span-2 xl:col-span-3",
}: HeroTileProps) {
  return (
    <BentoTile
      ariaLabel={`Welcome back ${name}. ${streakDays} day learning streak.`}
      className={className}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(36rem 22rem at 0% 0%, rgba(56,189,248,0.18), transparent 55%), radial-gradient(30rem 20rem at 100% 120%, rgba(34,211,238,0.12), transparent 55%)",
        }}
      />

      <div className="relative flex h-full flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
            <Sparkles className="h-3.5 w-3.5 text-glow-cyan" aria-hidden />
            Your learning hub
          </span>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-glow-cyan via-glow-sky to-glow-blue bg-clip-text text-transparent">
              {name}
            </span>
          </h2>
          <p className="max-w-md text-sm text-slate-400">
            You&apos;re on a roll. Keep the momentum going and finish what you
            started today.
          </p>
        </div>

        {/* Streak indicator */}
        <div className="flex shrink-0 flex-col items-start gap-3 rounded-2xl border border-white/10 bg-ink-950/40 p-4 sm:items-center">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-xl border border-glow-amber/30 bg-glow-amber/10 text-glow-amber">
              <Flame className="h-6 w-6" aria-hidden />
            </span>
            <div className="leading-none">
              <p className="text-3xl font-bold tabular-nums text-slate-50">
                <CountUp to={streakDays} delay={0.35} />
              </p>
              <p className="mt-1 text-xs text-slate-400">day streak</p>
            </div>
          </div>

          {/* Trailing-week dots */}
          <ul className="flex items-center gap-1.5" aria-label="This week's activity">
            {weekActivity.map((active, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.5 + i * 0.05,
                  type: "spring",
                  stiffness: 400,
                  damping: 22,
                }}
                className={`h-2.5 w-2.5 rounded-full ${
                  active
                    ? "bg-glow-amber shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                    : "bg-white/10"
                }`}
              />
            ))}
          </ul>
        </div>
      </div>
    </BentoTile>
  );
}
