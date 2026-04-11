import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { DirectusImage } from "./directus-image";
import { TronCodeBlock, InstallCommand } from "../thegridcn";

type Props = {
  markdown: string;
  className?: string;
  headings?: { label: string; id: string }[];
};

function extractText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (React.isValidElement(children)) {
    return extractText(
      (children.props as { children?: React.ReactNode }).children,
    );
  }
  return "";
}

export function Markdown({ markdown, className, headings }: Props) {
  let h2Index = 0;
  return (
    <article className={className ?? "prose"}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }]]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
          ),
          h2: ({ children }) => {
            const id = headings?.[h2Index]?.id;
            h2Index++;
            return (
              <h2
                id={id}
                className="text-3xl font-bold mt-8 mb-3 scroll-mt-[75px]"
              >
                {children}
              </h2>
            );
          },
          h3: ({ children }) => (
            <h3 className="text-2xl font-semibold mt-6 mb-3">{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-xl font-semibold mt-6 mb-2">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-lg font-semibold mt-4 mb-2">{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-base font-semibold mt-4 mb-2">{children}</h6>
          ),
          p: ({ children }) => <p className="leading-7 mb-4">{children}</p>,
          ul: ({ children }) => (
            <ul className="list-disc list-outside pl-6 mb-4 space-y-1">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside pl-6 mb-4 space-y-1">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-7">{children}</li>,
          a: (props) => (
            <a {...props} target="_blank" rel="noopener noreferrer" />
          ),
          img: ({ src, alt }) => {
            if (!src) return null;
            return (
              <DirectusImage
                url={src as string}
                alt={alt ?? ""}
                width={800}
                height={600}
                className="w-full h-auto"
              />
            );
          },
          pre: ({ children }) => {
            const code = React.Children.toArray(children)[0];
            if (React.isValidElement(code)) {
              const codeProps = code.props as {
                className?: string;
                children?: React.ReactNode;
              };
              const language =
                /language-(\w+)/.exec(codeProps.className ?? "")?.[1] ?? "";

              if (["bash", "sh", "shell"].includes(language)) {
                const text = extractText(codeProps.children).replace(/\n$/, "");
                return (
                  <InstallCommand
                    command={text}
                    packageName="bash"
                    packageManager="bun"
                  />
                );
              }
            }
            return <pre>{children}</pre>;
          },
          code: ({ className, children }) => {
            const match = /language-(\w+)/.exec(className ?? "");
            const language = match ? match[1] : "";

            if (!match) {
              return <code className={className}>{children}</code>;
            }

            const code = extractText(children).replace(/\n$/, "");

            return (
              <TronCodeBlock code={code} language={language} className="my-4" />
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
