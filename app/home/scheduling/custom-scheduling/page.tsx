import { MainSection } from "@/ui/components/main-section";
import CustomScheduleClient from "@/ui/pages/scheduling/custom-scheduling/custom-scheduling-client";

export default function CustomScheduling() {
  return (
    <MainSection>
      <MainSection.Section>
        <MainSection.Title>Custom Scheduling</MainSection.Title>
        <MainSection.Content>
          <CustomScheduleClient />
        </MainSection.Content>
      </MainSection.Section>
    </MainSection>
  );
}
