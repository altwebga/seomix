import { UserRole } from "@prisma/client";
import { auth } from "@/auth";
import { EditProfileForm } from "@/components/edit-profile-form";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const userRole = session.user.role as UserRole; // Приведение типа к UserRole
  const isAdmin = userRole === "admin";
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1>Аккаунт</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <EditProfileForm
        name={session.user.name || ""}
        email={session.user.email || ""}
        role={userRole}
        isAdmin={isAdmin}
      />
    </div>
  );
}
