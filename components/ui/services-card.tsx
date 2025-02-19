"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getPostsByType } from "@/actions/get-posts";
import { Post } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ServicesCard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await getPostsByType("SERVICE");
        setPosts(data);
      } catch {
        setError("Не удалось загрузить данные");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/services/${post.slug}`}>
            <Card className="border p-4 rounded-lg shadow-md">
              <Image
                src={post.image || ""}
                alt={post.title || ""}
                width={300}
                height={300}
                className="relative w-full h-full object-cover"
              />
              <CardTitle className="text-xl font-bold">{post.title}</CardTitle>
              <CardFooter>
                <p>{post.price}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
