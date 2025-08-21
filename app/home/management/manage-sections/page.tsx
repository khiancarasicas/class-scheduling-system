import { MainSection } from "@/ui/components/main-section";
import SectionsTable from "@/ui/pages/management/manage-sections/sections-table";

export default function ManageSections() {
  return (
    <MainSection>
      <MainSection.Section>
        <MainSection.Title>Manage Sections</MainSection.Title>
        <MainSection.Content>
          <SectionsTable />
        </MainSection.Content>
      </MainSection.Section>
    </MainSection>
  );
}
