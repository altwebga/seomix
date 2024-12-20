import { signOut } from "@/auth";
import { Button } from "../ui/button";
export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit" variant={"destructive"}>
        Sign Out
      </Button>
    </form>
  );
}
