"use client"

import * as React from "react"
import { Modal } from "@/components/thegridcn/modal"
import { DirectusImage } from "@/components/shared/directus-image"

interface ImageModalProps {
  image: string
  alt?: string
}

export function ImageModal({
  image,
  alt = "Открыть изображение",
}: ImageModalProps) {
  const [open, setOpen] = React.useState(false)

  if (!image) return null

  return (
    <>
      {/* ТРИГГЕР (миниатюра) */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group overflow-hidden rounded border border-primary/20"
        aria-label={`Открыть изображение: ${alt}`}
      >
        <DirectusImage
          url={image}
          alt={alt}
          width={140}
          height={100}
          className="aspect-4/3 w-40 object-cover transition group-hover:scale-105"
        />
      </button>

      {/* МОДАЛКА */}
      <Modal open={open} onClose={() => setOpen(false)} size="lg" title={alt}>
        <DirectusImage
          url={image}
          alt={alt}
          width={1200}
          height={900}
          className="w-full object-contain"
        />
      </Modal>
    </>
  )
}
