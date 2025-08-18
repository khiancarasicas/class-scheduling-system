import { Button } from "@/shadcn/components/ui/button";
import { MainSection } from "@/ui/components/main-section";

export default function AcademicLevels() {
  return (
    <MainSection>
      <MainSection.Section>
        <MainSection.Title>Academic Levels</MainSection.Title>
        <MainSection.Content>
          <p className="text-gray-500">
            Academic levels will be displayed here. 
          </p>
          <Button>TEST BUTTON</Button>
        </MainSection.Content>
      </MainSection.Section>
    </MainSection>
  );
}
