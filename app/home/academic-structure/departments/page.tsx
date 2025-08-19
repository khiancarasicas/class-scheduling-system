import DepartmentsTable from "@/ui/pages/academic-structure/departments/departments-table";
import { MainSection } from "@/ui/components/main-section";

export default function Departments() {
  return (
    <MainSection>
      <MainSection.Section>
        <MainSection.Title>Departments</MainSection.Title>
        <MainSection.Content>
          <DepartmentsTable />
        </MainSection.Content>
      </MainSection.Section>
    </MainSection>
  );
}
