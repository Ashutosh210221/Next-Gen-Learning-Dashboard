"use client";

import { Activity } from "lucide-react";

import { BentoTile } from "@/components/dashboard/BentoTile";
import { CountUp } from "@/components/motion/CountUp";

const WEEKS = 14;
const DAYS = 7;

/**
 * Deterministic 0–4 intensity for cell `i`. Pure 32-bit integer hash so the
 * server-rendered grid and the client hydration always match (no Math.random,
 * no Date — those would cause hydration mismatches).
 */
function intensity(i: number): number {
  let x = (i + 1) * 2654435761;
  x = (x ^ (x >>> 13)) >>> 0;
  x = (x * 1274126177) >>> 0;
  return x % 5;
}

const CELLS = Array.from({ length: WEEKS * DAYS }, (_, i) => intensity(i));
const TOTAL = CELLS.reduce((sum, lvl) => sum + lvl, 0);

const LEVEL_CLASS = [
  "bg-white/5",
  "bg-glow-blue/30",
  "bg-glow-sky/55",
  "bg-glow-cyan/80",
  "bg-glow-cyan",
] as const;

export function ActivityTile({
  className = "md:col-span-2 xl:col-span-2",
}: {
  className?: string;
}) {
  return (
    <BentoTile
      ariaLabel="Your contribution activity over the last 14 weeks"
      className={className}
    >
      <div className="relative flex h-full flex-col gap-5 p-6">
        <header className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-glow-cyan">
              <Activity className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-slate-100">
                Learning activity
              </h3>
              <p className="text-xs text-slate-500">Last 14 weeks</p>
            </div>
          </div>
          <p className="text-right text-xs text-slate-400">
            <span className="block text-lg font-semibold tabular-nums text-slate-100">
              <CountUp to={TOTAL} delay={0.4} />
            </span>
            contributions
          </p>
        </header>

        {/* Contribution grid — scrolls horizontally on very small screens. */}
        <div className="-mx-1 overflow-x-auto px-1 pb-1">
          <div
            className="grid w-max grid-flow-col grid-rows-7 gap-[3px]"
            role="img"
            aria-label={`${TOTAL} contributions in the last 14 weeks`}
          >
            {CELLS.map((level, i) => (
              <span
                key={i}
                className={`h-3.5 w-3.5 rounded-[3px] ${LEVEL_CLASS[level]}`}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <footer className="mt-auto flex items-center justify-end gap-1.5 text-[11px] text-slate-500">
          <span>Less</span>
          {LEVEL_CLASS.map((cls, i) => (
            <span key={i} className={`h-3 w-3 rounded-[3px] ${cls}`} aria-hidden />
          ))}
          <span>More</span>
        </footer>
      </div>
    </BentoTile>
  );
}
