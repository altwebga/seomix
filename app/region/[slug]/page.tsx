import { getContent } from "@/actions/get-content"
import { IRegionHero } from "@/lib/types"
import { Services } from "@/components/layout/services"
import { ClientSlider } from "@/components/layout/client-slider"
import { Features } from "@/components/layout/features"
import { Portfolio } from "@/components/layout/portfolio"
import { CallToAction } from "@/components/shared/call-to-action"
import { RegionHero } from "@/components/layout/region-hero"
import type { Metadata } from "next"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const regionHero = await getContent<IRegionHero>({
    collection: "region_hero",
    fields: ["seo"],
    slug,
    limit: 1,
  })
  const title =
    regionHero[0]?.seo?.title ?? "SEOMIX - Разработка и продвижение сайтов"
  const description =
    regionHero[0]?.seo?.meta_description ??
    "SEOMIX - Разработка и продвижение сайтов"

  return {
    title,
    description,
  }
}

export default async function RegionSinglePage({ params }: PageProps) {
  const { slug } = await params
  const regionHero = await getContent<IRegionHero>({
    collection: "region_hero",
    fields: ["*"],
    slug: slug,
  })

  return (
    <>
      <RegionHero
        in_city={regionHero[0].in_city}
        description={regionHero[0].description}
      />
      <Services />
      <ClientSlider />s
      <Features />
      <Portfolio />
      <CallToAction
        title="Готовы начать?"
        description="Оставьте заявку и мы поможем"
        primaryAction="Начать проект"
        secondaryAction={{ label: "Примеры работ", url: "/portfolio" }}
      />
    </>
  )
}
