import { User } from "@nextui-org/user";

import { auth } from "@/auth";
import placeholderAvatar from "@/public/images/avatar.svg";

export async function UserAvatar() {
  const session = await auth();

  if (!session) {
    return null;
  }
  const image = session?.user?.image || placeholderAvatar;
  const name = session?.user?.name || "John Doe";
  const email = session?.user?.email || "user@example.com";

  return (
    <User avatarProps={{ src: image.src }} description={email} name={name} />
  );
}
