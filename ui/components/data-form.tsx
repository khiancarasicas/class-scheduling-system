"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shadcn/components/ui/dialog";
import { Button } from "@/shadcn/components/ui/button";
import { Input } from "@/shadcn/components/ui/input";
import { Label } from "@/shadcn/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/components/ui/select";
import React from "react";

// ------------------------------------
// Base provider
// ------------------------------------
interface DataFormProps<T> {
  item?: T;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: T) => Promise<void> | void;
  isLoading?: boolean;
  title?: { add: string; edit: string };
  children: ReactNode;
}

function DataFormBase<T extends { _id?: string }>({
  item,
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  title = { add: "Add Item", edit: "Edit Item" },
  children,
}: DataFormProps<T>) {
  const [formData, setFormData] = useState<T>(item || ({} as T));

  useEffect(() => {
    setFormData(item || ({} as T));
  }, [item, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item ? title.edit : title.add}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Fields (compound children) */}
          {children &&
            React.Children.map(children, (child) =>
              React.isValidElement(child)
                ? React.cloneElement(child as React.ReactElement<any>, {
                    formData,
                    setFormData,
                    isLoading,
                  })
                : child
            )}

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
                : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ------------------------------------
// Compound subcomponents
// ------------------------------------
interface FieldProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  formData?: any;
  setFormData?: (fn: any) => void;
  isLoading?: boolean;
}

function DataFormInput({
  name,
  label,
  placeholder,
  required,
  disabled,
  formData,
  setFormData,
  isLoading,
}: FieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        value={formData?.[name] || ""}
        onChange={(e) =>
          setFormData?.((prev: any) => ({ ...prev, [name]: e.target.value }))
        }
        placeholder={placeholder}
        disabled={disabled || isLoading}
        required={required}
      />
    </div>
  );
}

interface SelectProps extends FieldProps {
  options: { value: string; label: string }[];
}

function DataFormSelect({
  name,
  label,
  options,
  required,
  disabled,
  formData,
  setFormData,
  isLoading,
}: SelectProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Select
        value={formData?.[name] || ""}
        onValueChange={(value) =>
          setFormData?.((prev: any) => ({ ...prev, [name]: value }))
        }
        disabled={disabled || isLoading}
        required={required}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// ------------------------------------
// Export as compound component
// ------------------------------------
export const DataForm = Object.assign(DataFormBase, {
  Input: DataFormInput,
  Select: DataFormSelect,
});
