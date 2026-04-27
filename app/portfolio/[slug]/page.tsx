import { Markdown } from "@/components/shared/markdown"
import { BreadcrumbNav } from "@/components/thegridcn/breadcrumb-nav"
import { GlowContainer } from "@/components/thegridcn/glow-container"
import { RuTubeFrame } from "@/components/shared/rutube-frame"
import { DataCard } from "@/components/thegridcn/data-card"
import { getContent, getContentByID } from "@/actions/get-content"
import { IProject, IClient } from "@/lib/types"
import { CTABanner } from "@/components/thegridcn/cta-banner"

export default async function ProjectSinglePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const portfolio_res = await getContent<IProject>({
    collection: "portfolio",
    status: "published",
    fields: ["*"],
    slug: slug,
  })

  const project = portfolio_res[0]

  const client = await getContentByID<IClient>({
    collection: "clients",
    fields: ["*"],
    id: project.client,
  })

  return (
    <div className="container mx-auto my-8 px-4">
      <div className="flex flex-col gap-8 md:flex-row">
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
          {project.RuTube_video && (
            <GlowContainer>
              <RuTubeFrame
                videoId={project.RuTube_video}
                title={project.title}
              />
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
                    { label: "Род деятельности", value: client.type_company },
                    { label: "Сайт", value: project.site_url || "" },
                    { label: "Дата релиза", value: project.release_date },
                  ]}
                />
              )}
              <CTABanner
                title="Понравился сайт?"
                description="Сделаем такой же и даже лучше!"
                primaryAction={{ label: "Связаться с нами", href: "/contact" }}
                secondaryAction={{ label: "Наши услуги", href: "/services" }}
              />
            </GlowContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
