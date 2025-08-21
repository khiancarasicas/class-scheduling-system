import { MainSection } from "@/ui/components/main-section";
import SubjectAssigningClient from "@/ui/pages/assignment/subject-assigning/subject-assigning-client";

export default function SubjectAssigning() {
  return (
    <MainSection>
      <MainSection.Section>
        <MainSection.Title>Subject Assigning</MainSection.Title>
        <MainSection.Content>
          <SubjectAssigningClient />
        </MainSection.Content>
      </MainSection.Section>
    </MainSection>
  );
}
