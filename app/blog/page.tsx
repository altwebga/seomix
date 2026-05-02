import Link from "next/link"
import { getContent } from "@/actions/get-content"
import { PageHeading } from "@/components/shared/page-heading"
import { IPost } from "@/lib/types"
import { BlogCard } from "@/components/card/blog-card"
import type { Metadata } from "next"
import { getMetadataBySlug } from "@/lib/get-metadata"

export async function generateMetadata(): Promise<Metadata> {
  return getMetadataBySlug("pages", "blog")
}

export default async function BlogPage() {
  const posts = await getContent<IPost>({
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
      "category",
      "tags",
    ],
    status: "published",
  })

  return (
    <div className="container mx-auto my-8 px-4">
      <PageHeading
        title="Блог"
        description="Заметки по web-разработке в основном что-бы не забыть"
      />
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
