// app/sitemap.ts
import type { MetadataRoute } from "next"
import { getContent } from "@/actions/get-content"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://seomix.ru"

type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never"

interface SitemapItem {
  slug: string
  date_updated?: string | null
  date_created?: string | null
  seo?: {
    sitemap?: {
      priority?: string | null
      change_frequency?: ChangeFrequency | null
    } | null
  } | null
}

function normalizePriority(
  priority: string | null | undefined,
  fallback: number
): number {
  if (!priority) return fallback

  const value = Number(priority)

  if (Number.isNaN(value)) return fallback
  if (value < 0) return 0
  if (value > 1) return 1

  return value
}

function getLastModified(item: SitemapItem): Date {
  const rawDate = item.date_updated || item.date_created
  const date = rawDate ? new Date(rawDate) : null

  return date && !Number.isNaN(date.getTime()) ? date : new Date()
}

function createUrl(path: string): string {
  return `${BASE_URL}${path === "/" ? "" : path}`
}

function createSitemapItem(
  path: string,
  item: SitemapItem,
  fallbackPriority = 0.5
): MetadataRoute.Sitemap[number] {
  return {
    url: createUrl(path),
    lastModified: getLastModified(item),
    changeFrequency: item.seo?.sitemap?.change_frequency ?? "weekly",
    priority: normalizePriority(item.seo?.sitemap?.priority, fallbackPriority),
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, services, blog, portfolio] = await Promise.all([
    getContent<SitemapItem>({
      collection: "pages",
      fields: ["slug", "seo", "date_updated", "date_created"],
      status: "published",
    }),
    getContent<SitemapItem>({
      collection: "services",
      fields: ["slug", "seo", "date_updated", "date_created"],
      status: "published",
    }),
    getContent<SitemapItem>({
      collection: "blog",
      fields: ["slug", "seo", "date_updated", "date_created"],
      status: "published",
    }),
    getContent<SitemapItem>({
      collection: "portfolio",
      fields: ["slug", "seo", "date_updated", "date_created"],
      status: "published",
    }),
  ])

  return [
    ...pages.map((page) =>
      createSitemapItem(page.slug === "home" ? "/" : `/${page.slug}`, page, 0.8)
    ),

    ...services.map((service) =>
      createSitemapItem(`/services/${service.slug}`, service, 0.8)
    ),

    ...portfolio.map((item) =>
      createSitemapItem(`/portfolio/${item.slug}`, item, 0.3)
    ),

    ...blog.map((post) => createSitemapItem(`/blog/${post.slug}`, post, 0.5)),
  ]
}
