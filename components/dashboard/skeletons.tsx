import type { ReactNode } from "react";

/**
 * Skeleton placeholders shown while the Supabase data streams in.
 *
 * They share the exact box model (rounded corners, padding, grid footprint) of
 * the real course tiles, so swapping skeleton → data causes no layout shift.
 * The pulse is a pure `opacity` keyframe (`animate-skeleton-pulse`).
 */

function Shimmer({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`block rounded-md bg-white/5 animate-skeleton-pulse ${className}`}
    />
  );
}

function CourseTileSkeleton() {
  return (
    <article className="min-h-[12rem] overflow-hidden rounded-3xl border border-white/5 bg-ink-900/70 p-5">
      <div className="flex items-start justify-between">
        <Shimmer className="h-11 w-11 rounded-xl" />
        <Shimmer className="h-6 w-16 rounded-full" />
      </div>
      <Shimmer className="mt-6 h-4 w-3/4" />
      <Shimmer className="mt-2 h-4 w-1/2" />
      <Shimmer className="mt-8 h-2 w-full rounded-full" />
    </article>
  );
}

/**
 * Fallback for the courses <Suspense>. `display: contents` keeps each skeleton
 * a direct grid child, matching the real `CourseList` footprint exactly.
 */
export function CourseTilesSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div style={{ display: "contents" }} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <CourseTileSkeleton key={i} />
      ))}
    </div>
  );
}

function TileShell({
  className = "",
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <article
      className={`overflow-hidden rounded-3xl border border-white/5 bg-ink-900/70 p-6 ${className}`}
    >
      {children}
    </article>
  );
}

/**
 * Content-area skeleton used by `app/loading.tsx`. The sidebar lives in the
 * persistent root layout, so this only fills the <main> column during route
 * transitions.
 */
export function DashboardSkeleton() {
  return (
    <main
      className="flex-1 px-4 pb-28 pt-6 sm:px-6 md:pb-10 lg:px-8"
      aria-hidden
      aria-busy="true"
    >
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <Shimmer className="h-8 w-44" />
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
          <TileShell className="min-h-[14rem] md:col-span-2 xl:col-span-3">
            <Shimmer className="h-6 w-40" />
            <Shimmer className="mt-3 h-8 w-72" />
            <Shimmer className="mt-3 h-4 w-64" />
          </TileShell>
          <CourseTilesSkeleton />
          <TileShell className="min-h-[16rem] md:col-span-2 xl:col-span-2">
            <Shimmer className="h-6 w-40" />
            <Shimmer className="mt-4 h-28 w-full" />
          </TileShell>
        </section>
      </div>
    </main>
  );
}
