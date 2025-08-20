// import { Types } from "mongoose"; // Replace string with Types.ObjectId, if database is used

export interface IDepartment {
  _id?: string;
  name: string; // e.g., "Information Technology", "Hospitality Management"
}

export interface IInstructor {
  _id?: string;
  name: string; // e.g., "Lebrawn Hayme"
  departmentId: string; // ID of the department this instructor belongs to
  status: "Full-Time" | "Part-Time";
}

export interface IAcademicLevel {
  _id: string;
  code: string; // e.g., "JHS", "SHS", "TER"
  name: string; // e.g., "Junior High School", "Senior High School", "Tertiary"
}

export interface IRoom {
  _id?: string;
  name: string; // e.g., "Room 101", "Lab A", "Gym 1"
  type: "Lecture" | "Laboratory";
}

export interface ICourse {
  _id?: string;
  code: string; // e.g., "BSIT", "BSA", "BSED", "JHS-GL"
  name: string; // e.g., "Bachelor of Science in Information Technology", "Bachelor of Science in Accountancy", "Bachelor of Secondary Education", "Junior High School Grade Levels"
  academicLevelId: string; // ID of the academic level this course belongs to
  yearLevels: IYearLevel[]; // Array of year levels, e.g., [{ _id: "1", name: "1st Year", code: "Y1" }, { _id: "2", name: "Grade 7", code: "G7" }]
}

// wag mo na to lagyan ng service tas data store
// only represents in a course
export interface IYearLevel {
  _id?: string;
  name: string;
  code: string;
}

export interface ISection {
  _id?: string;
  name: string; // e.g., "BSIT101A", "MWA101A"
  academicLevelId: string; // ID of the academic level this section belongs to
  courseId: string; // ID of the course this section belongs to
}

export interface ISubject {
  _id?: string;
  code: string; // e.g., "CS101", "MATH101", "ENG101"
  title: string; // e.g., "Introduction to Computer Science", "Calculus I", "English Literature"
  type: "Lecture" | "Laboratory";
  units: number; // e.g., 3 for lecture, 1 for laboratory
  academicLevelId: string; // ID of the academic level this subject belongs to
  courseId: string; // ID of the course this subject belongs to
  semester: string; // e.g., "1st Semester", "2nd Semester"
}

