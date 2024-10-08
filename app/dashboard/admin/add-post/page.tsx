import { AddPostForm } from "@/components/AddPostForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function AddPostPage() {
  const session = await auth();
  if (!session || session?.user?.role !== "admin") {
    redirect("/");
  }
  const userEmail = session?.user?.email as string;
  return (
    <div className="container mx-auto max-w-4xl">
      <h1>Добавить пост</h1>
      <AddPostForm userEmail={userEmail} />
    </div>
  );
}
