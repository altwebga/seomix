import { getPostsLite } from "@/actions/get-posts";
import { PostCard } from "@/components/post-card";

export default async function BlogPage() {
  const { posts } = await getPostsLite();
  return (
    <section className="container mx-auto px-4">
      <h1>Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            imageURL={post.image.id}
            imageAlt={post.image.title}
            slug={post.slug}
          />
        ))}
      </div>
    </section>
  );
}
