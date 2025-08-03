// import { Types } from "mongoose";

export interface IDepartment {
  _id: string;
  name: string;
}

export interface IInstructor {
  _id: string;
  name: string;
  departmentId: string; // Replace string with Types.ObjectId 
  status: "Full-Time" | "Part-Time";
}