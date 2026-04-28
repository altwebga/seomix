"use client"

import { useEffect, useState, type ComponentProps } from "react"
import { cn } from "@/lib/utils"

interface CodeBlockShikiProps extends ComponentProps<"div"> {
  code: string
  language?: string
  lineNumbers?: boolean
}

const CodeBlockShiki = ({
  code,
  language = "tsx",
  lineNumbers = true,
  className,
  ...props
}: CodeBlockShikiProps) => {
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null)

  useEffect(() => {
    async function clientHighlight() {
      if (!code) {
        setHighlightedHtml("<pre><code></code></pre>")
        return
      }

      const { codeToHtml } = await import("shiki")

      const html = await codeToHtml(code, {
        lang: language,
        themes: {
          light: "light-plus",
          dark: "dark-plus",
        },
        defaultColor: false,
        transformers: [
          {
            name: "AddLineNumbers",
            pre(node) {
              if (lineNumbers) {
                const existing = (node.properties.class as string) || ""
                node.properties.class = `${existing} shiki-line-numbers`
              }
            },
          },
        ],
      })

      setHighlightedHtml(html)
    }

    void clientHighlight()
  }, [code, language, lineNumbers])

  const classNames = cn(
    "w-full overflow-x-auto bg-[#ffffff] dark:bg-[#1e1e1e]",
    "[&_pre]:m-0 [&_pre]:min-w-max [&_pre]:p-3",
    className
  )

  return highlightedHtml ? (
    <div
      className={classNames}
      dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      {...props}
    />
  ) : (
    <div className={classNames} {...props}>
      <pre className="p-4">
        <code className="text-foreground/40">{code}</code>
      </pre>
    </div>
  )
}

export { CodeBlockShiki }
