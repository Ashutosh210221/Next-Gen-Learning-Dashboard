import { AlertTriangle } from "lucide-react";

import { getCourses } from "@/lib/data/courses";
import { CourseList } from "@/components/dashboard/CourseList";

/**
 * Async Server Component: fetches courses from Supabase on the server and
 * hands the typed payload to the client `CourseList` for animation.
 *
 * Rendered inside a <Suspense> boundary in the page, so its `await` streams the
 * tiles in after the rest of the dashboard has already painted. Errors are
 * caught locally and rendered as an inline tile so a DB hiccup never takes the
 * whole dashboard down (a route-level `error.tsx` still backstops anything
 * unexpected).
 */
export async function CourseSection() {
  try {
    const courses = await getCourses();
    return <CourseList courses={courses} />;
  } catch {
    return (
      <article className="col-span-full flex items-center gap-4 rounded-3xl border border-glow-rose/20 bg-glow-rose/5 p-6">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-glow-rose/30 bg-glow-rose/10 text-glow-rose">
          <AlertTriangle className="h-5 w-5" aria-hidden />
        </span>
        <div>
          <h3 className="text-sm font-semibold text-slate-100">
            Couldn&apos;t load your courses
          </h3>
          <p className="text-xs text-slate-400">
            We couldn&apos;t reach the database. Check your Supabase environment
            variables and try refreshing.
          </p>
        </div>
      </article>
    );
  }
}
