import { IScheduleOfInstructor } from "@/types";

const scheduledOfInstructors: IScheduleOfInstructor[] = [
  {
    _id: "1",
    scheduledSubject: "1",
    instructorId: "5",
  },
  {
    _id: "2",
    scheduledSubject: "2",
    instructorId: "3",
  },
  {
    _id: "3",
    scheduledSubject: "3",
    instructorId: "1",
  },
  {
    _id: "4",
    scheduledSubject: "4",
    instructorId: "12",
  },
  {
    _id: "5",
    scheduledSubject: "5",
    instructorId: "10",
  },
  {
    _id: "6",
    scheduledSubject: "6",
    instructorId: "4",
  },
  {
    _id: "7",
    scheduledSubject: "7",
    instructorId: "2",
  },
  {
    _id: "8",
    scheduledSubject: "8",
    instructorId: "6",
  },
];

export function getScheduledOfInstructorStore() {
  return scheduledOfInstructors;
}
