import { IDepartment } from "@/types";
import { getDepartmentStore } from "@/lib/data-store/departmentStore";

export function getDepartments(): IDepartment[] {
  return [...getDepartmentStore()];
}

export function getDepartmentById(id: string): IDepartment | undefined {
  const departments = getDepartmentStore();
  return departments.find((department) => department._id === id);
}

export function addDepartment(
  department: Omit<IDepartment, "_id">
): IDepartment {
  const newDepartment = { ...department, _id: Date.now().toString() };
  getDepartmentStore().push(newDepartment);
  return newDepartment;
}

export function updateDepartment(
  id: string,
  updates: Partial<IDepartment>
): IDepartment | null {
  const departments = getDepartmentStore();
  const index = departments.findIndex((department) => department._id === id);
  if (index === -1) return null;
  departments[index] = { ...departments[index], ...updates };
  return departments[index];
}

export function deleteDepartment(id: string): boolean {
  const departments = getDepartmentStore();
  const index = departments.findIndex((department) => department._id === id);
  if (index === -1) return false;
  departments.splice(index, 1);
  return true;
}
