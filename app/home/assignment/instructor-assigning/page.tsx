import { MainSection } from "@/ui/components/main-section";
import InstructorAssigningClient from "@/ui/pages/assignment/instructor-assigning/instructor-assigning-client";

export default function InstructorAssigning() {
  return (
    <MainSection>
      <MainSection.Section>
        <MainSection.Title>Instructor Assigning</MainSection.Title>
        <MainSection.Content>
          <InstructorAssigningClient />
        </MainSection.Content>
      </MainSection.Section>
    </MainSection>
  );
}
