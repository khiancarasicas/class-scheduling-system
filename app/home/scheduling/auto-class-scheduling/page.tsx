import { MainSection } from "@/ui/components/main-section";
import AutoClassSchedulingClient from "@/ui/pages/scheduling/auto-class-scheduling/auto-class-scheduling-client";

export default function AutoClassScheduling() {
  return (
    <MainSection>
      <MainSection.Section>
        <MainSection.Title>Auto Class Scheduling</MainSection.Title>
        <MainSection.Content>
          <AutoClassSchedulingClient />
        </MainSection.Content>
      </MainSection.Section>
    </MainSection>
  );
}
