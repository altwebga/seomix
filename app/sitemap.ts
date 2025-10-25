// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getContent } from "@/actions/fetch-data";
import { GET_ALL } from "@/config/queries";
import { menuLinks } from "@/config/menu-links";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://acme.com";

type NodeWithSlug = { slug: string; updated_at?: string | null };

function lastMod(d?: string | null) {
  try {
    return d ? new Date(d) : new Date();
  } catch {
    return new Date();
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await getContent<{
    articles: NodeWithSlug[];
    projects: NodeWithSlug[];
    services: NodeWithSlug[];
  }>(GET_ALL, { revalidate: 3600 * 24 });

  const articles = (data?.articles ?? []).filter(Boolean);
  const projects = (data?.projects ?? []).filter(Boolean);
  const services = (data?.services ?? []).filter(Boolean);

  // Статические страницы
  const staticEntries: MetadataRoute.Sitemap = menuLinks.map((link) => ({
    url: `${BASE_URL}${link.href}`,
    lastModified: new Date(),
    changeFrequency: link.changeFrequency ?? "monthly",
    priority: link.priority ?? 0.5,
  }));

  // Динамические: аккуратно формируем URL'ы
  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/blog/${a.slug}`,
    lastModified: lastMod(a.updated_at),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/portfolio/${p.slug}`,
    lastModified: lastMod(p.updated_at),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const serviceEntries: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: lastMod(s.updated_at),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Склеиваем и (на всякий) убираем дубликаты
  const all = [
    ...staticEntries,
    ...articleEntries,
    ...projectEntries,
    ...serviceEntries,
  ];

  const unique = Array.from(new Map(all.map((i) => [i.url, i])).values());

  return unique;
}
