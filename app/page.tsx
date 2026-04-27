import { ClientSlider } from "@/components/layout/client-slider"
import { Features } from "@/components/layout/features"
import { Hero } from "@/components/layout/hero"
import { Portfolio } from "@/components/layout/portfolio"
import { Services } from "@/components/layout/services"
import { CallToAction } from "@/components/shared/call-to-action"
import { getMetadataBySlug } from "@/lib/get-metadata"
import type { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
  return getMetadataBySlug("pages", "home")
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <ClientSlider />
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
