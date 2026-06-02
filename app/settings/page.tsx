import { MainArea } from "@/components/dashboard/MainArea";
import { SettingsPanel } from "@/components/dashboard/SettingsPanel";

export default function SettingsPage() {
  return (
    <MainArea eyebrow="Settings" title="Preferences">
      <SettingsPanel />
    </MainArea>
  );
}
