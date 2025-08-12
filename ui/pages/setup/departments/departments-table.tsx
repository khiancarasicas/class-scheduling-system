"use client";

import { DataTable } from "@/ui/components/data-table";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisIcon, PlusIcon } from "lucide-react";
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
import { getInstructors } from "@/lib/data-store/instructors";
import { getDepartments } from "@/lib/data-store/departments";

export default function DepartmentsTable() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] =
    useState<IDepartment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [departments, setDepartments] = useState<IDepartment[]>([]);

  const loadData = () => {
    setDepartments(getDepartments());
  };

  useEffect(() => {
    loadData();
  }, []);

  const getDepartmentName = (departmentId: string) => {
    const dept = departments.find((d) => d._id === departmentId);
    return dept ? dept.name : "Unknown";
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
      header: "Name",
      accessorKey: "name",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
      enableHiding: false,
      // enableSorting: true,
    },
    {
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => {
        const instructor = row.original;

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
                  setEditingDepartment(instructor);
                  setIsEditDialogOpen(true);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableHiding: false,
    },
  ];

  const handleAddDepartment = async (instructorData: IDepartment) => {
    try {
      setIsSubmitting(true);
      // logic to submit the new department data
      // For example, you might call an API to create the department
    } catch (error) {
      console.error("Error adding department:", error);
      // on error, might want to show a toast or alert
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateDepartment = async (personData: IDepartment) => {
    if (!editingDepartment) return;

    try {
      setIsSubmitting(true);
      // logic to update the existing department data
      // For example, you might call an API to update the department
    } catch (error) {
      console.error("Error updating department:", error);
      // on error, might want to show a toast or alert
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-3">
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
            <DataTable.DeleteSelected />
            {/* Add Button */}
            <Button variant="default" onClick={() => setIsAddDialogOpen(true)}>
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
