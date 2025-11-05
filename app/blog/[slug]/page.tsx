import type { Metadata } from "next";
import { Markdown } from "@/components/features/markdown";
import { ContainerFixed } from "@/components/layout/container-fixed";
import { getArticleBySlug, getPublishedArticlesSlugs } from "@/actions/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;

  const article = await getArticleBySlug(slug);

  const baseImageUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";
  const seoTitle = article?.seo?.title || article?.title || undefined;
  const seoDescription = article?.seo?.meta_description || undefined;
  const ogImagePath =
    article?.seo?.og_image || article?.cover_image || undefined;
  const ogImageUrl =
    ogImagePath && baseImageUrl ? `${baseImageUrl}/${ogImagePath}` : undefined;

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
      type: "article",
    },
    twitter: {
      card: ogImageUrl ? "summary_large_image" : "summary",
      title: seoTitle,
      description: seoDescription,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getPublishedArticlesSlugs();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

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
