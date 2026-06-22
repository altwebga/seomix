import Image from "next/image"
import { cn } from "@/lib/utils"

type DirectusImageProps = {
  url: string
  alt?: string
  width?: number
  height?: number
  className?: string
  loading?: "lazy" | "eager"
  preserveNaturalSize?: boolean
}

const assets = process.env.NEXT_PUBLIC_ASSETS?.replace(/\/$/, "")

export function getDirectusImageSrc(url: string) {
  const src = url.trim()

  if (!src) return src

  if (/^(https?:)?\/\//.test(src) || src.startsWith("data:")) {
    return src
  }

  if (!assets) return src

  if (src.startsWith("/assets/")) {
    return `${assets}${src.slice("/assets".length)}`
  }

  if (src.startsWith("assets/")) {
    return `${assets}/${src.slice("assets/".length)}`
  }

  return `${assets}/${src.replace(/^\/+/, "")}`
}

export function DirectusImage({
  url,
  loading = "lazy",
  alt = "",
  width = 300,
  height = 300,
  className = "",
  preserveNaturalSize = false,
}: DirectusImageProps) {
  const src = getDirectusImageSrc(url)

  if (preserveNaturalSize) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={cn("rounded-md", className)}
        loading={loading}
        decoding="async"
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("rounded-md", className)}
      loading={loading}
    />
  )
}
