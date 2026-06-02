import type { ReactNode } from "react";

interface MainAreaProps {
  /** Small uppercase label above the title. */
  eyebrow: string;
  title: string;
  /** Optional content rendered on the right of the header (e.g. a date). */
  trailing?: ReactNode;
  children: ReactNode;
}

/**
 * Shared content column used by every route. Renders the semantic <main>,
 * the centred max-width container and a consistent page header so each page
 * only has to supply its body. Server Component — no client JS.
 */
export function MainArea({ eyebrow, title, trailing, children }: MainAreaProps) {
  return (
    <main className="flex-1 px-4 pb-28 pt-6 sm:px-6 md:pb-10 lg:px-8">
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <header className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-glow-cyan">
              {eyebrow}
            </p>
            <h1 className="mt-1 text-lg font-semibold text-slate-100">{title}</h1>
          </div>
          {trailing}
        </header>
        {children}
      </div>
    </main>
  );
}
