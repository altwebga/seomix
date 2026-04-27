import React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import { DirectusImage } from "./directus-image"
import { InstallCommand } from "../thegridcn/install-command"
import { TronCodeBlock } from "../thegridcn/code-block"

type Props = {
  markdown: string
  className?: string
  headings?: { label: string; id: string }[]
}

function extractText(children: React.ReactNode): string {
  if (typeof children === "string") return children
  if (typeof children === "number") return String(children)
  if (Array.isArray(children)) return children.map(extractText).join("")
  if (React.isValidElement(children)) {
    return extractText(
      (children.props as { children?: React.ReactNode }).children
    )
  }
  return ""
}

export function Markdown({ markdown, className, headings }: Props) {
  let h2Index = 0
  return (
    <article className={className ?? "content-markdown"}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }]]}
        components={{
          h1: ({ children }) => <h1>{children}</h1>,
          h2: ({ children }) => {
            const id = headings?.[h2Index]?.id
            h2Index++
            return <h2 id={id}>{children}</h2>
          },
          h3: ({ children }) => <h3>{children}</h3>,
          h4: ({ children }) => <h4>{children}</h4>,
          h5: ({ children }) => <h5>{children}</h5>,
          h6: ({ children }) => <h6>{children}</h6>,
          a: (props) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),
          img: ({ src, alt }) => {
            if (!src) return null
            return (
              <DirectusImage
                url={src as string}
                alt={alt ?? ""}
                width={800}
                height={600}
                className="h-auto w-full"
              />
            )
          },
          pre: ({ children }) => {
            const code = React.Children.toArray(children)[0]
            if (React.isValidElement(code)) {
              const codeProps = code.props as {
                className?: string
                children?: React.ReactNode
              }
              const language =
                /language-(\w+)/.exec(codeProps.className ?? "")?.[1] ?? ""

              if (["bash", "sh", "shell"].includes(language)) {
                const text = extractText(codeProps.children).replace(/\n$/, "")
                return (
                  <InstallCommand
                    command={text}
                    packageName="bash"
                    packageManager="bun"
                  />
                )
              }
            }
            return <pre>{children}</pre>
          },
          code: ({ className, children }) => {
            const match = /language-(\w+)/.exec(className ?? "")
            const language = match ? match[1] : ""

            if (!match) {
              return <code className={className}>{children}</code>
            }

            const code = extractText(children).replace(/\n$/, "")

            return (
              <TronCodeBlock code={code} language={language} className="my-4" />
            )
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  )
}
