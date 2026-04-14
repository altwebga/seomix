import { getContentItem, getContent } from "@/actions/get-content";
import { GlowContainer, BreadcrumbNav } from "@/components/thegridcn";
import { Markdown } from "@/components/shared/markdown";
import { CTA } from "@/components/layout/cta";
import { RuTubeFrame } from "@/components/shared/rutube-frame";

export default async function ProjectSinglePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getContentItem({
    slug,
    content_type: "project",
    fields: ["rutube_id", "description", "title", "slug", "seo"],
  });
  const similar_projects = await getContent({
    content_type: "project",
    limit: 8,
  });
  return (
    <div className="container mx-auto px-4 my-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          <BreadcrumbNav
            className="mb-2"
            items={[
              { label: "Главная", href: "/" },
              { label: "Портфолио", href: "/portfolio" },
              { label: project.title, active: true },
            ]}
          />
          <Markdown markdown={project.description} />
          {project.rutube_id && (
            <GlowContainer>
              <RuTubeFrame videoId={project.rutube_id} title={project.title} />
            </GlowContainer>
          )}
        </div>
        <div className="w-full md:w-1/3">
          <div className="sticky top-20">
            <CTA
              title="Понравился сайт?"
              description="Сделаем такой же и даже лучше!"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
