"use client";

import { DataTable } from "@/ui/components/data-table";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisIcon, PlusIcon, Loader2 } from "lucide-react";
import { Button } from "@/shadcn/components/ui/button";
import { Checkbox } from "@/shadcn/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";
import { IDepartment, IInstructor } from "@/types";
import {
  getInstructors,
  addInstructor,
  updateInstructor,
  deleteInstructor,
} from "@/services/instructorService";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/ui/components/comfirm-delete-dialog";
import { DataForm } from "@/ui/components/data-form";
import { getDepartments } from "@/services/departmentService";
import { Badge } from "@/shadcn/components/ui/badge";

export default function InstructorsTable() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingInstructor, setEditingInstructor] =
    useState<IInstructor | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [instructors, setInstructors] = useState<IInstructor[]>([]);
  const [departments, setDepartments] = useState<IDepartment[]>([]);

  // 🆕 delete dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [instructorToDelete, setInstructorToDelete] =
    useState<IInstructor | null>(null);

  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      setInstructors(getInstructors());
      setDepartments(getDepartments());
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    loadData();
  }, []);

  // const getDepartmentName = (departmentId: string) => {
  //   const dept = departments.find((d) => d._id === departmentId);
  //   return dept ? dept.name : "Unknown";
  // };

  const DepartmentBadge = ({ departmentId }: { departmentId: string }) => {
    const dept = departments.find((d) => d._id === departmentId);
    return <Badge variant="outline">{dept ? dept.code : "Unknown"}</Badge>;
  };

  // ADD
  const handleAddInstructor = async (instructorData: {
    name: string;
    departmentId: string;
    status: "Full-Time" | "Part-Time";
  }) => {
    setIsSubmitting(true);
    try {
      if (!instructorData.name) {
        toast.error("Instructor name is required");
        return;
      }

      if (!instructorData.departmentId) {
        toast.error("Department is required");
        return;
      }

      if (!instructorData.status) {
        toast.error("Status is required");
        return;
      }

      if (addInstructor(instructorData)) {
        toast.success(`Instructor added successfully`);
        loadData();
      } else {
        toast.error("Failed to add instructor");
      }
      setIsAddDialogOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // UPDATE
  const handleUpdateInstructor = async (instructorData: {
    _id?: string;
    name: string;
    departmentId: string;
    status: "Full-Time" | "Part-Time";
  }) => {
    if (!instructorData._id) return;
    setIsSubmitting(true);
    try {
      if (!instructorData.name) {
        toast.error("Instructor name is required");
        return;
      }

      if (!instructorData.departmentId) {
        toast.error("Department is required");
        return;
      }

      if (!instructorData.status) {
        toast.error("Status is required");
        return;
      }

      if (
        updateInstructor(instructorData._id, {
          name: instructorData.name,
          departmentId: instructorData.departmentId,
          status: instructorData.status,
        })
      ) {
        toast.success(`Instructor updated successfully`);
        loadData();
      } else {
        toast.error("Failed to update instructor");
      }

      setIsEditDialogOpen(false);
      setEditingInstructor(null);
    } catch (error) {
      toast.error("Error updating instructor");
      console.error("Error updating instructor:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // DELETE
  const handleDeleteInstructor = (id: string) => {
    try {
      if (!id) {
        toast.error("Error deleting instructor");
        return;
      }
      if (deleteInstructor(id)) {
        toast.success(`Instructor deleted successfully`);
        loadData();
      } else {
        toast.error("Failed to delete instructor");
      }
    } catch (error) {
      toast.error("Error deleting instructor");
      console.error("Error deleting instructor:", error);
    }
  };

  const columns: ColumnDef<IInstructor>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
      enableHiding: false,
    },
    {
      header: "Department",
      accessorKey: "departmentId",
      cell: ({ row }) => {
        const departmentId = row.getValue<string>("departmentId");
        // return getDepartmentName(departmentId);
        return <DepartmentBadge departmentId={departmentId} />;
      },
      filterFn: "equals",
    },
    {
      header: "Status",
      accessorKey: "status",
    },
    {
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => (
        <RowActions
          instructor={row.original}
          onEdit={(ins) => {
            setEditingInstructor(ins);
            setIsEditDialogOpen(true);
          }}
          onDelete={(ins) => {
            setInstructorToDelete(ins);
            setIsDeleteDialogOpen(true);
          }}
        />
      ),
    },
  ];

  return (
    <div className="space-y-3">
      {loading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <span className="ml-2 text-sm text-muted-foreground">
            Loading please wait...
          </span>
        </div>
      ) : (
        <DataTable data={instructors} columns={columns}>
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <DataTable.Search
                column="name"
                placeholder="Search instructors..."
                className="max-w-sm"
              />
              <DataTable.Filter
                column="departmentId"
                placeholder="All departments"
                renderValue={(id) => {
                  const dept = departments.find((d) => d._id === id);
                  return dept ? dept.name : "Unknown";
                }}
              />
              <DataTable.ClearFilters />
              <DataTable.ViewOptions />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <DataTable.DeleteSelected
                onDeleteSelected={(ids) => {
                  ids.forEach((id) => handleDeleteInstructor(id));
                }}
              />
              {/* Add Button */}
              <Button
                variant="default"
                onClick={() => setIsAddDialogOpen(true)}
              >
                <PlusIcon
                  className="-ms-1 opacity-60"
                  size={16}
                  aria-hidden="true"
                />
                Add Instructor
              </Button>
            </div>
          </div>

          {/* Table */}
          <DataTable.Content />

          {/* Pagination */}
          <DataTable.Pagination />
        </DataTable>
      )}

      <InstructorForm
        isOpen={isAddDialogOpen}
        onClose={() => {
          setIsAddDialogOpen(false);
        }}
        onSubmit={handleAddInstructor}
        isLoading={isSubmitting}
        departments={departments}
      />

      <InstructorForm
        item={editingInstructor || undefined}
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setEditingInstructor(null);
        }}
        onSubmit={handleUpdateInstructor}
        isLoading={isSubmitting}
        departments={departments}
      />

      {/* Delete Dialog */}
      <ConfirmDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          if (instructorToDelete?._id) {
            handleDeleteInstructor(instructorToDelete._id);
          }
          setIsDeleteDialogOpen(false);
          setInstructorToDelete(null);
        }}
        itemName={instructorToDelete?.name}
      />
    </div>
  );
}

