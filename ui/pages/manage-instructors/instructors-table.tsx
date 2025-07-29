"use client";

import { DataTable } from "@/ui/components/data-table";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleAlertIcon,
  CircleXIcon,
  Columns3Icon,
  EllipsisIcon,
  FilterIcon,
  Icon,
  ListFilterIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { cn } from "@/shadcn/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/components/ui/alert-dialog";
import { Badge } from "@/shadcn/components/ui/badge";
import { Button } from "@/shadcn/components/ui/button";
import { Checkbox } from "@/shadcn/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";
import { Input } from "@/shadcn/components/ui/input";
import { Label } from "@/shadcn/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/shadcn/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";
import { Card } from "@/shadcn/components/ui/card";
import { ScrollArea, ScrollBar } from "@/shadcn/components/ui/scroll-area";
import { InstructorForm } from "./instructor-form";
import { IInstructor } from "@/types/instructor";

// const departmentFilterFn: FilterFn<Instructor> = (
//   row,
//   columnId,
//   filterValue: string[]
// ) => {
//   if (!filterValue?.length) return true;
//   const department = row.getValue(columnId) as string;
//   return filterValue.includes(department);
// };

// const statusFilterFn: FilterFn<Instructor> = (
//   row,
//   columnId,
//   filterValue: string[]
// ) => {
//   if (!filterValue?.length) return true;
//   const status = row.getValue(columnId) as string;
//   return filterValue.includes(status);
// };

export default function InstructorsTable() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingInstructor, setEditingInstructor] =
    useState<IInstructor | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      accessorKey: "department",
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

  // FETCH SAMPLE DATA FROM GITHUB
  const [data, setData] = useState<IInstructor[]>([]);
  useEffect(() => {
    async function fetchInstructors() {
      const res = await fetch(
        "https://raw.githubusercontent.com/khiancarasicas/scheduling-data-test/refs/heads/main/instructors.json"
      );
      const data = await res.json();
      setData(data);
    }
    fetchInstructors();
  }, []);

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
    <div className="space-y-4 mt-2">
      <DataTable data={data} columns={columns}>
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <DataTable.Search
              column="name"
              placeholder="Search instructors..."
              className="max-w-sm"
            />
            <DataTable.Filter
              column="department"
              placeholder="All departments"
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
