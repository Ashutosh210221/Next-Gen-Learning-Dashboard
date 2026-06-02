"use client";

import { iconFor } from "@/lib/icons";
import type { Course } from "@/lib/types";
import { BentoTile } from "@/components/dashboard/BentoTile";
import { ProgressBar } from "@/components/dashboard/ProgressBar";

/** Rotating accent palette so each course tile reads distinctly. */
const ACCENTS = [
  { mesh: "rgba(34,211,238,0.20)", bar: "from-glow-cyan to-glow-sky", icon: "text-glow-cyan" },
  { mesh: "rgba(56,189,248,0.18)", bar: "from-glow-sky to-glow-blue", icon: "text-glow-sky" },
  { mesh: "rgba(52,211,153,0.18)", bar: "from-glow-emerald to-glow-cyan", icon: "text-glow-emerald" },
  { mesh: "rgba(251,113,133,0.18)", bar: "from-glow-rose to-glow-amber", icon: "text-glow-rose" },
] as const;

interface CourseTileProps {
  course: Course;
  index: number;
}

export function CourseTile({ course, index }: CourseTileProps) {
  const Icon = iconFor(course.icon_name);
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <BentoTile
      ariaLabel={`${course.title}, ${course.progress}% complete`}
      className="min-h-[12rem]"
    >
      {/* Abstract gradient mesh + grain behind the content. */}
      <span
        aria-hidden
        className="bg-grain pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: `radial-gradient(28rem 16rem at 110% -10%, ${accent.mesh}, transparent 60%)`,
        }}
      />

      <div className="relative flex h-full flex-col gap-5 p-5">
        <header className="flex items-start justify-between gap-3">
          <span
            className={`grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 ${accent.icon}`}
          >
            <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-400">
            Active
          </span>
        </header>

        <h3 className="text-base font-semibold leading-snug text-slate-100">
          {course.title}
        </h3>

        <div className="mt-auto space-y-2">
          <p className="text-xs text-slate-500">Progress</p>
          <ProgressBar
            value={course.progress}
            gradient={accent.bar}
            delay={0.2 + index * 0.05}
          />
        </div>
      </div>
    </BentoTile>
  );
}
