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
import { IDepartment } from "@/types";
import { useState } from "react";

interface IDepartmentFormProps {
  department?: IDepartment;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IDepartment) => Promise<void>;
  isLoading?: boolean;
}

export function DepartmentForm({
  department,
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: IDepartmentFormProps) {
  const [formData, setFormData] = useState<IDepartment>({
    _id: department?._id || "",
    name: department?.name || "",
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

  const handleChange = (field: keyof IDepartment, value: string) => {
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
            {department ? "Edit Department" : "Add New Department"}
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
              {isLoading ? "Saving..." : department ? "Update" : "Add Department"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
