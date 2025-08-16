"use client";

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
import { useEffect, useState } from "react";

interface IDepartmentFormProps {
  department?: IDepartment;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IDepartment) => Promise<void> | void;
  isLoading?: boolean;
}

export function DepartmentForm({
  department,
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: IDepartmentFormProps) {
  const [formData, setFormData] = useState<IDepartment>({ name: "" });

  useEffect(() => {
    if (department) {
      setFormData({ name: department.name });
    } else {
      setFormData({ name: "" });
    }
  }, [department, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(
        department
          ? { _id: department._id, name: formData.name } // edit
          : formData // add
      );
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {department ? "Edit Department" : "Add New Department"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ name: e.target.value })}
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
              {isLoading
                ? "Saving..."
                : department
                ? "Update"
                : "Add Department"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
