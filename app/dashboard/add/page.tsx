import { AddPostForm } from "@/components/add-post-form";

export default function AddPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1>Создать запись</h1>
      <AddPostForm />
    </div>
  );
}
