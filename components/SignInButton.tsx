import { Button } from "@nextui-org/button";

import { signIn } from "@/config/auth";

export function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("yandex");
      }}
    >
      <Button color="primary" type="submit">
        Войти через Яндекс
      </Button>
    </form>
  );
}
