"use client";

import { getDepartments } from "@/services/departmentService";
import { Button } from "@/shadcn/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shadcn/components/ui/dialog";
import { Input } from "@/shadcn/components/ui/input";
import { Label } from "@/shadcn/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/components/ui/select";
import { IDepartment, IInstructor } from "@/types";
import { useEffect, useState } from "react";

interface IInstructorFormProps {
  instructor?: IInstructor;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    _id?: string;
    name: string;
    departmentId: string;
    status: "Full-Time" | "Part-Time";
  }) => Promise<void> | void;
  isLoading?: boolean;
}

export function InstructorForm({
  instructor,
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: IInstructorFormProps) {
  const [loadingDepartments, setLoadingDepartments] = useState(true);
  const [formData, setFormData] = useState<{
    name: string;
    departmentId: string;
    status: "Full-Time" | "Part-Time";
  }>({
    name: "",
    departmentId: "",
    status: "Full-Time",
  });
  const [departments, setDepartments] = useState<IDepartment[]>([]);

  const loadData = () => {
    setLoadingDepartments(true);
    setTimeout(() => {
      // simulate slow API call
      setDepartments(getDepartments());
      setLoadingDepartments(false);
    }, 800);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Reset form when dialog opens or instructor changes
  useEffect(() => {
    if (instructor) {
      setFormData({
        name: instructor.name,
        departmentId: instructor.departmentId,
        status: instructor.status,
      });
    } else {
      setFormData({
        name: "",
        departmentId: "",
        status: "Full-Time",
      });
    }
  }, [instructor, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(
        instructor
          ? { _id: instructor._id, ...formData } // edit mode
          : formData // add mode
      );
      onClose();
    } catch (error) {
      console.error("Error submitting instructor:", error);
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {instructor ? "Edit Instructor" : "Add New Instructor"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter name"
              disabled={isLoading}
              required
            />
          </div>

          {/* Department */}
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select
              value={formData.departmentId}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, departmentId: value }))
              }
              required
              disabled={loadingDepartments}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder= {loadingDepartments ? "Loading departments..." : "Select department"} />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept._id ?? ""} value={dept._id ?? ""}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                handleChange("status", value as "Full-Time" | "Part-Time")
              }
              disabled={isLoading}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  key="Full-Time"
                  value="Full-Time"
                >
                  Full-Time
                </SelectItem>
                <SelectItem
                  key="Part-Time"
                  value="Part-Time"
                >
                  Part-Time
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Footer */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? "Saving..."
                : instructor
                ? "Update"
                : "Add Instructor"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
