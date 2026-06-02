"use client";

import type { LucideIcon } from "lucide-react";

import { BentoTile } from "@/components/dashboard/BentoTile";
import { CountUp } from "@/components/motion/CountUp";

type Accent = "cyan" | "sky" | "emerald" | "amber" | "rose";

const ACCENT: Record<Accent, string> = {
  cyan: "text-glow-cyan border-glow-cyan/30 bg-glow-cyan/10",
  sky: "text-glow-sky border-glow-sky/30 bg-glow-sky/10",
  emerald: "text-glow-emerald border-glow-emerald/30 bg-glow-emerald/10",
  amber: "text-glow-amber border-glow-amber/30 bg-glow-amber/10",
  rose: "text-glow-rose border-glow-rose/30 bg-glow-rose/10",
};

interface StatTileProps {
  icon: LucideIcon;
  label: string;
  value: number;
  suffix?: string;
  accent?: Accent;
}

/** Compact KPI tile with an animated count-up value. */
export function StatTile({
  icon: Icon,
  label,
  value,
  suffix = "",
  accent = "cyan",
}: StatTileProps) {
  return (
    <BentoTile
      ariaLabel={`${label}: ${value}${suffix}`}
      className="min-h-[8.5rem]"
    >
      <div className="relative flex h-full flex-col justify-between gap-4 p-5">
        <span
          className={`grid h-10 w-10 place-items-center rounded-xl border ${ACCENT[accent]}`}
        >
          <Icon className="h-5 w-5" strokeWidth={1.9} aria-hidden />
        </span>
        <div>
          <p className="text-2xl font-bold tabular-nums text-slate-50">
            <CountUp to={value} />
            {suffix}
          </p>
          <p className="mt-0.5 text-xs text-slate-400">{label}</p>
        </div>
      </div>
    </BentoTile>
  );
}
