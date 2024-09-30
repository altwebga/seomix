import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { DashboardNav } from "@/components/dashboard-nav";
import { UserAvatar } from "@/components/user-avatar";
import { SignOutButton } from "@/components/signout-button";

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
    <div className="flex flex-row gap-2">
      <aside className="fixed inset-0 w-64 p-4 border-r-1 border-default-300 space-y-4 flex flex-col justify-between h-screen">
        <div className="mt-16 space-y-4">
          <UserAvatar />
          <DashboardNav />
        </div>
        <SignOutButton />
      </aside>
      <main className="ml-72 pt-4">{children}</main>
    </div>
  );
}
