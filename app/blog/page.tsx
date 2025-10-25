import { getContent } from "@/actions/fetch-data";
import { BlogCard } from "@/components/card/blog-card";
import { GET_ARTICLES } from "@/config/queries";
import { IArticle } from "@/config/types";
import { SectionContainer } from "@/components/layout/section-container";

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
    <SectionContainer>
      <h1>Блог</h1>
      <p>
        Практика, аналитика и тенденции digital-маркетинга. Коротко и по
        существу о том, что работает.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
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
    </SectionContainer>
  );
}
