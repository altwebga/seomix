import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";

import { auth } from "@/auth";
import { DashboardNav } from "@/components/dashboard-nav";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <SessionProvider>
      <DashboardNav />
      <main>{children}</main>
    </SessionProvider>
  );
}
