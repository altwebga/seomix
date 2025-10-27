import type { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";

import { Markdown } from "@/components/handlers/markdown";
import { SplitContainerFixed } from "@/components/layout/split-container-fixed";
import { getServiceBySlug } from "@/entities/service/api/get-services";
import type { Service } from "@/entities/service/model/types";
import { CallToActionCard } from "@/widgets/call-to-action/ui/call-to-action-card";
import { getPublicEnv } from "@/shared/config/public-env";

const { NEXT_PUBLIC_IMAGE_URL } = getPublicEnv();

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const result = await getServiceBySlug(slug);
  const service = result?.services?.[0];

  if (!service) {
    return {
      title: "Услуга не найдена",
      description: "Запрашиваемая услуга недоступна",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: service.seo.title,
    description: service.seo.meta_description,
    openGraph: {
      title: service.seo.title,
      description: service.seo.meta_description,
      images: [
        {
          url: `/services/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: service.seo.title,
        },
        ...previousImages,
      ],
    },
  };
}

export default async function ServiceSinglePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getServiceBySlug(slug);
  const service: Service | undefined = result?.services?.[0];

  if (!service) {
    return <div>Услуга не найдена</div>;
  }

  return (
    <SplitContainerFixed
      main={
        <>
          <h1>{service.title}</h1>
          <Markdown markdown={service.content} />
          <CallToActionCard className="mt-12" />
        </>
      }
      sidebar={
        <div>
          <Image
            src={`${NEXT_PUBLIC_IMAGE_URL}/${service.cover_image.id}`}
            alt={service.cover_image.title}
            width={600}
            height={600}
            className="object-contain md:fixed md:top-20"
          />
        </div>
      }
    />
  );
}
