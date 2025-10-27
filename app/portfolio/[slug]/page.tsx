import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";

import { getContentParams } from "@/actions/fetch-data";
import { GET_PROJECT } from "@/config/queries";
import { IProject } from "@/config/types";
import { Markdown } from "@/components/handlers/markdown";
import { RuTubeFrame } from "@/components/handlers/rutube-frame";
import { Button } from "@/components/ui/button";
import { ClientCard } from "@/entities/client/ui/client-card";
import { ArrowLeft, SquareArrowOutUpRightIcon } from "lucide-react";
import { CallToActionCard } from "@/widgets/call-to-action/ui/call-to-action-card";
import { SplitContainerFixed } from "@/components/layout/split-container-fixed";
import { getPublicEnv } from "@/shared/config/public-env";

const { NEXT_PUBLIC_IMAGE_URL } = getPublicEnv();

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const result = await getContentParams<{ projects: IProject[] }>(
    GET_PROJECT,
    { slug },
    { revalidate: 3600 * 24 }
  );

  if (!result?.projects?.length) {
    return {
      title: "Проект не найден",
    };
  }

  const project = result.projects[0];
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: project.seo.title,
    description: project.seo.meta_description,
    openGraph: {
      title: project.seo.title,
      description: project.seo.meta_description,
      images: [
        {
          url: `/portfolio/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: project.seo.title,
        },
        ...previousImages,
      ],
    },
  };
}

export default async function PortfolioSinglePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await getContentParams<{ projects: IProject[] }>(
    GET_PROJECT,
    { slug },
    { revalidate: 3600 * 24 }
  );
  const project = res?.projects[0];

  if (!project) {
    return <div>Проект не найден</div>;
  }

  return (
    <SplitContainerFixed
      main={
        <div className="space-y-8">
          <Markdown markdown={project.content} />
          <RuTubeFrame videoId={project.video_url} title={project.title} />
          <div className="flex flex-row gap-4 justify-between items-center">
            <ClientCard
              title={project.client.title}
              direction={project.client.direction}
              logo={`${NEXT_PUBLIC_IMAGE_URL}/${project.client.logo.id}`}
            />
            <Button asChild>
              <a
                href={project.site}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex items-center gap-2"
              >
                Посмотреть сайт
                <SquareArrowOutUpRightIcon className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      }
      sidebar={
        <div className="md:w-xs space-y-4">
          <CallToActionCard />
          <Button className="w-full" variant="outline" asChild>
            <Link href="/portfolio" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />Назад к портфолио
            </Link>
          </Button>
        </div>
      }
    />
  );
}
