import { ImageResponse } from "next/og"
import { getContent } from "@/actions/get-content"
import { IRegionHero } from "@/lib/types"

export const alt = "SEOMIX - Разработка и продвижение сайтов"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const regionHero = await getContent<IRegionHero>({
    collection: "region_hero",
    fields: ["city", "seo"],
    slug,
    limit: 1,
  })
  const city = regionHero[0]?.city
  const title =
    regionHero[0]?.seo?.title ?? "SEOMIX - Разработка и продвижение сайтов"

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#05041f",
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <img
        src={`${baseUrl}/img/hero_grid.svg`}
        alt=""
        width={1200}
        height={853}
        style={{
          position: "absolute",
          inset: 0,
          width: "1200px",
          height: "853px",
          objectFit: "cover",
          opacity: 0.55,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(5,4,31,0.96) 0%, rgba(5,4,31,0.78) 48%, rgba(5,4,31,0.52) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 40,
          right: 40,
          bottom: 40,
          left: 40,
          border: "1px solid rgba(0, 229, 255, 0.28)",
          borderRadius: 20,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          width: 180,
          height: 1,
          background:
            "linear-gradient(90deg, rgba(0,229,255,0.9), rgba(0,229,255,0))",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 40,
          bottom: 40,
          width: 220,
          height: 1,
          background:
            "linear-gradient(270deg, rgba(0,229,255,0.9), rgba(0,229,255,0))",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "72px 80px 64px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 0,
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(0, 229, 255, 0.55)",
                borderRadius: 10,
                color: "#00e5ff",
              }}
            >
              S
            </div>
            seomix.
          </div>
          {city ? (
            <div
              style={{
                display: "flex",
                padding: "10px 18px",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 999,
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.78)",
                fontSize: 24,
              }}
            >
              {city}
            </div>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            maxWidth: 910,
          }}
        >
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "9px 14px",
              border: "1px solid rgba(0, 229, 255, 0.35)",
              borderRadius: 8,
              background: "rgba(0, 229, 255, 0.08)",
              color: "#00e5ff",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            DIGITAL AGENCY
          </div>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 62 ? 54 : 62,
              lineHeight: 1.08,
              fontWeight: 800,
              letterSpacing: 0,
              textWrap: "balance",
              textShadow: "0 0 28px rgba(0, 229, 255, 0.16)",
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "rgba(255,255,255,0.62)",
            fontSize: 22,
          }}
        >
          <div>Разработка сайтов / SEO / Реклама</div>
          <div style={{ color: "#00e5ff" }}>seomix.ru</div>
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  )
}
