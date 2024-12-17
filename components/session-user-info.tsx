"use client";
import { useSession } from "next-auth/react";

export function SessionUserInfo() {
  const { data: session } = useSession();
  return (
    <div>
      <h3>Информация о пользователе</h3>
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
    </div>
  );
}
