import {
  TronCard,
  TronCardContent,
  TronCardHeader,
  TronCardTitle,
  TronCardDescription,
} from "@/components/thegridcn/card"
import { DirectusImage } from "../shared/directus-image"

interface CarouselItemProps {
  title: string
  image: string
  description: string
}

export function PortfolioCard({
  title,
  image,
  description,
}: CarouselItemProps) {
  return (
    <TronCard>
      <TronCardHeader>
        <TronCardTitle>{title}</TronCardTitle>
        <TronCardDescription>{description}</TronCardDescription>
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
