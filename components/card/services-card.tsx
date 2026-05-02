import {
  TronCard,
  TronCardContent,
  TronCardHeader,
  TronCardTitle,
  TronCardDescription,
} from "@/components/thegridcn/card"
import { DirectusImage } from "../shared/directus-image"

interface ServicesCardProps {
  title: string
  description: string
  image: string
}

export function ServicesCard({ title, description, image }: ServicesCardProps) {
  return (
    <TronCard className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <TronCardHeader>
        <TronCardTitle>{title}</TronCardTitle>
        <TronCardDescription className="line-clamp-3">
          {description}
        </TronCardDescription>
      </TronCardHeader>
      <TronCardContent>
        <DirectusImage
          url={image}
          alt={title}
          width={600}
          height={600}
          className="h-auto w-full"
        />
      </TronCardContent>
    </TronCard>
  )
}
