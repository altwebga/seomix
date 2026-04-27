import { RelatedArticles } from "@/components/shared/related-articles"
import { TableContent } from "@/components/shared/table-content"
import { Hash } from "lucide-react"
import { extractH2Headings } from "@/lib/extract-headings"
import { BreadcrumbNav } from "@/components/thegridcn/breadcrumb-nav"
import { GlowContainer } from "@/components/thegridcn/glow-container"
import { getContent } from "@/actions/get-content"
import { IPost } from "@/lib/types"
import { DirectusImage } from "@/components/shared/directus-image"
import { Markdown } from "@/components/shared/markdown"
import { CallToAction } from "@/components/shared/call-to-action"

import type { Metadata } from "next"
import { getMetadataBySlug } from "@/lib/get-metadata"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params

  return getMetadataBySlug("blog", slug)
}

export default async function BlogSinglePage({ params }: PageProps) {
  const { slug } = await params

  const res = await getContent<IPost>({
    collection: "blog",
    fields: ["title", "cover_image", "tags", "description", "id"],
    status: "published",
    slug: slug,
  })

  const article = res[0]

  const posts = await getContent<IPost>({
    collection: "blog",
    fields: ["id", "title", "slug", "excerpt", "date_created"],
    status: "published",
  })

  const headings = extractH2Headings(article.description)
  return (
    <div className="container mx-auto my-8 px-4">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="w-full md:w-2/3">
          <BreadcrumbNav
            className="mb-2"
            items={[
              { label: "Главная", href: "/" },
              { label: "Блог", href: "/blog" },
              { label: article.title, active: true },
            ]}
          />
          <div className="mb-4 flex flex-wrap gap-2">
            {article.tags &&
              article.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded border border-primary/20 bg-primary/5 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-primary/70 uppercase transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Hash className="h-2.5 w-2.5" />
                  {tag}
                </span>
              ))}
          </div>
          <h1 className="mb-8 text-2xl font-bold tracking-wider text-foreground uppercase md:text-3xl lg:text-4xl">
            {article.title}
          </h1>
          {/* Hero Image Placeholder */}
          <div className="relative mb-10 overflow-hidden rounded border border-primary/20">
            <div className="aspect-ratio: 21/9 bg-linear-to-br from-primary/10 via-background to-primary/5">
              {/* Grid pattern overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary-rgb,0,180,255),0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-rgb,0,180,255),0.06)_1px,transparent_1px)] bg-size-[40px_40px]" />
              {/* Center label */}
              <div className="flex h-full items-center justify-center">
                <DirectusImage
                  url={article.cover_image}
                  className="object-contain p-4"
                  alt={article.title}
                  width={600}
                  height={600}
                />
              </div>
            </div>
            {/* Corner decorations */}
            <div className="pointer-events-none absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-primary/40" />
            <div className="pointer-events-none absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-primary/40" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-primary/40" />
            <div className="pointer-events-none absolute right-0 bottom-0 h-4 w-4 border-r-2 border-b-2 border-primary/40" />
          </div>
          <Markdown markdown={article.description} headings={headings} />

          {posts.length > 0 && (
            <RelatedArticles
              posts={posts.filter((post: IPost) => post.id !== article.id)}
            />
          )}
        </div>

        <aside className="hidden min-h-screen w-full md:block md:w-1/3">
          <div className="sticky top-20 h-fit">
            <GlowContainer className="flex flex-col gap-4">
              <TableContent headings={headings} />
              <CallToAction
                title="Готовы начать?"
                primaryAction="Связаться с нами"
                description="Оставьте заявку и мы поможем"
                secondaryAction={{ label: "Наши услуги", url: "/services" }}
              />
            </GlowContainer>
          </div>
        </aside>
      </div>
    </div>
  )
}
