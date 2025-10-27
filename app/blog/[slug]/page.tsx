import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";

import { getContentParams } from "@/actions/fetch-data";
import { GET_ARTICLE } from "@/config/queries";
import { IArticle } from "@/config/types";
import { Markdown } from "@/components/handlers/markdown";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CallToActionCard } from "@/widgets/call-to-action/ui/call-to-action-card";
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

  if (!result?.articles?.length) {
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
    { slug },
    { revalidate: 3600 * 24 }
  );

  if (!result?.articles?.length) {
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
          <CallToActionCard />
          <Button className="w-full" variant="outline" asChild>
            <Link href="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Назад к блогу
            </Link>
          </Button>
        </div>
      }
    />
  );
}
