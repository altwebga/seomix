import { title } from "@/components/primitives";
import { AddPostForm } from "@/components/add-post-form";
export default function AddPostPage() {
  return (
    <div>
      <h1 className={title()}>Добавить контент</h1>
      <AddPostForm />
    </div>
  );
}
