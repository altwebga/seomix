import type { Metadata, ResolvingMetadata } from "next";
import { getContentParams } from "@/actions/fetch-data";
import { GET_ARTICLE } from "@/config/queries";
import { IArticle } from "@/config/types";
import { Markdown } from "@/components/handlers/markdown";
import { CallAction } from "@/components/layout/call-action";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SplitContainerFixed } from "@/components/layout/split-container-fixed";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const result = await getContentParams<{ articles: IArticle[] }>(
    GET_ARTICLE,
    { slug },
    { revalidate: 3600 * 24 }
  );

  if (!result || !result.articles || result.articles.length === 0) {
    return {
      title: "Статья не найдена",
    };
  }

  const article = result.articles[0];
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: article.seo.title,
    description: article.seo.meta_description,
    openGraph: {
      title: article.seo.title,
      description: article.seo.meta_description,
      images: [
        {
          url: `/blog/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: article.seo.title,
        },
        ...previousImages,
      ],
    },
  };
}

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
    <SplitContainerFixed
      main={
        <>
          <h1>{article.title}</h1>
          <Markdown markdown={article.content} />
        </>
      }
      sidebar={
        <div className="w-full md:max-w-xs space-y-4">
          <CallAction />
          <Button className="w-full" variant={"outline"}>
            <ArrowLeft />
            <Link href={"/blog"}> Назад к блогу</Link>
          </Button>
        </div>
      }
    />
  );
}
