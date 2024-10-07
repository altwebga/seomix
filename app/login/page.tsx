import { SignInButton } from "@/components/SignInButton";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-64">
      <h1 className="mb-4">Войти на сайт</h1>
      <SignInButton />
    </div>
  );
}
