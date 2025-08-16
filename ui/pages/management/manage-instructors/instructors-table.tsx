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
import { InstructorForm } from "./instructor-form";
import { IDepartment, IInstructor } from "@/types/index";
import { getInstructors } from "@/lib/data-store/instructorStore";
import { getDepartments } from "@/services/departmentService";

export default function InstructorsTable() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingInstructor, setEditingInstructor] =
    useState<IInstructor | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [instructors, setInstructors] = useState<IInstructor[]>([]);
  const [departments, setDepartments] = useState<IDepartment[]>([]);

  const loadData = () => {
    setInstructors(getInstructors());
    setDepartments(getDepartments());
  };

  useEffect(() => {
    loadData();
  }, []);

  const getDepartmentName = (departmentId: string) => {
    const dept = departments.find((d) => d._id === departmentId);
    return dept ? dept.name : "Unknown";
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
        return getDepartmentName(departmentId);
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
                  setEditingInstructor(instructor);
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

  const handleAddInstructor = async (instructorData: IInstructor) => {
    try {
      setIsSubmitting(true);
      // const response = await fetch("/api/persons", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(instructorData),
      // })

      // if (!response.ok) {
      //   const error = await response.json()
      //   throw new Error(error.error || "Failed to create person")
      // }

      // const newPerson = await response.json()
      // setData((prev) => [...prev, newPerson])
      // toast({
      //   title: "Success",
      //   description: "Person created successfully",
      // })
    } catch (error) {
      console.error("Error creating person:", error);
      // toast({
      //   title: "Error",
      //   description: error instanceof Error ? error.message : "Failed to create person",
      //   variant: "destructive",
      // })
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateInstructor = async (personData: IInstructor) => {
    if (!editingInstructor) return;

    try {
      setIsSubmitting(true);
      // const response = await fetch(`/api/persons/${editingPerson.id}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(personData),
      // })

      // if (!response.ok) {
      //   const error = await response.json()
      //   throw new Error(error.error || "Failed to update person")
      // }

      // const updatedPerson = await response.json()
      // setData((prev) => prev.map((p) => (p.id === editingPerson.id ? updatedPerson : p)))
      // setEditingPerson(null)
      // toast({
      //   title: "Success",
      //   description: "Person updated successfully",
      // })
    } catch (error) {
      console.error("Error updating person:", error);
      // toast({
      //   title: "Error",
      //   description: error instanceof Error ? error.message : "Failed to update person",
      //   variant: "destructive",
      // })
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-3">
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
            <DataTable.DeleteSelected />
            {/* Add Button */}
            <Button variant="default" onClick={() => setIsAddDialogOpen(true)}>
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

      {/* Create Dialog */}
      <InstructorForm
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddInstructor}
        isLoading={isSubmitting}
      />

      {/* Edit Dialog */}
      <InstructorForm
        instructor={editingInstructor || undefined}
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setEditingInstructor(null);
        }}
        onSubmit={handleUpdateInstructor}
        isLoading={isSubmitting}
      />
    </div>
  );
}
