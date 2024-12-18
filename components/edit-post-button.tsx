"use client";
import { deletePost } from "@/actions/delete-post";
import { Trash2Icon, PencilIcon, EllipsisIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <PencilIcon />
          Изменить
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeletePost}>
          <Trash2Icon />
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
