import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface RelatedArticlesProps {
  posts: {
    title: string
    excerpt: string | null
    date_created: string
    slug: string
  }[]
}

export function RelatedArticles({ posts }: RelatedArticlesProps) {
  return (
    <div className="mt-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-primary/10" />
        <span className="text-xs font-semibold tracking-wider text-foreground/50 uppercase">
          Похожие статьи
        </span>
        <div className="h-px flex-1 bg-primary/10" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((post) => (
          <Link
            key={post.title}
            href={`/blog/${post.slug}`}
            className="group relative overflow-hidden rounded border border-primary/20 bg-card/80 p-4 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-[0_0_20px_rgba(var(--primary-rgb,0,180,255),0.08)]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)]" />
            <div className="relative">
              <div className="flex items-center gap-3 text-foreground/40">
                <span className="font-mono text-[10px] tracking-widest uppercase">
                  {new Date(post.date_created).toLocaleDateString("ru-RU")}
                </span>
                <span className="font-mono text-[10px]">/</span>
                <span className="font-mono text-[10px] tracking-widest uppercase">
                  2 мин
                </span>
              </div>
              <h3 className="mt-2 text-xs font-bold tracking-wider text-foreground uppercase transition-colors group-hover:text-primary">
                {post.title}
              </h3>
              <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-foreground/50">
                {post.excerpt}
              </p>
              <div className="mt-3 flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-primary/60 uppercase transition-colors group-hover:text-primary">
                Подробнее
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
            {/* Corner decorations */}
            <div className="pointer-events-none absolute top-0 left-0 h-2.5 w-2.5 border-t-2 border-l-2 border-primary/20 transition-colors group-hover:border-primary/40" />
            <div className="pointer-events-none absolute right-0 bottom-0 h-2.5 w-2.5 border-r-2 border-b-2 border-primary/20 transition-colors group-hover:border-primary/40" />
          </Link>
        ))}
      </div>
    </div>
  )
}
