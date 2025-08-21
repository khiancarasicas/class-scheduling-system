import { MainSection } from "@/ui/components/main-section";
import SubjectsTable from "@/ui/pages/academic-structure/subjects/subjects-table";

export default function Subjects() {
  return (
    <MainSection>
      <MainSection.Section>
        <MainSection.Title>Subjects</MainSection.Title>
        <MainSection.Content>
          <SubjectsTable />
        </MainSection.Content>
      </MainSection.Section>
    </MainSection>
  );
}
