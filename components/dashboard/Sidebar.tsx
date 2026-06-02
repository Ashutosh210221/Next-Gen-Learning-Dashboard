"use client";

import { motion } from "framer-motion";
import {
  Activity,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  PanelLeft,
  Settings,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/activity", label: "Activity", icon: Activity },
  { href: "/achievements", label: "Achievements", icon: Trophy },
  { href: "/settings", label: "Settings", icon: Settings },
];

const HIGHLIGHT_SPRING = { type: "spring", stiffness: 500, damping: 34 } as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  // Drives the active highlight from the real URL, so it stays in sync no
  // matter how the user navigates (click, back button, deep link).
  const pathname = usePathname();

  return (
    <>
      {/* ---- Desktop / tablet rail (in-flow, animates its own width) ---- */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 76 : 248 }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        className="sticky top-0 hidden h-screen shrink-0 flex-col border-r border-white/5 bg-ink-900/95 md:flex"
      >
        {/* Brand + collapse toggle */}
        <div className="flex h-16 items-center gap-3 px-4">
          <Link
            href="/"
            aria-label="NexusLearn home"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-glow-cyan to-glow-blue text-white shadow-glow outline-none focus-visible:ring-2 focus-visible:ring-glow-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
          >
            <GraduationCap className="h-5 w-5" aria-hidden />
          </Link>
          <span className={collapsed ? "sr-only" : "text-sm font-semibold tracking-tight text-slate-100"}>
            Nexus<span className="text-glow-cyan">Learn</span>
          </span>
          <button
            type="button"
            onClick={onToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
            className="ml-auto grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-200"
          >
            <motion.span animate={{ rotate: collapsed ? 180 : 0 }} transition={HIGHLIGHT_SPRING}>
              <PanelLeft className="h-4 w-4" aria-hidden />
            </motion.span>
          </button>
        </div>

        <nav className="flex-1 px-3 py-2" aria-label="Primary">
          <ul className="space-y-1">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const active = isActive(pathname, href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    title={collapsed ? label : undefined}
                    aria-current={active ? "page" : undefined}
                    className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-glow-cyan/60 ${
                      active ? "text-slate-50" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-highlight-desktop"
                        transition={HIGHLIGHT_SPRING}
                        className="absolute inset-0 -z-10 rounded-xl border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(34,211,238,0.15)]"
                      />
                    )}
                    <Icon
                      className={`h-5 w-5 shrink-0 transition-colors ${active ? "text-glow-cyan" : ""}`}
                      strokeWidth={1.9}
                      aria-hidden
                    />
                    <span className={collapsed ? "sr-only" : "truncate"}>{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User chip */}
        <div className="border-t border-white/5 p-3">
          <div className="flex items-center gap-3 rounded-xl px-2 py-2">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-glow-cyan to-glow-emerald text-sm font-semibold text-ink-950">
              A
            </span>
            <span className={collapsed ? "sr-only" : "min-w-0 leading-tight"}>
              <span className="block truncate text-sm font-medium text-slate-200">Ashutosh</span>
              <span className="block truncate text-xs text-slate-500">Pro learner</span>
            </span>
          </div>
        </div>
      </motion.aside>

      {/* ---- Mobile bottom navigation ---- */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t border-white/10 bg-ink-900/95 px-2 py-2 md:hidden"
      >
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`relative flex flex-1 flex-col items-center gap-1 rounded-lg px-1 py-1.5 text-[10px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-glow-cyan/60 ${
                active ? "text-slate-50" : "text-slate-500"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="nav-highlight-mobile"
                  transition={HIGHLIGHT_SPRING}
                  className="absolute inset-0 -z-10 rounded-lg bg-white/5"
                />
              )}
              <Icon className={`h-5 w-5 ${active ? "text-glow-cyan" : ""}`} aria-hidden />
              <span className="truncate">{label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
