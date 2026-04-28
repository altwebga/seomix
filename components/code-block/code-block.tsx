import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"
import { FileIcon } from "@react-symbols/icons/utils"

const CodeBlock = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "not-prose",
        "flex w-full flex-col overflow-hidden",
        "bg-[#ffffff] text-[#000000] dark:bg-[#1e1e1e] dark:text-[#d4d4d4]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

type CodeBlockHeaderProps = ComponentProps<"div">

const CodeBlockHeader = ({
  children,
  className,
  ...props
}: CodeBlockHeaderProps) => {
  return (
    <div
      className={cn(
        "not-prose",
        "flex h-9 items-center justify-between px-3 py-1.5",
        "border-b border-[#d4d4d4] bg-[#f3f3f3] dark:border-[#3c3c3c] dark:bg-[#252526]",
        "text-sm text-[#616161] dark:text-[#cccccc]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface CodeBlockIconProps extends ComponentProps<"div"> {
  language?: string
}

const CodeBlockIcon = ({ language, className }: CodeBlockIconProps) => {
  return (
    <FileIcon
      width={16}
      height={16}
      fileName={`.${language ?? ""}`}
      autoAssign={true}
      className={cn(className)}
    />
  )
}

type CodeBlockGroupProps = ComponentProps<"div">

const CodeBlockGroup = ({
  children,
  className,
  ...props
}: CodeBlockGroupProps) => {
  return (
    <div
      className={cn(
        "flex items-center space-x-2",
        "text-sm text-[#616161] dark:text-[#cccccc]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const CodeBlockContent = ({
  className,
  children,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "overflow-hidden",
        "bg-[#ffffff] dark:bg-[#1e1e1e]",
        "font-mono text-sm leading-5 whitespace-pre",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export {
  CodeBlock,
  CodeBlockHeader,
  CodeBlockIcon,
  CodeBlockGroup,
  CodeBlockContent,
}
