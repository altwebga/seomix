import { getContentItem, getContent } from "@/actions/get-content";
import { DirectusImage } from "@/components/shared/directus-image";
import { RelatedArticles } from "@/components/shared/related-articles";
import { TableContent } from "@/components/shared/table-content";
import { GlowContainer, BreadcrumbNav } from "@/components/thegridcn";
import { Markdown } from "@/components/shared/markdown";
import { Hash } from "lucide-react";
import { extractH2Headings } from "@/lib/extract-headings";
import { CTA } from "@/components/layout/cta";

export default async function BlogSinglePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getContentItem({
    slug,
    content_type: "article",
    fields: ["id", "title", "slug", "description", "cover_image", "tags"],
  });
  const posts = await getContent({
    content_type: "article",
    fields: ["id", "title", "slug", "short_description", "date_created"],
    limit: 4,
  });

  const headings = extractH2Headings(article.description);
  return (
    <div className="container mx-auto px-4 my-8 ">
      <div className="flex flex-col md:flex-row gap-8">
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
                  className="inline-flex items-center gap-1 rounded border border-primary/20 bg-primary/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary/70 transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Hash className="h-2.5 w-2.5" />
                  {tag}
                </span>
              ))}
          </div>
          <h1 className="text-2xl font-bold uppercase tracking-wider text-foreground md:text-3xl lg:text-4xl mb-8">
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
            <div className="pointer-events-none absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-primary/40" />
            <div className="pointer-events-none absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-primary/40" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-primary/40" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-primary/40" />
          </div>
          <Markdown markdown={article.description} headings={headings} />

          {posts.length > 0 && (
            <RelatedArticles
              posts={posts.filter((post: any) => post.id !== article.id)}
            />
          )}
        </div>

        <aside className="w-full md:w-1/3 min-h-screen hidden md:block">
          <div className="sticky top-20 h-fit">
            <GlowContainer className="flex flex-col gap-4">
              <TableContent headings={headings} />
              <CTA />
            </GlowContainer>
          </div>
        </aside>
      </div>
    </div>
  );
}
