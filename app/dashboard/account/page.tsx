import { EditProfileForm } from "@/components/edit-profile-form";
import { SessionUserInfo } from "@/components/session-user-info";

export default function AccountPage() {
  return (
    <div className="pl-4">
      <h1>Account</h1>
      <div className="grid grid-cols-2 gap-4">
        <EditProfileForm />
        <SessionUserInfo />
      </div>
    </div>
  );
}
