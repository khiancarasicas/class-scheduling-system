import InstructorsTable from "@/ui/pages/management/manage-instructors/instructors-table";

export default function ManageInstructors() {
  return (
    <main className="space-y-2">
      <div className="text-base font-medium">Manage Instructors</div>
      <InstructorsTable />
    </main>
  );
}