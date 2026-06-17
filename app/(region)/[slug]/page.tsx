import { Metadata } from "next"
import Link from "next/link"
import { getMetadataBySlug } from "@/lib/get-metadata"
import { getContent } from "@/actions/get-content"
import { IRegionHero } from "@/lib/types"
import { HeroSection } from "@/components/thegridcn/hero-section"
import { Divider } from "@/components/thegridcn/divider"
import { Button } from "@/components/ui/button"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params

  return getMetadataBySlug("region_hero", slug)
}

export default async function RegionSinglePage({ params }: PageProps) {
  const { slug } = await params
  const regionHero = await getContent<IRegionHero>({
    collection: "region_hero",
    fields: ["*"],
    slug: slug,
  })
  return (
    <section className="relative container mx-auto my-2 px-4 py-12 md:my-4 md:py-0">
      <Divider label="hero" />
      <HeroSection
        badge="студия полного цикла"
        title={`Разработка и продвижение сайтов  ${regionHero[0].in_city}`}
        description={regionHero[0].description}
        align="center"
      >
        <Button
          variant="default"
          size="lg"
          className="rounded border border-primary bg-primary/20 px-5 py-2 font-mono text-[10px] tracking-widest text-primary uppercase shadow-[0_0_12px_rgba(var(--primary-rgb,0,180,255),0.15)] transition-all duration-300 hover:bg-primary/30"
          asChild
        >
          <Link href="/contact">Начать проект</Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="rounded border border-primary/30 px-5 py-2 font-mono text-[10px] tracking-widest text-foreground/60 uppercase transition-colors hover:border-primary/50 hover:text-primary"
          asChild
        >
          <Link href="/portfolio">Примеры работ</Link>
        </Button>
      </HeroSection>
    </section>
  )
}
