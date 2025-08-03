import { IDepartment } from "@/types/index";

const departments: IDepartment[] = [
  { _id: "1", name: "Hospitality Management" },
  { _id: "2", name: "Information Technology" },
  { _id: "3", name: "Engineering" },
  { _id: "4", name: "Business and Management" },
  { _id: "5", name: "English" },
  { _id: "6", name: "Mathematics" },
  { _id: "7", name: "Physical Education" },
  { _id: "8", name: "Accounting" },
  { _id: "9", name: "Social and Behavioral Science" },
  { _id: "10", name: "Law" },
  { _id: "11", name: "Foreign Language" },
];

export function getDepartments() {
  // return new Promise<IDepartment[]>((resolve) => {
  //   setTimeout(() => {
  //     resolve(mockDepartments);
  //   }, 1000); // Simulate network delay
  // });

  return [...departments]
}

export function getDepartmentById(id: string) {
  return departments.find((dept) => dept._id === id);
}

export function addDepartment(dept: Omit<IDepartment, "id">): IDepartment {
  const newDept = { ...dept, _id: Date.now().toString() }
  departments.push(newDept)
  return newDept
}