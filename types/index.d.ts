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

