import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session || !session.user || session.user.role !== "admin") {
    redirect("/");
    return null;
  }
  return <>{children}</>;
}