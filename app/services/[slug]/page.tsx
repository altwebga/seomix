import type { Metadata } from "next";
import { Markdown } from "@/components/features/markdown";
import { ContainerFixed } from "@/components/layout/container-fixed";
import { getPublishedServicesSlugs, getServiceBySlug } from "@/actions/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;

  const service = await getServiceBySlug(slug);

  const baseImageUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";
  const seoTitle = service?.seo?.title || service?.title || undefined;
  const seoDescription = service?.seo?.meta_description || undefined;
  const ogImagePath = service?.seo?.og_image || service?.cover_image || undefined;
  const ogImageUrl = ogImagePath && baseImageUrl ? `${baseImageUrl}/${ogImagePath}` : undefined;

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
  const services = await getPublishedServicesSlugs();

  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  return (
    <ContainerFixed
      main={
        <>
          <h1>{service?.title}</h1>
          {service?.content ? <Markdown markdown={service?.content} /> : ""}
        </>
      }
      sidebar={<div>{service?.price ? <p className="text-lg">Цена: {service.price}</p> : null}</div>}
    />
  );
}


