import Link from "next/link"
import { getContent } from "@/actions/get-content"
import { PageHeading } from "@/components/shared/page-heading"
import { IPost, ICategory, IBlogCategories } from "@/lib/types"
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
  const hasActiveCategory = Number.isInteger(activeCategoryId) && activeCategoryId > 0

  const postFields = [
    "id",
    "slug",
    "sort",
    "status",
    "date_created",
    "title",
    "excerpt",
    "cover_image",
    "tags",
  ]

  const [categories, categoryLinks] = await Promise.all([
    getContent<ICategory>({
      collection: "categories",
      fields: ["*"],
      status: null,
    }),
    hasActiveCategory
      ? getContent<IBlogCategories>({
          collection: "blog_categories",
          fields: ["blog_id"],
          status: null,
          filters: {
            "[categories_id][_eq]": activeCategoryId,
          },
        })
      : Promise.resolve([]),
  ])

  const postIds = categoryLinks
    .map(({ blog_id }) => (typeof blog_id === "number" ? blog_id : blog_id?.id))
    .filter((id): id is number => Boolean(id))

  const posts = hasActiveCategory
    ? postIds.length > 0
      ? await getContent<IPost>({
          collection: "blog",
          fields: postFields,
          status: "published",
          filters: {
            "[id][_in]": postIds.join(","),
          },
        })
      : []
    : await getContent<IPost>({
        collection: "blog",
        fields: postFields,
        status: "published",
      })

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
