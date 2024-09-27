import { User } from "@nextui-org/user";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { useSession, signOut } from "next-auth/react";

import placeholderAvatar from "@/public/images/avatar.svg";

export function UserAvatar() {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }
  const image = session?.user?.image || placeholderAvatar.src;
  const name = session?.user?.name || "Tony Reichert";
  const email = session?.user?.email || "user@example.com";

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: image,
          }}
          className="transition-transform"
          description={email}
          name={name}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem key="logout" color="danger">
          <button onClick={() => signOut()}>Logout</button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
