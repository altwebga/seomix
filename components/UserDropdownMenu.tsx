import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { CircleUser } from "lucide-react";
import { SignOutButton } from "./SignOutButton";
import { auth } from "@/auth";

export async function UserDropdownMenu() {
  const session = await auth();
  if (!session)
    return (
      <Button variant="default">
        <Link href="/login">Войти в ЛК</Link>
      </Button>
    );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-4 py-2 border border-muted hover:bg-muted rounded-sm">
        <CircleUser className="w-5 h-5" />
        <span>Привет, {session?.user?.name || "UserName"}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{session?.user?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/dashboard">Личный кабинет</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/dashboard/profile">Профиль</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Поддержка</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
