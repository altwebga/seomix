"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  CodeBlock as BaseCodeBlock,
  CodeBlockHeader,
  CodeBlockIcon,
  CodeBlockGroup,
  CodeBlockContent,
} from "@/components/code-block/code-block"
import { CodeBlockShiki } from "@/components/code-block/shiki"
import { CopyButton } from "@/components/thegridcn/copy-button"

interface TronCodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
}

export function TronCodeBlock({
  code,
  language = "tsx",
  filename,
  showLineNumbers = true,
  className,
  ...props
}: TronCodeBlockProps) {
  const displayLabel = filename || language

  return (
    <div
      data-slot="tron-code-block"
      className={cn(
        "relative overflow-hidden rounded border border-[#d4d4d4] bg-[#ffffff] dark:border-[#3c3c3c] dark:bg-[#1e1e1e]",
        "shadow-sm",
        className
      )}
      {...props}
    >
      <BaseCodeBlock>
        {/* Header bar */}
        <CodeBlockHeader>
          <CodeBlockGroup>
            <CodeBlockIcon language={language} />
            <span className="font-mono text-[11px] text-[#616161] dark:text-[#cccccc]">
              {displayLabel}
            </span>
          </CodeBlockGroup>
          <CopyButton
            value={code}
            variant="ghost"
            size="sm"
            className="text-[#616161] hover:bg-[#e8e8e8] hover:text-[#333333] dark:text-[#cccccc] dark:hover:bg-[#2a2d2e] dark:hover:text-[#ffffff]"
          />
        </CodeBlockHeader>

        {/* Code content */}
        <CodeBlockContent>
          <CodeBlockShiki
            code={code}
            language={language}
            lineNumbers={showLineNumbers}
          />
        </CodeBlockContent>
      </BaseCodeBlock>
    </div>
  )
}
