import { IScheduleOfInstructor } from "@/types";

const scheduledOfInstructors: IScheduleOfInstructor[] = [
  {
    _id: "1",
    assginedSubjectId: "1",
    instructorId: "5",
  },
  {
    _id: "2",
    assginedSubjectId: "2",
    instructorId: "3",
  },
  {
    _id: "3",
    assginedSubjectId: "3",
    instructorId: "1",
  },
  {
    _id: "4",
    assginedSubjectId: "4",
    instructorId: "12",
  },
  {
    _id: "5",
    assginedSubjectId: "5",
    instructorId: "10",
  },
  {
    _id: "6",
    assginedSubjectId: "6",
    instructorId: "4",
  },
  {
    _id: "7",
    assginedSubjectId: "7",
    instructorId: "2",
  },
  {
    _id: "8",
    assginedSubjectId: "8",
    instructorId: "6",
  },
];

export function getScheduledOfInstructorStore() {
  return scheduledOfInstructors;
}
