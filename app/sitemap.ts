import type { MetadataRoute } from "next"
import { getContent } from "@/actions/get-content"
import { menuLinks } from "@/lib/menu-links"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://seomix.ru"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, services, blog, portfolio] = await Promise.all([
    getContent({
      collection: "pages",
      fields: ["slug"],
      status: "published",
    }),

    getContent({
      collection: "services",
      fields: ["slug"],
      status: "published",
    }),
    getContent({
      collection: "blog",
      fields: ["slug"],
      status: "published",
    }),
    getContent({
      collection: "portfolio",
      fields: ["slug"],
      status: "published",
    }),
  ])

  return [
    {
      url: "https://acme.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://acme.com/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://acme.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ]
}
