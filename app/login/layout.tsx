import { redirect } from "next/navigation";

import { auth } from "@/auth";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session) {
    redirect("/dashboard"); // Редирект до рендера страницы
  }

  // Если сессии нет, продолжаем рендерить компонент
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      {children}
    </div>
  );
}
