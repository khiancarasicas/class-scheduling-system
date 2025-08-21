import { MainSection } from "@/ui/components/main-section";
import AcademicLevelsTable from "@/ui/pages/academic-structure/academic-levels/academic-levels-table";

export default function AcademicLevels() {
  return (
    <MainSection>
      <MainSection.Section>
        <MainSection.Title>Academic Levels</MainSection.Title>
        <MainSection.Content>
          <AcademicLevelsTable />
        </MainSection.Content>
      </MainSection.Section>
    </MainSection>
  );
}
