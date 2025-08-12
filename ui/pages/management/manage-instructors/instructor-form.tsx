"use client"

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
import { IInstructor } from "@/types";
import { useState } from "react";

interface IInstructorFormProps {
  instructor?: IInstructor;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IInstructor) => Promise<void>;
  isLoading?: boolean;
}

export function InstructorForm({
  instructor,
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: IInstructorFormProps) {
  const [formData, setFormData] = useState<IInstructor>({
    _id: instructor?._id || "",
    name: instructor?.name || "",
    departmentId: instructor?.departmentId || "",
    status: instructor?.status || "Full-Time",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (!validateForm()) {
    //   return;
    // }

    // try {
    //   await onSubmit(formData);
    //   onClose();
    //   // Reset form
    //   // Only reset form if creating (not editing)
    //   if (!person) {
    //     setFormData({
    //       name: "",
    //       email: "",
    //       status: "active",
    //       role: "user",
    //     });
    //   }
    //   setErrors({});
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    // }
  };

  const handleChange = (field: keyof IInstructor, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    // if (errors[field]) {
    //   setErrors((prev) => ({ ...prev, [field]: undefined }));
    // }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {instructor ? "Edit Instructor" : "Add New Instructor"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter name"
              disabled={isLoading}
              required
            />
            {/* {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )} */}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="department">Department</Label>
            <Input
              id="department"
              value={formData.departmentId}
              onChange={(e) => handleChange("departmentId", e.target.value)}
              placeholder="Enter name"
              disabled={isLoading}
              required
            />
          </div>

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
              {isLoading ? "Saving..." : instructor ? "Update" : "Add Instructor"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
