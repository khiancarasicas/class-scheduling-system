import { Types } from "mongoose";

export interface IInstructor {
  _id: string;
  name: string;
  department: Types.ObjectId;
  status: "Full-Time" | "Part-Time";
}
