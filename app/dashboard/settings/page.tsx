import { title } from "@/components/primitives";
import { auth } from "@/auth";
export default async function SettingsPage() {
  const session = await auth();

  return (
    <div>
      <h1 className={title()}>Настройки</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
