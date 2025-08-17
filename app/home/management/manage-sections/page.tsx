import { MainSection } from "@/ui/components/main-section";

export default function ManageSections() {
  return (
    <MainSection>
      <MainSection.Section>
        <MainSection.Title>Manage Sections</MainSection.Title>
        <MainSection.Content>
          <p className="text-gray-500">Manage Sections will be displayed here.</p>
        </MainSection.Content>
      </MainSection.Section>
    </MainSection>
  );
}
