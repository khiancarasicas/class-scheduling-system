// lib/data-store.ts
import bcrypt from "bcryptjs";

export type User = {
  id: string;
  username: string;
  passwordHash: string;
};

// 🔹 Mock database (in-memory)
const users: User[] = [];

// Create a user (hash password before saving)
export async function createUser(username: string, password: string): Promise<User> {
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: String(users.length + 1),
    username,
    passwordHash,
  };
  users.push(newUser);
  return newUser;
}

// Find user by username
export function findUserByUsername(username: string): User | undefined {
  return users.find((u) => u.username === username);
}
