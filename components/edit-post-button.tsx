"use client";
import { deletePost } from "@/actions/delete-post";
import { Button } from "./ui/button";

type EditPostButtonProps = {
  postId: string;
  onPostDelete: (postId: string) => void;
};

export function EditPostButton({ postId, onPostDelete }: EditPostButtonProps) {
  async function handleDeletePost() {
    const result = await deletePost(postId);
    if (result?.error) {
      console.error(result.error);
    } else {
      onPostDelete(postId); // Уведомляем родительский компонент об удалении
    }
  }

  return (
    <Button variant="destructive" onClick={handleDeletePost}>
      Удалить
    </Button>
  );
}
