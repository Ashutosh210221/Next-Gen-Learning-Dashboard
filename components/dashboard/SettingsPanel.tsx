"use client";

import { motion } from "framer-motion";
import {
  Bell,
  Mail,
  Moon,
  Sparkles,
  User,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

import { BentoGrid } from "@/components/dashboard/BentoGrid";
import { BentoTile } from "@/components/dashboard/BentoTile";

const KNOB_SPRING = { type: "spring", stiffness: 500, damping: 32 } as const;

function Toggle({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onToggle}
      className={`inline-flex h-6 w-11 shrink-0 items-center rounded-full px-0.5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-glow-cyan/60 ${
        on ? "bg-glow-cyan/80" : "bg-white/15"
      }`}
    >
      {/* Flexbox centres the knob vertically, so Framer Motion only drives the
          horizontal slide (x). No transform conflict → knob stays in the track. */}
      <motion.span
        className="h-5 w-5 shrink-0 rounded-full bg-white shadow"
        animate={{ x: on ? 20 : 0 }}
        transition={KNOB_SPRING}
      />
    </button>
  );
}

function SettingRow({
  icon: Icon,
  title,
  description,
  on,
  onToggle,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-100">{title}</p>
          <p className="text-xs text-slate-400">{description}</p>
        </div>
      </div>
      <Toggle on={on} onToggle={onToggle} label={title} />
    </div>
  );
}

export function SettingsPanel() {
  const [prefs, setPrefs] = useState({
    reducedMotion: false,
    glow: true,
    emailNotifications: true,
    weeklyDigest: false,
  });

  const toggle = (key: keyof typeof prefs) =>
    setPrefs((p) => ({ ...p, [key]: !p[key] }));

  return (
    <BentoGrid label="Settings">
      {/* Preferences */}
      <BentoTile className="md:col-span-2 xl:col-span-2" ariaLabel="Preferences">
        <section className="flex h-full flex-col gap-4 p-6">
          <header>
            <h2 className="text-sm font-semibold text-slate-100">Preferences</h2>
            <p className="text-xs text-slate-500">Tune how the dashboard feels.</p>
          </header>
          <div className="space-y-2.5">
            <SettingRow
              icon={Zap}
              title="Reduced motion"
              description="Minimise animations and transitions"
              on={prefs.reducedMotion}
              onToggle={() => toggle("reducedMotion")}
            />
            <SettingRow
              icon={Sparkles}
              title="Glow effects"
              description="Show ambient gradient glows"
              on={prefs.glow}
              onToggle={() => toggle("glow")}
            />
            <SettingRow
              icon={Bell}
              title="Email notifications"
              description="Course reminders and nudges"
              on={prefs.emailNotifications}
              onToggle={() => toggle("emailNotifications")}
            />
            <SettingRow
              icon={Mail}
              title="Weekly digest"
              description="A Monday summary of your progress"
              on={prefs.weeklyDigest}
              onToggle={() => toggle("weeklyDigest")}
            />
          </div>
        </section>
      </BentoTile>

      {/* Profile */}
      <BentoTile ariaLabel="Profile">
        <section className="flex h-full flex-col gap-5 p-6">
          <header>
            <h2 className="text-sm font-semibold text-slate-100">Profile</h2>
            <p className="text-xs text-slate-500">Your account details.</p>
          </header>

          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-glow-cyan to-glow-emerald text-base font-semibold text-ink-950">
              A
            </span>
            <div>
              <p className="text-sm font-medium text-slate-100">Ashutosh</p>
              <p className="text-xs text-slate-400">Pro learner</p>
            </div>
          </div>

          <dl className="mt-auto space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-slate-500" aria-hidden />
              <dt className="sr-only">Name</dt>
              <dd className="text-slate-300">Ashutosh</dd>
            </div>
            <div className="flex items-center gap-3">
              <Moon className="h-4 w-4 text-slate-500" aria-hidden />
              <dt className="sr-only">Theme</dt>
              <dd className="text-slate-300">Dark (always)</dd>
            </div>
          </dl>
        </section>
      </BentoTile>
    </BentoGrid>
  );
}
