import { auth } from "@/auth";
import AdminNav from "@/components/AdminNav";
import { redirect } from "next/navigation";
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session || session?.user?.role !== "admin") {
    redirect("/");
  }
  return (
    <>
      <AdminNav />
      <main className="px-4 mt-4 flex-grow"> {children}</main>
    </>
  );
}
