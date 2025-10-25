import Link from "next/link";
import { getContentParams } from "@/actions/fetch-data";
import { GET_PROJECT } from "@/config/queries";
import { IProject } from "@/config/types";
import { Markdown } from "@/components/handlers/markdown";
import { RuTubeFrame } from "@/components/handlers/rutube-frame";
import { Button } from "@/components/ui/button";
import { ClientCard } from "@/components/card/client-card";
import { ArrowLeft, SquareArrowOutUpRightIcon } from "lucide-react";
import { CallAction } from "@/components/layout/call-action";
import { SplitContainerFixed } from "@/components/layout/split-container-fixed";

const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL;

export default async function PortfolioSinglePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await getContentParams<{ projects: IProject[] }>(
    GET_PROJECT,
    {
      slug,
    },
    {
      revalidate: 3600 * 24,
    }
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
              logo={`${imageUrl}/${project.client.logo.id}`}
            />
            <Button>
              <a
                href={project.site}
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Посмотреть сайт
              </a>
              <SquareArrowOutUpRightIcon />
            </Button>
          </div>
        </div>
      }
      sidebar={
        <div className="md:w-xs space-y-4">
          <CallAction />
          <Button className="w-full" variant={"outline"}>
            <ArrowLeft />
            <Link href={"/portfolio"}>Назад к портфолио</Link>
          </Button>
        </div>
      }
    />
  );
}
