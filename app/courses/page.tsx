import { Suspense } from "react";

import { BentoGrid } from "@/components/dashboard/BentoGrid";
import { CourseSection } from "@/components/dashboard/CourseSection";
import { MainArea } from "@/components/dashboard/MainArea";
import { CourseTilesSkeleton } from "@/components/dashboard/skeletons";

export const dynamic = "force-dynamic";

export default function CoursesPage() {
  return (
    <MainArea eyebrow="Courses" title="All courses">
      <BentoGrid label="Your courses">
        <Suspense fallback={<CourseTilesSkeleton count={6} />}>
          <CourseSection />
        </Suspense>
      </BentoGrid>
    </MainArea>
  );
}
