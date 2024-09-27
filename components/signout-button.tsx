import { Button } from "@nextui-org/button";

import { signOut } from "@/auth";

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button className="w-full" color="danger" type="submit">
        Выйти
      </Button>
    </form>
  );
}
