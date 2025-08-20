import { useState } from "react";
import { toast } from "sonner"; // or your toast library

type CrudHandlers<T> = {
  addItem: (data: T) => Promise<boolean> | boolean;
  updateItem: (id: string, data: Partial<T>) => Promise<boolean> | boolean;
  deleteItem: (id: string) => Promise<boolean> | boolean;
  validate?: (data: Partial<T>) => string | null; // return error message if invalid
  entityName: string;
  reload: () => void;
};

export function useCrud<T>({
  addItem,
  updateItem,
  deleteItem,
  validate,
  entityName,
  reload,
}: CrudHandlers<T>) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdd = async (data: T) => {
    setIsSubmitting(true);
    try {
      const validationError = validate?.(data);
      if (validationError) {
        toast.error(validationError);
        return;
      }

      const success = await addItem(data);
      if (success) {
        toast.success(`${entityName} added successfully`);
        reload();
      } else {
        toast.error(`Failed to add ${entityName.toLowerCase()}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (id: string, data: Partial<T>) => {
    setIsSubmitting(true);
    try {
      const validationError = validate?.(data);
      if (validationError) {
        toast.error(validationError);
        return;
      }

      const success = await updateItem(id, data);
      if (success) {
        toast.success(`${entityName} updated successfully`);
        reload();
      } else {
        toast.error(`Failed to update ${entityName.toLowerCase()}`);
      }
    } catch (error) {
      toast.error(`Error updating ${entityName.toLowerCase()}`);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      if (!id) {
        toast.error(`Error deleting ${entityName.toLowerCase()}`);
        return;
      }
      const success = await deleteItem(id);
      if (success) {
        toast.success(`${entityName} deleted successfully`);
        reload();
      } else {
        toast.error(`Failed to delete ${entityName.toLowerCase()}`);
      }
    } catch (error) {
      toast.error(`Error deleting ${entityName.toLowerCase()}`);
      console.error(error);
    }
  };

  return { isSubmitting, handleAdd, handleUpdate, handleDelete };
}
