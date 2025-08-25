import { MainSection } from "@/ui/components/main-section";
import SchedulesClient from "@/ui/pages/main/schedules/schedules-client";

export default function Schedules() {
  return (
    <MainSection>
      <MainSection.Section>
        <MainSection.Title>Schedules</MainSection.Title>
        <MainSection.Content>
          <SchedulesClient />
        </MainSection.Content>
      </MainSection.Section>
    </MainSection>
  );
}
