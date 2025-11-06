import { BlogCard } from "@/components/card/blog-card";
import { ContainerFixed } from "@/components/layout/container-fixed";
import { getPublishedArticlesList } from "@/actions/content";

export default async function DynamicPage() {
  const posts = await getPublishedArticlesList();
  return (
    <ContainerFixed
      main={
        <>
          <h1>Блог</h1>
          <p>Скорее не блог, а записная книжка. Чтобы не забыть.</p>
          <ul className="grid grid-cols-1 gap-4 mt-8 list-none px-0">
            {posts.map((post) => {
              return (
                <li key={post.id}>
                  <BlogCard
                    slug={`blog/${post.slug}` || ""}
                    title={post.title}
                    image={post.cover_image || ""}
                    content={post.seo?.meta_description || ""}
                  />
                </li>
              );
            })}
          </ul>
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
