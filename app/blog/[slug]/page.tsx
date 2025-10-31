import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { Markdown } from "@/components/features/markdown";
import { ContainerFixed } from "@/components/layout/container-fixed";

async function getPosts() {
  return directus.request(
    readItems("articles", {
      fields: ["slug"],
      filter: { status: { _eq: "published" } },
    })
  );
}

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function getPost(slug: string) {
  try {
    const posts = await directus.request(
      readItems("articles", {
        fields: ["title", "content", "cover_image"],
        filter: {
          slug: { _eq: slug },
          status: { _eq: "published" },
        },
      })
    );

    return posts[0];
  } catch {
    return null;
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getPost(slug);

  return (
    <ContainerFixed
      main={
        <>
          <h1>{article?.title}</h1>
          {article?.content ? <Markdown markdown={article?.content} /> : ""}
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
