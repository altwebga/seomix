import { ImageResponse } from "next/og"
import { getContent } from "@/actions/get-content"
import { IRegionHero } from "@/lib/types"

export const alt = "SEOMIX - Разработка и продвижение сайтов"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const regionHero = await getContent<IRegionHero>({
    collection: "region_hero",
    fields: ["seo"],
    slug,
    limit: 1,
  })
  const title =
    regionHero[0]?.seo?.title ?? "SEOMIX - Разработка и продвижение сайтов"

  return new ImageResponse(
    <div
      style={{
        fontSize: 48,
        background: "white",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {title}
    </div>,
    {
      ...size,
    }
  )
}
