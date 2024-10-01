import { redirect } from "next/navigation";

import { auth } from "@/config/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="inline-block max-w-lg text-center justify-center">
      {children}
    </div>
  );
}
