import type { Metadata } from "next"
import { getContent } from "@/actions/get-content"

export interface ISeo {
  title: string
  meta_description: string
  focus_keyphrase: string
  og_image: string | null
}

type Collection =
  | "pages"
  | "services"
  | "blog"
  | "portfolio"
  | "team"
  | "clients"
  | "legal_information"

interface SeoItem {
  seo: ISeo | null
}

export async function getMetadataBySlug(
  collection: Collection,
  slug: string
): Promise<Metadata> {
  const data = await getContent<SeoItem>({
    collection,
    fields: ["seo"],
    slug,
    limit: 1,
  })

  const seo = data?.[0]?.seo

  if (!seo) {
    return {
      title: "Not found",
      description: "Page not found",
    }
  }

  const ASSETS_URL = process.env.NEXT_PUBLIC_ASSETS

  const ogImage = seo.og_image ? `${ASSETS_URL}/${seo.og_image}` : undefined

  return {
    title: seo.title,
    description: seo.meta_description,
    keywords: seo.focus_keyphrase,
    openGraph: {
      title: seo.title,
      description: seo.meta_description,
      images: ogImage,
    },
  }
}
