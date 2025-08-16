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
import { DepartmentForm } from "./department-form";
import { IDepartment } from "@/types";
import {
  getDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} from "@/services/departmentService";
import { toast } from "sonner";

export default function DepartmentsTable() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] =
    useState<IDepartment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [departments, setDepartments] = useState<IDepartment[]>([]);

  const loadData = () => {
    setLoading(true);
    setTimeout(() => {
      // simulate slow API call
      setDepartments(getDepartments());
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    loadData();
  }, []);

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
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
      enableHiding: false,
    },
    {
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => {
        const department = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex justify-end">
                <Button
                  size="icon"
                  variant="ghost"
                  className="shadow-none"
                  aria-label="Edit item"
                >
                  <EllipsisIcon size={16} aria-hidden="true" />
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setEditingDepartment(department);
                  setIsEditDialogOpen(true);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => {
                  if (department._id) {
                    handleDeleteDepartment(department._id);
                  } else {
                    console.error("Department ID is undefined");
                  }
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableHiding: false,
    },
  ];

  // ADD
  const handleAddDepartment = async (departmentData: { name: string }) => {
    setIsSubmitting(true);
    try {
      if (!departmentData.name) {
        toast.error("Department name is required");
        return;
      }

      if (addDepartment(departmentData)) {
        toast.success(`Department "${departmentData.name}" added successfully`);
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
    name: string;
  }) => {
    if (!departmentData._id) return;
    setIsSubmitting(true);
    try {
      if (!departmentData.name) {
        toast.error("Department name is required");
        return;
      }

      if (updateDepartment(departmentData._id, { name: departmentData.name })) {
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
        toast.error("Cannot delete department without ID");
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

  return (
    <div className="space-y-3">
      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          <span className="ml-2 text-sm text-muted-foreground">
            Loading departments...
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
                Add Department
              </Button>
            </div>
          </div>

          {/* Table */}
          <DataTable.Content />

          {/* Pagination */}
          <DataTable.Pagination />
        </DataTable>
      )}

      {/* Create Dialog */}
      <DepartmentForm
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddDepartment}
        isLoading={isSubmitting}
      />

      {/* Edit Dialog */}
      <DepartmentForm
        department={editingDepartment || undefined}
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setEditingDepartment(null);
        }}
        onSubmit={handleUpdateDepartment}
        isLoading={isSubmitting}
      />
    </div>
  );
}
