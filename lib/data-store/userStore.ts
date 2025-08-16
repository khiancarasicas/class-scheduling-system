// lib/data-store.ts
import bcrypt from "bcryptjs";

export interface IUser {
  id: string;
  username: string;
  passwordHash: string;
};

// 🔹 Mock database (in-memory)
const users: IUser[] = [];

// Create a user (hash password before saving)
export async function createUser(username: string, password: string): Promise<IUser> {
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser: IUser = {
    id: String(users.length + 1),
    username,
    passwordHash,
  };
  users.push(newUser);
  return newUser;
}

// Find user by username
export function findUserByUsername(username: string): IUser | undefined {
  return users.find((u) => u.username === username);
}
