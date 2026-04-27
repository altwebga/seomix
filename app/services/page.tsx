import { PageHeading } from "@/components/shared/page-heading"
import { getContent } from "@/actions/get-content"
import Link from "next/link"
import { IService } from "@/lib/types"
import { ServicesCard } from "@/components/card/services-card"
import { CTABanner } from "@/components/thegridcn/cta-banner"

export default async function ServicesPage() {
  const services = await getContent<IService>({
    collection: "services",
    status: "published",
    fields: ["id", "slug", "cover_image", "excerpt", "title"],
  })

  return (
    <div className="container mx-auto my-8 px-4">
      <PageHeading
        title="Услуги"
        description="Полный комплекс услуг для быстрого старта вашего бизнеса в интернете."
      />
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="my-4 grid w-full grid-cols-1 gap-6 md:w-3/4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.id} href={`/services/${service.slug}`}>
              <ServicesCard
                title={service.title}
                description={service.excerpt}
                image={service.cover_image}
              />
            </Link>
          ))}
        </div>
        <aside className="w-full md:w-1/4">
          <div className="mt-4 md:sticky md:top-20">
            <CTABanner
              title="Не знаете, что выбрать?"
              description="Оставьте заявку и мы поможем"
              primaryAction={{ label: "Оставить заявку", href: "/contact" }}
            />
          </div>
        </aside>
      </div>
    </div>
  )
}
