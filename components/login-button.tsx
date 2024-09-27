import { Button } from "@nextui-org/button";

import { signIn } from "@/auth";

export function LoginButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("yandex");
      }}
    >
      <Button type="submit">Signin with Yandex</Button>
    </form>
  );
}