import Link from "next/link";
import { auth } from "@/auth";
import { Button } from "./ui/button";
export async function UserMobileAccount() {
  const session = await auth();
  if (!session) {
    return (
      <Button asChild>
        <Link href="/login">Войти</Link>
      </Button>
    );
  }
  return (
    <Button asChild>
      <Link href="/dashboard">Личный кабинет</Link>
    </Button>
  );
}
