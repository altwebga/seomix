import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { BlogCard } from "@/components/card/blog-card";
import { ContainerFixed } from "@/components/layout/container-fixed";

async function getPosts() {
  return directus.request(
    readItems("articles", {
      fields: ["slug", "title", "date_created", "id", "cover_image", "seo"],
      sort: ["-date_created"],
      filter: { status: { _eq: "published" } },
    })
  );
}

export default async function DynamicPage() {
  const posts = await getPosts();
  return (
    <ContainerFixed
      main={
        <>
          <h1>Blog</h1>
          <div className="grid grid-cols-1 gap-4 mt-4">
            {posts.map((post) => {
              return (
                <BlogCard
                  key={post.id}
                  slug={`blog/${post.slug}` || ""}
                  title={post.title}
                  image={post.cover_image || ""}
                  content={post.seo?.meta_description || ""}
                />
              );
            })}
          </div>
        </>
      }
      sidebar={
        <div>
          <p>Тут фиксировано</p>
        </div>
      }
    />
  );
}
