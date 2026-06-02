import { ActivityBoard } from "@/components/dashboard/ActivityBoard";
import { MainArea } from "@/components/dashboard/MainArea";

export default function ActivityPage() {
  return (
    <MainArea eyebrow="Activity" title="Your activity">
      <ActivityBoard />
    </MainArea>
  );
}
