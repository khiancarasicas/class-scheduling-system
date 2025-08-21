import { IScheduleOfInstructor } from "@/types";
import { getScheduledOfInstructorStore } from "@/lib/data-store/scheduleOfInstructorStore";

export function getScheduledOfInstructors(): IScheduleOfInstructor[] {
  return [...getScheduledOfInstructorStore()];
}

export function getScheduledOfInstructorById(
  id: string
): IScheduleOfInstructor | undefined {
  const scheduledOfInstructors = getScheduledOfInstructorStore();
  return scheduledOfInstructors.find((item) => item._id === id);
}

export function addScheduledOfInstructor(
  scheduledOfInstructor: Omit<IScheduleOfInstructor, "_id">
): IScheduleOfInstructor {
  const newScheduledOfInstructor = {
    ...scheduledOfInstructor,
    _id: Date.now().toString(),
  };
  getScheduledOfInstructorStore().push(newScheduledOfInstructor);
  return newScheduledOfInstructor;
}

export function updateScheduledOfInstructor(
  id: string,
  updates: Partial<IScheduleOfInstructor>
): IScheduleOfInstructor | null {
  const scheduledOfInstructors = getScheduledOfInstructorStore();
  const index = scheduledOfInstructors.findIndex((item) => item._id === id);
  if (index === -1) return null;
  scheduledOfInstructors[index] = {
    ...scheduledOfInstructors[index],
    ...updates,
  };
  return scheduledOfInstructors[index];
}

export function deleteScheduledOfInstructor(id: string): boolean {
  const scheduledOfInstructors = getScheduledOfInstructorStore();
  const index = scheduledOfInstructors.findIndex((item) => item._id === id);
  if (index === -1) return false;
  scheduledOfInstructors.splice(index, 1);
  return true;
}
