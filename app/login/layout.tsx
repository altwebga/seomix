import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user.role === "ADMIN") {
    redirect("/admin");
    return null; // Чтобы остановить рендеринг
  }

  if (session) {
    redirect("/dashboard");
    return null; // Чтобы остановить рендеринг
  }

  // Рендер только если нет сессии
  return <div>{children}</div>;
}
