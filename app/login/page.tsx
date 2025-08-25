import { LoginForm } from "@/shadcn/components/login-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; 

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/home");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
