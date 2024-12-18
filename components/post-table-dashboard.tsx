"use client";
import { useState, useEffect } from "react";
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
import { EditPostButton } from "./edit-post-button";

type Post = {
  id: string;
  title: string;
  images: { image: { url: string } }[];
  postType: string;
  createdAt: Date;
};

export function PostTableDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const result = await getPosts();
    setPosts(result);
  }

  async function handlePostDelete(postId: string) {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  }

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
            <TableCell>
              <EditPostButton
                postId={post.id}
                onPostDelete={handlePostDelete}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
