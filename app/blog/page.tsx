import { getPostsLite } from "@/actions/get-posts";
import { PostCard } from "@/components/post-card";

export default async function BlogPage() {
  const { posts } = await getPostsLite();
  return (
    <section className="container mx-auto p-4">
      <h1>Блог</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Основной контент */}
        <div className="grid grid-cols-1 gap-4 py-4 lg:col-span-2">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              imageURL={post.image.id}
              imageAlt={post.image.title}
              slug={post.slug}
              expect={post.seo.meta_description}
            />
          ))}
        </div>

        {/* Баннер */}
        <div className="my-4 lg:sticky lg:top-20 lg:self-start">
          <div className="border p-4">
            <p>Здесь будет баннер</p>
          </div>
        </div>
      </div>
    </section>
  );
}
