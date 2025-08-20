// import { Types } from "mongoose";

export interface IDepartment {
  _id?: string;
  name: string;
}

export interface IInstructor {
  _id?: string;
  name: string;
  departmentId: string; // Replace string with Types.ObjectId, if database is used
  status: "Full-Time" | "Part-Time";
}

export interface IAcademicLevel {
  _id: string;
  code: string;
  name: string;
}

export interface IRoom {
  _id?: string;
  name: string;
  type: "Lecture" | "Laboratory";
}

export interface ICourse {
  _id?: string;
  code: string;
  name: string;
  academicLevelId: string; // Replace string with Types.ObjectId, if database is used
  yearLevels: IYearLevel[]; // Array of year levels
}

export interface IYearLevel {
  _id?: string;
  name: string;
  code: string;
}

// dagdagan ko nalang pag may naisip na ko