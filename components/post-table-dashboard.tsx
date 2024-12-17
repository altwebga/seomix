import Image from "next/image";
import { getPosts } from "@/actions/get-posts";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";

export async function PostTableDashboard() {
  const posts = await getPosts(); // Получаем посты напрямую на сервере

  return (
    <Table>
      <TableCaption>Список ваших постов.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Изображение</TableHead>
          <TableHead>Название</TableHead>
          <TableHead>Тип поста</TableHead>
          <TableHead className="text-right">Дата создания</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>
              {post.images.length > 0 && (
                <Image
                  src={post.images[0]?.image?.url || "/placeholder.png"}
                  width={100}
                  height={100}
                  alt="Post Image"
                  className="aspect-square object-cover"
                />
              )}
            </TableCell>
            <TableCell>{post.title}</TableCell>
            <TableCell>
              <Badge>{post.postType}</Badge>
            </TableCell>
            <TableCell className="text-right">
              {new Date(post.createdAt).toLocaleDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
