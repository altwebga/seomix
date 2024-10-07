import { auth } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await auth();
  if (!session) {
    return null;
  }
  return (
    <div>
      <h1>Профиль</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
