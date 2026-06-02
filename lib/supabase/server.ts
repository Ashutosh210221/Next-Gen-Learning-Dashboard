import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

import type { Database } from "@/lib/types";

/**
 * Creates a request-scoped Supabase client for use inside Server Components,
 * Route Handlers and Server Actions.
 *
 * The anon key is intentionally read from a `NEXT_PUBLIC_*` variable because
 * it is safe to expose (Row Level Security gates every table). We still create
 * the client on the *server* so the cookie-based auth session — and any future
 * RLS-protected reads — never touch the client bundle.
 *
 * In Next.js 15 `cookies()` is async, so this factory is async too.
 */
export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Missing Supabase environment variables. Copy `.env.example` to " +
        "`.env.local` and set NEXT_PUBLIC_SUPABASE_URL and " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(
        cookiesToSet: { name: string; value: string; options: CookieOptions }[],
      ) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // `set` throws when called from a Server Component render. That is
          // expected and safe to ignore here — session refresh is handled by
          // middleware in a full auth setup.
        }
      },
    },
  });
}
