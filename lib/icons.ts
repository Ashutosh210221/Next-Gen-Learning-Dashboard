import {
  Atom,
  BookOpen,
  Boxes,
  BrainCircuit,
  Cpu,
  Database,
  Flame,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  Network,
  Rocket,
  Settings,
  Sparkles,
  Trophy,
  type LucideIcon,
} from "lucide-react";

/**
 * Curated registry of the lucide icons used across the dashboard.
 *
 * We map by name instead of doing `import * as Icons` so the bundler can
 * tree-shake — only these icons ship to the client. `iconFor` resolves the
 * `icon_name` column coming from Supabase and degrades to a sensible default
 * when the database holds a name we don't recognise.
 */
const ICONS = {
  Atom,
  BookOpen,
  Boxes,
  BrainCircuit,
  Cpu,
  Database,
  Flame,
  GraduationCap,
  LayoutDashboard,
  LineChart,
  Network,
  Rocket,
  Settings,
  Sparkles,
  Trophy,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

export function iconFor(name: string): LucideIcon {
  return ICONS[name as IconName] ?? BookOpen;
}
