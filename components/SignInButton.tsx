import { signIn } from "@/lib/auth";
import { Button } from "./ui/button";

export function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("yandex");
      }}
    >
      <Button variant="outline" type="submit">
        Войти через Яндекс
      </Button>
    </form>
  );
}
