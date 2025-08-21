import { MainSection } from "@/ui/components/main-section";
import CoursesTable from "@/ui/pages/academic-structure/courses/courses-table";

export default function Courses() {
  return (
    <MainSection>
      <MainSection.Section>
        <MainSection.Title>Courses</MainSection.Title>
        <MainSection.Content>
          <CoursesTable />
        </MainSection.Content>
      </MainSection.Section>
    </MainSection>
  );
}
