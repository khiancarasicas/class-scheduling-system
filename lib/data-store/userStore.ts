import { IUser } from "@/types";
import bcrypt from "bcryptjs";

const users: IUser[] = [];

// Create a user (hash password before saving)
async function registerUser(username: string, password: string): Promise<IUser> {
  const users = getUserStore();
  const exists = users.find(u => u.username === username);
  if (exists) throw new Error("User already exists");

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser: IUser = { _id: Date.now().toString(), username, passwordHash };
  users.push(newUser);
  return newUser;
}

registerUser("admin", "admin123");

// Find user by username
// export function findUserByUsername(username: string): IUser | undefined {
//   return users.find((u) => u.username === username);
// }

export function getUserStore() {
  return users;
}
