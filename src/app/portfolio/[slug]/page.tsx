import { getContentItem, getCustomerByID } from "@/actions/get-content";
import { GlowContainer, BreadcrumbNav, DataCard } from "@/components/thegridcn";
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
    fields: [
      "rutube_id",
      "description",
      "title",
      "slug",
      "seo",
      "client",
      "site_url",
      "release_date",
    ],
  });
  const client = await getCustomerByID(project.client);
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
            <GlowContainer className="flex flex-col gap-8">
              {client && (
                <DataCard
                  subtitle="Клиент"
                  title={client.title}
                  fields={[
                    { label: "Род деятельности", value: client.description },
                    { label: "Сайт", value: project.site_url },
                    { label: "Дата релиза", value: project.release_date },
                  ]}
                />
              )}
              <CTA
                title="Понравился сайт?"
                description="Сделаем такой же и даже лучше!"
              />
            </GlowContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
