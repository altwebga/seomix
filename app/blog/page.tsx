import { getContent } from "@/actions/fetch-data";
import { BlogCard } from "@/components/card/blog-card";
import { GET_ARTICLES } from "@/config/queries";
import { IArticle } from "@/config/types";

interface GraphQLResponse {
  articles?: IArticle[];
}

export default async function PostPage() {
  const result = await getContent<GraphQLResponse>(GET_ARTICLES, {
    revalidate: 3600 * 24,
  });
  const articles = result?.articles || [];
  if (articles.length === 0) {
    return <p>постов нет</p>;
  }
  return (
    <section className="container mx-auto p-4">
      <h1>Блог</h1>
      <div className="grid grid-cols-1 gap-4">
        {articles.map((article) => (
          <BlogCard
            key={article.id}
            slug={`/blog/${article.slug}`}
            title={article.title}
            content={article.seo.meta_description}
            image={article.cover_image.id}
          />
        ))}
      </div>
    </section>
  );
}
