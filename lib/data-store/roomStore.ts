import { IRoom } from "@/types";

const rooms: IRoom[] = [
  { _id: "1", name: "Room 201", type: "Lecture" },
  { _id: "2", name: "Room 202", type: "Lecture" },
  { _id: "3", name: "Lab A", type: "Laboratory" },
  { _id: "4", name: "Gym 1", type: "Lecture" },
  { _id: "5", name: "Gym 2", type: "Lecture" },
];

export function getRoomStore() {
  return rooms;
}