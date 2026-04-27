import { getContent } from "@/actions/get-content"
import { IService } from "@/lib/types"
import Link from "next/link"
import { Divider } from "../thegridcn/divider"
import { ServicesCard } from "../card/services-card"

export async function Services() {
  const servises = await getContent<IService>({
    collection: "services",
    fields: ["title", "slug", "excerpt", "cover_image", "id"],
    status: "published",
  })
  return (
    <section className="my-20">
      <div className="container mx-auto space-y-4 px-4">
        <div>
          <Divider label="Services" variant="default" />
          <div className="my-8 flex flex-col items-center gap-8 md:my-16 md:flex-row">
            <h2 className="section-title">
              Полный спектр решений для быстрого и эффективного старта вашего
              бизнеса в интернете
            </h2>
            <p className="section-copy">
              Разрабатываем современные сайты с продуманной структурой и
              дизайном, настраиваем контекстную рекламу в Яндекс Директ,
              занимаемся SEO-продвижением и аналитикой. Помогаем привлекать
              клиентов, увеличивать продажи и усиливать присутствие бренда в
              сети.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {servises.map((service) => (
            <Link key={service.id} href={`services/${service.slug}`}>
              <ServicesCard
                key={service.id}
                title={service.title}
                description={service.excerpt}
                image={service.cover_image}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
