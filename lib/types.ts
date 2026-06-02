/**
 * Shared TypeScript contracts for the dashboard.
 *
 * `Course` mirrors the `public.courses` table in Supabase exactly, so the same
 * interface flows from the Postgres row → Server Component fetch → client tile
 * props without any casting.
 */

export interface Course {
  id: string;
  title: string;
  /** Completion percentage, 0–100. */
  progress: number;
  /** Name of a `lucide-react` icon, rendered dynamically (e.g. "Atom"). */
  icon_name: string;
  created_at: string;
}

/**
 * Minimal Supabase schema description. Passing this generic to
 * `createServerClient<Database>()` makes every query (`.from("courses")`)
 * fully type-checked end to end.
 */
export interface Database {
  public: {
    Tables: {
      courses: {
        Row: Course;
        Insert: Omit<Course, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<Course, "id">>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