function RowActions({
  instructor,
  onEdit,
  onDelete,
}: {
  instructor: IInstructor;
  onEdit: (ins: IInstructor) => void;
  onDelete: (ins: IInstructor) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-end">
          <Button size="icon" variant="ghost" className="shadow-none">
            <EllipsisIcon size={16} />
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(instructor)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => onDelete(instructor)}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function InstructorForm({
  isOpen,
  item,
  onClose,
  onSubmit,
  isLoading,
  departments,
}: {
  isOpen: boolean;
  item?: IInstructor;
  onClose: () => void;
  onSubmit: (data: IInstructor) => void;
  isLoading?: boolean;
  departments: IDepartment[];
}) {
  return (
    <DataForm<IInstructor>
      item={item}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      isLoading={isLoading}
      title={{ add: "Add Instructor", edit: "Edit Instructor" }}
    >
      <DataForm.Input
        name="name"
        label="Instructor Name"
        placeholder="Enter instructor name"
        required
      />
      <DataForm.Select
        name="departmentId"
        label="Department"
        required
        options={departments.map((dept) => ({
          label: dept.name,
          value: dept._id ?? "",
        }))}
      />
      <DataForm.Select
        name="status"
        label="Status"
        required
        options={[
          { label: "Full-Time", value: "Full-Time" },
          { label: "Part-Time", value: "Part-Time" },
        ]}
      />
    </DataForm>
  );
}
