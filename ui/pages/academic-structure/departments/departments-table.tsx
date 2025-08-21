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
  getDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} from "@/services/departmentService";
import { toast } from "sonner";
import { ConfirmDeleteDialog } from "@/ui/components/comfirm-delete-dialog";
import { DataForm } from "@/ui/components/data-form";
import { Badge } from "@/shadcn/components/ui/badge";
import { getInstructors } from "@/services/instructorService";

export default function DepartmentsTable() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] =
    useState<IDepartment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [instructors, setInstructors] = useState<IInstructor[]>([]);

  // 🆕 delete dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] =
    useState<IDepartment | null>(null);

  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      setDepartments(getDepartments());
      setInstructors(getInstructors());
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    loadData();
  }, []);

  const getDepartmentStats = (departmentId: string) => {
    const instructorsCount = instructors.filter(
      (i) => i.departmentId === departmentId
    ).length;

    return { instructorsCount };
  };

  // ADD
  const handleAddDepartment = async (departmentData: {
    code: string;
    name: string;
  }) => {
    setIsSubmitting(true);
    try {
      if (!departmentData.code) {
        toast.error("Department code is required");
      }

      if (!departmentData.name) {
        toast.error("Department name is required");
        return;
      }

      if (addDepartment(departmentData)) {
        toast.success(`Department added successfully`);
        loadData();
      } else {
        toast.error("Failed to add department");
      }
      setIsAddDialogOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  // UPDATE
  const handleUpdateDepartment = async (departmentData: {
    _id?: string;
    code: string;
    name: string;
  }) => {
    if (!departmentData._id) return;
    setIsSubmitting(true);
    try {
      if (!departmentData.code) {
        toast.error("Department code is required");
      }

      if (!departmentData.name) {
        toast.error("Department name is required");
        return;
      }

      if (
        updateDepartment(departmentData._id, {
          code: departmentData.code,
          name: departmentData.name,
        })
      ) {
        toast.success(`Department updated successfully`);
        loadData();
      } else {
        toast.error("Failed to update department");
      }

      setIsEditDialogOpen(false);
      setEditingDepartment(null);
    } catch (error) {
      toast.error("Error updating department");
      console.error("Error updating department:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // DELETE
  const handleDeleteDepartment = (id: string) => {
    try {
      if (!id) {
        toast.error("Error deleting department: Invalid ID");
        return;
      }
      if (deleteDepartment(id)) {
        toast.success(`Department deleted successfully`);
        loadData();
      } else {
        toast.error("Failed to delete department");
      }
    } catch (error) {
      toast.error("Error deleting department");
      console.error("Error deleting department:", error);
    }
  };

  const columns: ColumnDef<IDepartment>[] = [
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
      header: "Code",
      accessorKey: "code",
      cell: ({ row }) => (
        <Badge variant="outline">{row.getValue("code")}</Badge>
      ),
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
    },
    {
      header: "Instructors",
      id: "instructorsCount",
      cell: ({ row }) => {
        const stats = getDepartmentStats(row.original._id || "");

        return <span>{stats.instructorsCount}</span>;
      },
    },
    {
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => (
        <RowActions
          department={row.original}
          onEdit={(dep) => {
            setEditingDepartment(dep);
            setIsEditDialogOpen(true);
          }}
          onDelete={(dep) => {
            setDepartmentToDelete(dep);
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
        <DataTable data={departments} columns={columns}>
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <DataTable.Search
                column="name"
                placeholder="Search departments..."
                className="max-w-sm"
              />
              <DataTable.ClearFilters />
              <DataTable.ViewOptions />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <DataTable.DeleteSelected
                onDeleteSelected={(ids) => {
                  ids.forEach((id) => handleDeleteDepartment(id));
                }}
              />
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <PlusIcon className="-ms-1 opacity-60" size={16} />
                Add Department
              </Button>
            </div>
          </div>

          <DataTable.Content />
          <DataTable.Pagination />
        </DataTable>
      )}

      <DepartmentForm
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddDepartment}
        isLoading={isSubmitting}
      />

      <DepartmentForm
        item={editingDepartment || undefined}
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setEditingDepartment(null);
        }}
        onSubmit={handleUpdateDepartment}
        isLoading={isSubmitting}
      />

      {/* Delete Dialog */}
      <ConfirmDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          if (departmentToDelete?._id) {
            handleDeleteDepartment(departmentToDelete._id);
          }
          setIsDeleteDialogOpen(false);
          setDepartmentToDelete(null);
        }}
        itemName={departmentToDelete?.name}
      />
    </div>
  );
}

function RowActions({
  department,
  onEdit,
  onDelete,
}: {
  department: IDepartment;
  onEdit: (dep: IDepartment) => void;
  onDelete: (dep: IDepartment) => void;
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
        <DropdownMenuItem onClick={() => onEdit(department)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => onDelete(department)}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DepartmentForm({
  isOpen,
  item,
  onClose,
  onSubmit,
  isLoading,
}: {
  isOpen: boolean;
  item?: IDepartment;
  onClose: () => void;
  onSubmit: (data: IDepartment) => void;
  isLoading?: boolean;
}) {
  return (
    <DataForm<IDepartment>
      item={item}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      isLoading={isLoading}
      title={{ add: "Add Department", edit: "Edit Department" }}
    >
      <DataForm.Input
        name="code"
        label="Department Code"
        placeholder="e.g., IT"
        required
      />
      <DataForm.Input
        name="name"
        label="Department Name"
        placeholder="e.g., Information Technology"
        required
      />
    </DataForm>
  );
}
