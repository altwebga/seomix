import { SignInButton } from "@/components/SignInButton";
import { title } from "@/components/primitives";

export default async function LoginPage() {
  return (
    <div>
      <h1 className={title()}>Login</h1>
      <SignInButton />
    </div>
  );
}
