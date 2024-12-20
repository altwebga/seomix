"use client";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar() {
  const { data: session } = useSession();
  return (
    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage
          src={session?.user.image || "/images/profile.png"}
          alt={session?.user.name || "no name"}
        />
        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">
          {session?.user.name || "no name"}
        </span>
        <span className="truncate text-xs">
          {session?.user.email || "no email"}
        </span>
      </div>
    </div>
  );
}
