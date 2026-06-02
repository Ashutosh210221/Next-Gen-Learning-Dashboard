import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { DashboardShell } from "@/components/dashboard/DashboardShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexusLearn — Student Dashboard",
  description:
    "A futuristic, server-rendered learning dashboard built with Next.js, Supabase, Tailwind CSS and Framer Motion.",
};

export const viewport: Viewport = {
  themeColor: "#050507",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  // `dark` is hard-set: this product ships dark-mode only.
  // The shell (sidebar + chrome) lives here so it persists across every route,
  // while each page only renders its own <main> content.
  return (
    <html lang="en" className="dark">
      <body className="font-sans">
        <DashboardShell>{children}</DashboardShell>
      </body>
    </html>
  );
}
