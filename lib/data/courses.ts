import "server-only";

import { createClient } from "@/lib/supabase/server";
import type { Course } from "@/lib/types";

/**
 * Server-only data access for the `courses` table.
 *
 * Lives behind `server-only` so it can never be imported into a Client
 * Component by accident. Throwing on failure lets the nearest `error.tsx`
 * boundary render a graceful fallback instead of leaking a half-broken UI.
 */
export async function getCourses(): Promise<Course[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("id, title, progress, icon_name, created_at")
    .order("created_at", { ascending: true });

  if (error) {
    // Surface a clean message; the original is logged server-side for debugging.
    console.error("[getCourses] Supabase query failed:", error.message);
    throw new Error("Unable to load your courses right now.");
  }

  return data ?? [];
}
