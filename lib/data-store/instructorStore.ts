import { IInstructor } from "@/types/index";

const instructors: IInstructor[] = [
  {
    _id: "1",
    name: "Jumar Bibal",
    departmentId: "3",
    status: "Part-Time",
  },
  {
    _id: "2",
    name: "Kyla Sinforoso",
    departmentId: "2",
    status: "Part-Time",
  },
  {
    _id: "3",
    name: "Anjelah Bobiles",
    departmentId: "1",
    status: "Part-Time",
  },
  {
    _id: "4",
    name: "Khian Carasicas",
    departmentId: "3",
    status: "Part-Time",
  },
  {
    _id: "5",
    name: "Prince Olaguera",
    departmentId: "10",
    status: "Full-Time",
  },
  {
    _id: "6",
    name: "John Lloyd Besmonte",
    departmentId: "6",
    status: "Full-Time",
  },
  {
    _id: "7",
    name: "Mark Daniel Bragais",
    departmentId: "7",
    status: "Full-Time",
  },
  {
    _id: "8",
    name: "Roel Albert Villaluz",
    departmentId: "4",
    status: "Full-Time",
  },
  {
    _id: "9",
    name: "Guilan Josh Miranda",
    departmentId: "9",
    status: "Full-Time",
  },
  {
    _id: "10",
    name: "Ar-Jay Conradez",
    departmentId: "5",
    status: "Full-Time",
  },
  {
    _id: "11",
    name: "Leonard Hilig",
    departmentId: "2",
    status: "Full-Time",
  },
  {
    _id: "12",
    name: "Vince Lander",
    departmentId: "3",
    status: "Full-Time",
  },
  {
    _id: "13",
    name: "Shane Jude Ballon",
    departmentId: "8",
    status: "Full-Time",
  },
  {
    _id: "14",
    name: "Ysahmuel Andrei Honra",
    departmentId: "11",
    status: "Full-Time",
  },
  {
    _id: "15",
    name: "Khen Nuarin",
    departmentId: "4",
    status: "Full-Time",
  },
];

export function getInstructors() {
  return [...instructors];
}

export function addInstructor(instructor: Omit<IInstructor, "id">): IInstructor {
  const newInstructor = { ...instructor, _id: Date.now().toString() }
  instructors.push(newInstructor)
  return newInstructor
}

export function updateInstructor(id: string, updates: Partial<IInstructor>): IInstructor | null {
  const index = instructors.findIndex((i) => i._id === id)
  if (index === -1) return null
  instructors[index] = { ...instructors[index], ...updates }
  return instructors[index]
}

export function deleteInstructor(id: string): boolean {
  const index = instructors.findIndex((i) => i._id === id)
  if (index === -1) return false
  instructors.splice(index, 1)
  return true
}

export function getInstructorById(id: string) {
  return instructors.find((i) => i._id === id)
}