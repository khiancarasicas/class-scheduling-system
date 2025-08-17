import { MainSection } from "@/ui/components/main-section";

export default function ClassSchedule() {
  return (
    <MainSection>
      <MainSection.Section>
        <MainSection.Title>Class Schedule</MainSection.Title>
        <MainSection.Content>
          <p className="text-gray-500">
            Class schedule will be displayed here.
          </p>
        </MainSection.Content>
      </MainSection.Section>
    </MainSection>
  );
}
