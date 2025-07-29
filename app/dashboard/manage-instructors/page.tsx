import FinalTable from "@/ui/pages/manage-instructors/final-table";
import InstructorsTable from "@/ui/pages/manage-instructors/instructors-table";
import NewTable from "@/ui/pages/manage-instructors/new-table";
import Component from "@/ui/pages/manage-instructors/table";

export default function ManageInstructors() {
  return (
    <main>
      <div className="text-base">Manage Instructors</div>
      {/* <Component/> */}
      <InstructorsTable />
      {/* <NewTable /> */}
      {/* <FinalTable /> */}
    </main>
  );
}