import Link from "next/link"
import { getContent } from "@/actions/get-content"
import { PageHeading } from "@/components/shared/page-heading"
import { IPost, ICategory } from "@/lib/types"
import { BlogCard } from "@/components/card/blog-card"
import type { Metadata } from "next"
import { getMetadataBySlug } from "@/lib/get-metadata"
import { Button } from "@/components/ui/button"

export async function generateMetadata(): Promise<Metadata> {
  return getMetadataBySlug("pages", "blog")
}

type BlogPageProps = {
  searchParams: Promise<{
    category?: string
  }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams
  const activeCategoryId = Number(category)
  const hasActiveCategory = Number.isInteger(activeCategoryId)

  const [posts, categories] = await Promise.all([
    getContent<IPost>({
      collection: "blog",
      fields: [
        "id",
        "slug",
        "sort",
        "status",
        "date_created",
        "title",
        "excerpt",
        "cover_image",
        "category.categories_id",
        "tags",
      ],
      status: "published",
      filters: hasActiveCategory
        ? {
            "[category][categories_id][id][_eq]": activeCategoryId,
          }
        : undefined,
    }),
    getContent<ICategory>({
      collection: "categories",
      fields: ["*"],
      status: null,
    }),
  ])

  return (
    <div className="container mx-auto my-8 px-4">
      <PageHeading
        title="Блог"
        description="Заметки по web-разработке в основном что-бы не забыть"
      />
      <div className="my-4 flex flex-wrap gap-2">
        <Button
          className="min-w-24"
          asChild
          variant={hasActiveCategory ? "outline" : "default"}
        >
          <Link href="/blog">Все</Link>
        </Button>
        {categories.map((category: ICategory) => (
          <Button
            className="min-w-32"
            key={category.id}
            asChild
            variant={activeCategoryId === category.id ? "default" : "outline"}
          >
            <Link href={`/blog?category=${category.id}`}>{category.title}</Link>
          </Button>
        ))}
      </div>
      <div className="my-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: IPost) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <BlogCard
              title={post.title}
              description={post.excerpt}
              image={post.cover_image}
              data={post.date_created}
              tags={post.tags}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
