import { getContentParams } from "@/actions/fetch-data";
import { GET_ARTICLE } from "@/config/queries";
import { IArticle } from "@/config/types";
import { Markdown } from "@/components/handlers/markdown";
import { CallAction } from "@/components/layout/call-action";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowBigLeft } from "lucide-react";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getContentParams<{ articles: IArticle[] }>(
    GET_ARTICLE,
    {
      slug,
    },
    {
      revalidate: 3600 * 24,
    }
  );
  if (!result || !result.articles || result.articles.length === 0) {
    return <p>Нет контента</p>;
  }

  const article = result.articles[0];
  return (
    <section className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-2">
        <div className="md:w-3/4 md:border-r md:pr-4">
          <h1>{article.title}</h1>
          <Markdown markdown={article.content} />
        </div>
        <div className="md:w-1/4">
          <div className="md:fixed md:top-20 md:p-4">
            <Button variant={"outline"} className="md:w-xs">
              <ArrowBigLeft />
              <Link href={"/blog"}>Назад к блогу</Link>
            </Button>
            <CallAction className="md:w-xs" />
          </div>
        </div>
      </div>
    </section>
  );
}
