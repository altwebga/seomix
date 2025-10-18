import { getContentParams } from "@/actions/fetch-data";
import { GET_ARTICLE } from "@/config/queries";
import { IArticle } from "@/config/types";
import { Markdown } from "@/components/handlers/markdown";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getContentParams<{ articles: IArticle[] }>(GET_ARTICLE, {
    slug,
  });
  if (!result || !result.articles || result.articles.length === 0) {
    return <p>Нет контента</p>;
  }

  const article = result.articles[0];
  return (
    <section className="container mx-auto p-4">
      <h1>{article.title}</h1>
      <Markdown markdown={article.content} />s
    </section>
  );
}
