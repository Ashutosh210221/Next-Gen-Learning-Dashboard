import { AchievementsGrid } from "@/components/dashboard/AchievementsGrid";
import { MainArea } from "@/components/dashboard/MainArea";

export default function AchievementsPage() {
  return (
    <MainArea eyebrow="Achievements" title="Your badges">
      <AchievementsGrid />
    </MainArea>
  );
}
