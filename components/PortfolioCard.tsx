import Link from "next/link";
import Image from "next/image";
import { getPosts } from "@/lib/api";
import { Post } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import placeholderImage from "@/public/images/placeholder_image.svg";

export async function PortfolioCards() {
  const posts = await getPosts(3, 21);
  if (!posts) {
    return (
      <div>
        <p>Ничего не найдено</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {posts.map((post: Post) => (
        <Link key={post.id} href={`/portfolio/${post.slug}`}>
          <Card>
            <CardHeader>
              <Image
                src={post.image_url || placeholderImage}
                alt={post.title.rendered}
                width={500}
                height={500}
                className="w-auto h-auto object-cover"
              />
            </CardHeader>
            <CardContent className="flex gap-4">
              <Image
                src={post.acf?.logo || placeholderImage}
                alt={post.title.rendered}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3>{post.title.rendered}</h3>
                <span>{post.acf?.businessCategory}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
