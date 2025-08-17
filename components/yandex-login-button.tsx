import { signIn } from "@/auth";
import { Button } from "./ui/button";

export function YandexLoginButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("yandex", { redirectTo: "/dashboard" });
      }}
    >
      <Button type="submit" variant={"outline"}>
        Войти через Яндекс
      </Button>
    </form>
  );
}
