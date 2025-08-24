import { MainSection } from "@/ui/components/main-section";
import SubjectSchedulingClient from "@/ui/pages/scheduling/subject-scheduling/subject-scheduling-client";

export default function SubjectScheduling() {
  return (
    <MainSection>
      <MainSection.Section>
        <MainSection.Title>Subject Scheduling</MainSection.Title>
        <MainSection.Content>
          <SubjectSchedulingClient />
        </MainSection.Content>
      </MainSection.Section>
    </MainSection>
  );
}
