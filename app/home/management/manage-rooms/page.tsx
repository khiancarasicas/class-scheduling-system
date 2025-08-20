import { MainSection } from "@/ui/components/main-section";
import RoomsTable from "@/ui/pages/management/manage-rooms/rooms-table";

export default function ManageRooms() {
  return (
    <MainSection>
      <MainSection.Section>
        <MainSection.Title>Manage Rooms</MainSection.Title>
        <MainSection.Content>
          <RoomsTable />
        </MainSection.Content>
      </MainSection.Section>
    </MainSection>
  );
}
