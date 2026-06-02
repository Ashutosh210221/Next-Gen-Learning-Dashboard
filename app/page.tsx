import { Suspense } from "react";

import { ActivityTile } from "@/components/dashboard/ActivityTile";
import { BentoGrid } from "@/components/dashboard/BentoGrid";
import { CourseSection } from "@/components/dashboard/CourseSection";
import { HeroTile } from "@/components/dashboard/HeroTile";
import { MainArea } from "@/components/dashboard/MainArea";
import { CourseTilesSkeleton } from "@/components/dashboard/skeletons";

// The dashboard reads per-request data (Supabase + cookies), so it always
// renders dynamically — never statically prerendered at build time.
export const dynamic = "force-dynamic";

// In a real app these would come from the authenticated session.
const STUDENT = { name: "Ashutosh", streakDays: 12 };

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <MainArea
      eyebrow="Dashboard"
      title="Overview"
      trailing={<p className="hidden text-sm text-slate-500 sm:block">{today}</p>}
    >
      <BentoGrid>
        <HeroTile name={STUDENT.name} streakDays={STUDENT.streakDays} />

        {/*
          Server Component data fetch, streamed behind a Suspense boundary.
          The hero + activity tiles paint immediately; skeletons hold the
          courses' exact footprint until Supabase responds.
        */}
        <Suspense fallback={<CourseTilesSkeleton />}>
          <CourseSection />
        </Suspense>

        <ActivityTile />
      </BentoGrid>
    </MainArea>
  );
}
