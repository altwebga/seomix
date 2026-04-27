"use client"

import { useEffect, useState, type ComponentProps } from "react"

import { cn } from "@/lib/utils"
import { CheckIcon, CopyIcon } from "lucide-react"

interface CopyButtonProps extends ComponentProps<"button"> {
  content: string
  iconSize?: number
}

const CopyButton = ({
  content,
  iconSize = 14,
  className,
  ...props
}: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false)

  useEffect(() => {
    if (!isCopied) return

    const timeout = setTimeout(() => {
      setIsCopied(false)
    }, 2000)
    return () => clearTimeout(timeout)
  }, [isCopied])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setIsCopied(true)
  }

  return (
    <button
      type="button"
      title="Скопировать в буфер обмена"
      aria-label={isCopied ? "Скопировано" : "Скопировать в буфер обмена"}
      className={cn(
        "cursor-pointer",
        "transition-colors duration-200 ease-in-out",
        "text-foreground/30",
        "hover:text-primary",
        className
      )}
      onClick={handleCopy}
      {...props}
    >
      {isCopied ? (
        <CheckIcon
          size={iconSize}
          className="animate-in text-emerald-400 duration-200 zoom-in-50"
          aria-hidden="true"
        />
      ) : (
        <CopyIcon
          size={iconSize}
          className="animate-in duration-200 zoom-in-50"
          aria-hidden="true"
        />
      )}
    </button>
  )
}

export { CopyButton }
