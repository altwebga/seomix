import { getContentParams } from "@/actions/fetch-data";
import { GET_PROJECT } from "@/config/queries";
import { IProject } from "@/config/types";
import { Markdown } from "@/components/handlers/markdown";
import { RuTubeFrame } from "@/components/handlers/rutube-frame";
import { Button } from "@/components/ui/button";
import { ClientCard } from "@/components/card/client-card";
import { SquareArrowOutUpRightIcon } from "lucide-react";

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
    <section className="container mx-auto p-4 gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-3/4 md:border-r md:pr-4">
          <Markdown markdown={project.content} />
          <RuTubeFrame videoId={project.video_url} title={project.title} />
        </div>
        <div className="md:w-1/4">
          <div className="md:fixed md:top-24 space-y-4">
            <ClientCard
              title={project.client.title}
              direction={project.client.direction}
              logo={`${imageUrl}/${project.client.logo.id}`}
            />
            <Button variant={"outline"}>
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
      </div>
    </section>
  );
}
