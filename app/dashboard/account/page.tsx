import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1>Аккаунт</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
