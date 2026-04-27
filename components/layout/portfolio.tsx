import { getContent } from "@/actions/get-content"
import { IProject } from "@/lib/types"
import { TronCarousel } from "../thegridcn/carousel"
import { PortfolioCard } from "../card/portfolio-card"
import { Divider } from "../thegridcn/divider"
import Link from "next/link"

export async function Portfolio() {
  const caces = await getContent<IProject>({
    collection: "portfolio",
    fields: ["id", "slug", "title", "coner_image", "release_date"],
    status: "published",
  })
  return (
    <section className="my-20">
      <div className="container mx-auto px-4">
        <Divider label="Portfolio" variant="default" />

        <h2 className="section-title my-8">Примеры работ</h2>

        <TronCarousel
          items={caces.map((item) => (
            <Link key={item.id} href={`portfolio/${item.slug}`}>
              <PortfolioCard
                title={item.title}
                description={new Date(item.release_date).toDateString()}
                image={item.coner_image}
              />
            </Link>
          ))}
        />
      </div>
    </section>
  )
}
