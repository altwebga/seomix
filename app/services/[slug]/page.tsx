import { Markdown } from "@/components/shared/markdown"
import Link from "next/link"
import { DirectusImage } from "@/components/shared/directus-image"
import { BreadcrumbNav } from "@/components/thegridcn/breadcrumb-nav"
import { GlowContainer } from "@/components/thegridcn/glow-container"
import { IService } from "@/lib/types"
import { getContent } from "@/actions/get-content"
import { CallToAction } from "@/components/shared/call-to-action"

import type { Metadata } from "next"
import { getMetadataBySlug } from "@/lib/get-metadata"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params

  return getMetadataBySlug("services", slug)
}

export default async function ServicesSinglePage({ params }: PageProps) {
  const { slug } = await params
  const services = await getContent<IService>({
    collection: "services",
    status: "published",
    fields: ["*"],
    slug: slug,
  })
  const service = services[0]

  const similar_services = await getContent<IService>({
    collection: "services",
    status: "published",
    fields: ["title", "slug", "id"],
  })

  return (
    <div className="container mx-auto my-8 px-4">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full md:w-2/3">
          <BreadcrumbNav
            className="mb-8"
            items={[
              { label: "Главная", href: "/" },
              { label: "Услуги", href: "/services" },
              { label: service.title, active: true },
            ]}
          />
          <h1 className="mb-8 text-2xl font-bold tracking-wider text-foreground uppercase md:text-3xl lg:text-4xl">
            {service.title}
          </h1>
          <Markdown markdown={service.description} />
          <CallToAction
            title="Готовы начать?"
            description="Оставьте заявку и мы поможем"
            primaryAction="Связаться с нами"
            secondaryAction={{ label: "Примеры работ", url: "/portfolio" }}
          />
        </div>
        <aside className="w-full md:w-1/3">
          <GlowContainer className="sticky top-40">
            {/* Related Articles (sidebar version) */}
            <div className="relative overflow-hidden rounded border border-primary/20 bg-card/80 p-4 backdrop-blur-sm">
              <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
              <div className="relative">
                <div className="mb-3 font-mono text-[10px] tracking-widest text-foreground/50 uppercase">
                  Другие услуги
                </div>
                <div className="space-y-3">
                  {similar_services
                    .filter((s) => s.slug !== slug)
                    .map((service) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.slug}`}
                        className="group block border-b border-primary/10 pb-3 last:border-0 last:pb-0"
                      >
                        <div className="mt-0.5 text-xs font-semibold tracking-wider text-foreground/70 uppercase transition-colors group-hover:text-primary">
                          {service.title}
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
              {/* Corner decorations */}
              <div className="pointer-events-none absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-primary/30" />
              <div className="pointer-events-none absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-primary/30" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-primary/30" />
              <div className="pointer-events-none absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-primary/30" />
            </div>
            <DirectusImage
              url={service.cover_image}
              alt={service.title}
              width={600}
              height={600}
              className="mt-4 h-auto w-full"
            />
          </GlowContainer>
        </aside>
      </div>
    </div>
  )
}
