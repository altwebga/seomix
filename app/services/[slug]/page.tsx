import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Markdown } from "@/components/features/markdown";
import { ContainerFixed } from "@/components/layout/container-fixed";
import { getPublishedServicesSlugs, getServiceBySlug } from "@/actions/content";
import { CallAction } from "@/components/widgets/call-action";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/shared/back-button";

type Props = {
  params: Promise<{ slug: string }>;
};
const baseImageUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;

  const service = await getServiceBySlug(slug);

  const seoTitle = service?.seo.title || service?.title || undefined;
  const seoDescription = service?.seo.meta_description || undefined;
  const ogImagePath =
    service?.seo.og_image || service?.cover_image || undefined;
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
          <CallAction />
        </>
      }
      sidebar={
        <div className="space-y-8 md:max-w-sm">
          <BackButton href="/services" title="Назад к услугам" />
          <Image
            src={`${baseImageUrl}/${service?.cover_image}`}
            alt={service?.title || "Image"}
            width={400}
            height={400}
            priority={false}
            sizes="(max-width: 768px) 100vw, 400px"
            className="w-full h-auto max-w-full object-contain"
          />
        </div>
      }
    />
  );
}
