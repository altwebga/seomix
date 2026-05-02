import {
  TronCard,
  TronCardContent,
  TronCardHeader,
  TronCardTitle,
  TronCardDescription,
} from "@/components/thegridcn/card"
import { Hash } from "lucide-react"
import { Badge } from "../thegridcn/badge"
import { DirectusImage } from "../shared/directus-image"

interface BlogCardProps {
  title: string
  description: string
  image: string
  data: string
  tags: string[]
}

export function BlogCard({
  title,
  description,
  image,
  data,
  tags,
}: BlogCardProps) {
  return (
    <TronCard className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <TronCardHeader>
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge dot>{new Date(data).toLocaleDateString()}</Badge>
          {tags &&
            tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 rounded border border-primary/20 bg-primary/5 px-2.5 py-0.5 font-mono text-[10px] tracking-wider text-primary/70 uppercase transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Hash className="h-2.5 w-2.5" />
                {tag}
              </span>
            ))}
        </div>

        <TronCardTitle className="min-h-14">{title}</TronCardTitle>
        <TronCardDescription className="line-clamp-3 min-h-14">
          {description}
        </TronCardDescription>
      </TronCardHeader>
      <TronCardContent>
        <DirectusImage
          url={image}
          alt={title}
          width={600}
          height={600}
          className="aspect-3/2 object-contain"
        />
      </TronCardContent>
    </TronCard>
  )
}
