import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
export default async function LoginPage() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div>
      <h1>Войти в ЛК</h1>
      <form
        action={async () => {
          "use server";
          await signIn("yandex");
        }}
      >
        <Button type="submit">Войти через Яндекс</Button>
      </form>
    </div>
  );
}
