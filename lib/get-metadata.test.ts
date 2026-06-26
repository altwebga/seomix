import { afterEach, describe, expect, mock, test } from "bun:test"

const originalAssetsUrl = process.env.NEXT_PUBLIC_ASSETS
let contentResponse: unknown[] = []

mock.module("@/actions/get-content", () => ({
  getContent: mock(async () => contentResponse),
}))

afterEach(() => {
  process.env.NEXT_PUBLIC_ASSETS = originalAssetsUrl
  contentResponse = []
})

describe("getMetadataBySlug", () => {
  test("builds metadata from seo content", async () => {
    process.env.NEXT_PUBLIC_ASSETS = "https://assets.example.test"
    contentResponse = [
      {
        seo: {
          title: "SEO title",
          meta_description: "SEO description",
          focus_keyphrase: "seo, marketing",
          og_image: "image-id",
        },
      },
    ]

    const { getMetadataBySlug } = await import("./get-metadata")

    await expect(getMetadataBySlug("pages", "home")).resolves.toEqual({
      title: "SEO title",
      description: "SEO description",
      keywords: "seo, marketing",
      openGraph: {
        title: "SEO title",
        description: "SEO description",
        images: "https://assets.example.test/image-id",
      },
    })
  })

  test("returns fallback metadata when seo content is missing", async () => {
    contentResponse = [{ seo: null }]

    const { getMetadataBySlug } = await import("./get-metadata")

    await expect(getMetadataBySlug("pages", "missing")).resolves.toEqual({
      title: "Not found",
      description: "Page not found",
    })
  })
})
