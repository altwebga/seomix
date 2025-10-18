import { getContent } from "@/actions/fetch-data";
import { GET_ARTICLES } from "@/config/queries";
import { IArticle } from "@/config/types";

interface GraphQLResponse {
  articles?: IArticle[];
}

export default async function PostPage() {
  const result = await getContent<GraphQLResponse>(GET_ARTICLES, {
    revalidate: 3600,
  });
  const articles = result?.articles || [];
  if (articles.length === 0) {
    return <p>постов нет</p>;
  }
  return (
    <section>
      <h1>Блог</h1>
      <div>
        {articles.map((article) => (
          <h3 key={article.id}>{article.title}</h3>
        ))}
      </div>
    </section>
  );
}
