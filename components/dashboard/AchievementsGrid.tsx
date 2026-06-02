"use client";

import {
  Boxes,
  BrainCircuit,
  Flame,
  GraduationCap,
  Lock,
  Rocket,
  Trophy,
  type LucideIcon,
} from "lucide-react";

import { BentoGrid } from "@/components/dashboard/BentoGrid";
import { BentoTile } from "@/components/dashboard/BentoTile";

type Accent = "cyan" | "sky" | "blue" | "emerald" | "amber" | "rose";

const ACCENT: Record<Accent, string> = {
  cyan: "text-glow-cyan border-glow-cyan/30 bg-glow-cyan/10",
  sky: "text-glow-sky border-glow-sky/30 bg-glow-sky/10",
  blue: "text-glow-blue border-glow-blue/30 bg-glow-blue/10",
  emerald: "text-glow-emerald border-glow-emerald/30 bg-glow-emerald/10",
  amber: "text-glow-amber border-glow-amber/30 bg-glow-amber/10",
  rose: "text-glow-rose border-glow-rose/30 bg-glow-rose/10",
};

interface Achievement {
  icon: LucideIcon;
  title: string;
  description: string;
  unlocked: boolean;
  accent: Accent;
}

const ACHIEVEMENTS: Achievement[] = [
  { icon: Flame, title: "On Fire", description: "Reached a 7-day learning streak", unlocked: true, accent: "amber" },
  { icon: Rocket, title: "Fast Starter", description: "Completed your first course", unlocked: true, accent: "sky" },
  { icon: BrainCircuit, title: "Deep Thinker", description: "Finished an AI & LLMs module", unlocked: true, accent: "cyan" },
  { icon: Trophy, title: "Champion", description: "Hit 100% on any course", unlocked: false, accent: "emerald" },
  { icon: Boxes, title: "Polymath", description: "Stay active across 4 tracks", unlocked: false, accent: "blue" },
  { icon: GraduationCap, title: "Graduate", description: "Complete every active course", unlocked: false, accent: "rose" },
];

export function AchievementsGrid() {
  return (
    <BentoGrid label="Achievements">
      {ACHIEVEMENTS.map(({ icon: Icon, title, description, unlocked, accent }) => (
        <BentoTile
          key={title}
          ariaLabel={`${title}: ${description}. ${unlocked ? "Unlocked" : "Locked"}.`}
          className="min-h-[11rem]"
        >
          <div
            className={`relative flex h-full flex-col gap-4 p-5 ${
              unlocked ? "" : "opacity-55"
            }`}
          >
            <header className="flex items-start justify-between">
              <span
                className={`grid h-12 w-12 place-items-center rounded-2xl border ${ACCENT[accent]}`}
              >
                <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                  unlocked
                    ? "border-glow-emerald/30 bg-glow-emerald/10 text-glow-emerald"
                    : "border-white/10 bg-white/5 text-slate-400"
                }`}
              >
                {unlocked ? "Unlocked" : <Lock className="h-3 w-3" aria-hidden />}
                {!unlocked && "Locked"}
              </span>
            </header>

            <div className="mt-auto">
              <h3 className="text-base font-semibold text-slate-100">{title}</h3>
              <p className="mt-1 text-sm text-slate-400">{description}</p>
            </div>
          </div>
        </BentoTile>
      ))}
    </BentoGrid>
  );
}
