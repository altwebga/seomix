"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Session } from "next-auth";
export function UserAvatar({ session }: { session: Session | null }) {
  return (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage
          src={session?.user?.image || "/images/profile.png"}
          alt={session?.user?.name || "user"}
        />
        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{session?.user?.name}</span>
        <span className="truncate text-xs">{session?.user?.email}</span>
      </div>
    </>
  );
}
