"use client";

import { MotionConfig } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

import { Sidebar } from "@/components/dashboard/Sidebar";

/**
 * Top-level client shell.
 *
 * Owns the sidebar collapse state (so the in-flow <aside> can reflow the main
 * column) and syncs it to the viewport: tablets (768–1023px) get the icons-only
 * rail per the responsive spec, desktops get the full rail. `MotionConfig` with
 * `reducedMotion="user"` makes every animation honour the OS setting.
 *
 * `children` is the server-rendered <main>, passed straight through so the
 * data-fetching stays in Server Components.
 */
export function DashboardShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (max-width: 1023px)");
    const sync = () => setCollapsed(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative flex min-h-screen">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
        <div className="flex min-w-0 flex-1 flex-col">{children}</div>
      </div>
    </MotionConfig>
  );
}
