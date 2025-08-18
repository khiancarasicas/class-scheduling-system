import { TestComponent } from "@/ui/pages/system/settings/test-component";
import { ModeToggle } from "@/ui/pages/system/settings/toggle-theme";

export default function Settings() {
  return (
    <main>
      <div className="text-base">Settings</div>
      
      <ModeToggle />
    </main>
  );
}