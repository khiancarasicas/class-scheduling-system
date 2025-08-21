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
      <DialogContent className="max-h-[90vh] overflow-y-auto">
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
              {isLoading ? "Saving..." : "Save"}
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
// Array input (special field)
// ------------------------------------
interface ArrayInputProps {
  name: string;
  label: string;
  fields: { name: string; placeholder?: string }[]; // fields of object
  formData?: any;
  setFormData?: (fn: any) => void;
}

function DataFormArrayInput({
  name,
  label,
  fields,
  formData,
  setFormData,
}: ArrayInputProps) {
  const [tempItem, setTempItem] = useState<any>({});

  const handleAdd = () => {
    if (!setFormData) return;
    setFormData((prev: any) => ({
      ...prev,
      [name]: [
        ...(prev[name] || []),
        { ...tempItem, _id: Date.now().toString() },
      ],
    }));
    setTempItem({});
  };

  const handleDelete = (id: string) => {
    setFormData?.((prev: any) => ({
      ...prev,
      [name]: prev[name]?.filter((i: any) => i._id !== id),
    }));
  };

  const handleEdit = (id: string, key: string, value: string) => {
    setFormData?.((prev: any) => ({
      ...prev,
      [name]: prev[name]?.map((i: any) =>
        i._id === id ? { ...i, [key]: value } : i
      ),
    }));
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2">
        {fields.map((f) => (
          <Input
            key={f.name}
            placeholder={f.placeholder}
            value={tempItem[f.name] || ""}
            onChange={(e) =>
              setTempItem((prev: any) => ({
                ...prev,
                [f.name]: e.target.value,
              }))
            }
          />
        ))}
        <Button type="button" onClick={handleAdd} size="sm">
          Add
        </Button>
      </div>

      {/* List of added items */}
      <div className="space-y-2 mt-2">
        {(formData?.[name] || []).map((item: any) => (
          <div
            key={item._id}
            className="flex items-center gap-2 border rounded p-2"
          >
            {fields.map((f) => (
              <Input
                key={f.name}
                value={item[f.name]}
                onChange={(e) => handleEdit(item._id, f.name, e.target.value)}
              />
            ))}
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------
// Export as compound component
// ------------------------------------
export const DataForm = Object.assign(DataFormBase, {
  Input: DataFormInput,
  Select: DataFormSelect,
  ArrayInput: DataFormArrayInput,
});
