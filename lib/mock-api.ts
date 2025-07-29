import { mockInstructors } from "@/data/mock-instructors";

export const getInstructors = (): Promise<typeof mockInstructors> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockInstructors), 1000);
  });
};
