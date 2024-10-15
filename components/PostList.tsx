"use client"; // Директива, чтобы сделать компонент клиентским

import Link from "next/link";
import Image from "next/image";

type PostMetaData = {
  title: string;
  description: string;
  featureImage?: string;
  slug: string;
};

type PostListProps = {
  posts: PostMetaData[];
};

export default function PostList({ posts }: PostListProps) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`}>
            <h2>{post.title}</h2>
            {post.featureImage && (
              <Image
                src={post.featureImage}
                alt={post.title}
                width={600}
                height={400}
              />
            )}
            <p>{post.description}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
