import { ISection } from "@/types/index";

const sections: ISection[] = [
  {
    _id: "1",
    name: "Grade10-A",
    academicLevelId: "1",
    courseId: "1",
    yearLevelId: "4",
  },
  {
    _id: "2",
    name: "Grade7-B",
    academicLevelId: "1",
    courseId: "1",
    yearLevelId: "1",
  },
  {
    _id: "3",
    name: "BSHM 401B",
    academicLevelId: "3",
    courseId: "6",
    yearLevelId: "4",
  },
  {
    _id: "4",
    name: "BSCPE101C",
    academicLevelId: "3",
    courseId: "8",
    yearLevelId: "1",
  },
  {
    _id: "5",
    name: "BSBM201A",
    academicLevelId: "3",
    courseId: "9",
    yearLevelId: "2",
  },
  {
    _id: "6",
    name: "STEM11-B",
    academicLevelId: "2",
    courseId: "2",
    yearLevelId: "1",
  },
  {
    _id: "7",
    name: "HUMSS12-A",
    academicLevelId: "2",
    courseId: "4",
    yearLevelId: "2",
  },

  {
    _id: "8",
    name: "GAS11-A",
    academicLevelId: "2",
    courseId: "5",
    yearLevelId: "2",
  },
];

export function getSectionStore() {
  return sections;
}
