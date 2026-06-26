import { afterEach, describe, expect, mock, test } from "bun:test"

const originalBaseUrl = process.env.NEXT_PUBLIC_BASE_URL
let collectionContent: Record<string, unknown[]> = {}

mock.module("@/actions/get-content", () => ({
  getContent: mock(async ({ collection }: { collection: string }) => {
    return collectionContent[collection] ?? []
  }),
}))

afterEach(() => {
  process.env.NEXT_PUBLIC_BASE_URL = originalBaseUrl
  collectionContent = {}
})

async function importSitemap() {
  return import(
    `./sitemap.ts?test=${Date.now()}-${Math.random()}`
  ) as Promise<typeof import("./sitemap")>
}

describe("sitemap", () => {
  test("maps Directus collections to route URLs", async () => {
    process.env.NEXT_PUBLIC_BASE_URL = "https://example.test"
    collectionContent = {
      pages: [
        {
          slug: "home",
          date_created: "2026-01-01T00:00:00.000Z",
          seo: {
            sitemap: {
              priority: "0.9",
              change_frequency: "daily",
            },
          },
        },
        {
          slug: "about",
          date_updated: "2026-01-02T00:00:00.000Z",
        },
      ],
      services: [{ slug: "seo", date_created: "2026-01-03T00:00:00.000Z" }],
      blog: [{ slug: "post", date_created: "2026-01-04T00:00:00.000Z" }],
      portfolio: [{ slug: "case", date_created: "2026-01-05T00:00:00.000Z" }],
      region_hero: [
        { slug: "moscow", date_created: "2026-01-06T00:00:00.000Z" },
      ],
    }

    const { default: sitemap } = await importSitemap()
    const items = await sitemap()

    expect(items).toEqual([
      {
        url: "https://example.test",
        lastModified: new Date("2026-01-01T00:00:00.000Z"),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: "https://example.test/about",
        lastModified: new Date("2026-01-02T00:00:00.000Z"),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: "https://example.test/services/seo",
        lastModified: new Date("2026-01-03T00:00:00.000Z"),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: "https://example.test/portfolio/case",
        lastModified: new Date("2026-01-05T00:00:00.000Z"),
        changeFrequency: "weekly",
        priority: 0.3,
      },
      {
        url: "https://example.test/region/moscow",
        lastModified: new Date("2026-01-06T00:00:00.000Z"),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: "https://example.test/blog/post",
        lastModified: new Date("2026-01-04T00:00:00.000Z"),
        changeFrequency: "weekly",
        priority: 0.5,
      },
    ])
  })

  test("clamps invalid sitemap priorities", async () => {
    process.env.NEXT_PUBLIC_BASE_URL = "https://example.test"
    collectionContent = {
      pages: [
        {
          slug: "low",
          seo: { sitemap: { priority: "-1" } },
        },
        {
          slug: "high",
          seo: { sitemap: { priority: "2" } },
        },
        {
          slug: "fallback",
          seo: { sitemap: { priority: "not-a-number" } },
        },
      ],
    }

    const { default: sitemap } = await importSitemap()
    const items = await sitemap()

    expect(items.map((item) => item.priority)).toEqual([0, 1, 0.8])
  })
})
