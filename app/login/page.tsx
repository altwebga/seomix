import { SignInButton } from "@/components/SignInButton";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
export default async function LoginPage() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-64">
      <h1 className="mb-4">Войти на сайт</h1>
      <SignInButton />
    </div>
  );
}
