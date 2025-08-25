import bcrypt from "bcryptjs";
import { IUser } from "@/types";
import { getUserStore } from "@/lib/data-store/userStore";

export async function authenticateUser(
  username: string,
  password: string
): Promise<IUser | null> {
  const users = getUserStore();
  const user = users.find((u) => u.username === username);
  if (!user) return null;

  const valid = await bcrypt.compare(password, user.passwordHash);
  return valid ? user : null;
}

export function getUserById(id: string): IUser | undefined {
  return getUserStore().find((u) => u._id === id);
}
