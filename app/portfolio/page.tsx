import { Metadata } from "next"
import { PageHeading } from "@/components/shared/page-heading"
import { getContent } from "@/actions/get-content"
import { IProject } from "@/lib/types"
import { PortfolioCard } from "@/components/card/portfolio-card"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Портфолио проектов",
  description:
    "Примеры реализованных сайтов и digital-проектов нашей веб-студии.",
  openGraph: {
    title: "Портфолио проектов",
    description:
      "Примеры реализованных сайтов и digital-проектов нашей веб-студии.",
    images: [
      {
        url: "/img/og/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Портфолио проектов",
      },
    ],
  },
}

export default async function PortfolioPage() {
  const projects = await getContent<IProject>({
    collection: "portfolio",
    fields: ["id", "slug", "title", "coner_image", "release_date"],
    status: "published",
  })
  return (
    <div className="container mx-auto my-8 px-4">
      <PageHeading
        title="Портфолио"
        description="Некоторые наши проекты которые нам разрешено показывать условиями договора"
      />
      <div className="my-4 grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {projects.map((project) => (
          <Link key={project.id} href={`/portfolio/${project.slug}`}>
            <PortfolioCard
              title={project.title}
              image={project.coner_image}
              description={new Date(project.release_date).toDateString()}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
