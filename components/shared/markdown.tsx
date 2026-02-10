import ReactMarkdown from "react-markdown";
import { slugify } from "@/lib/utils";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Image from "next/image";
import { ReactNode, Children, isValidElement } from "react";

const getNodeText = (node: ReactNode): string => {
  if (node == null) return "";
  if (typeof node === "string" || typeof node === "number")
    return node.toString();
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (isValidElement(node)) {
    const props = node.props as { children: ReactNode };
    return getNodeText(props.children);
  }
  return "";
};

type Props = { markdown: string; className?: string };

export function Markdown({ markdown, className }: Props) {
  return (
    <article className={className ?? "prose"}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }]]}
        components={{
          a: (props) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="text-chart-2 underline"
            />
          ),
          img: ({ src, alt }) => {
            if (!src) return null;
            return (
              <Image
                src={src as string}
                alt={alt ?? ""}
                width={800}
                height={600}
                className="w-full h-auto"
              />
            );
          },
          ul: ({ children }) => <ul className="list-disc ml-4">{children}</ul>,
          li: ({ children }) => <li className="list-disc ml-4">{children}</li>,
          h1: ({ children }) => (
            <h1 className="text-4xl mt-4 mb-2">{children}</h1>
          ),
          h2: ({ children }) => {
            const text = getNodeText(children);
            const id = slugify(text);
            return (
              <h2 id={id} className="text-3xl mt-4 mb-2 scroll-mt-20">
                {children}
              </h2>
            );
          },
          h3: ({ children }) => {
            const text = getNodeText(children);
            const id = slugify(text);
            return (
              <h3 id={id} className="text-2xl mt-4 mb-2 scroll-mt-20">
                {children}
              </h3>
            );
          },
          h4: ({ children }) => (
            <h4 className="text-xl mt-4 mb-2 scroll-mt-20">{children}</h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-lg mt-4 mb-2">{children}</h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-base mt-4 mb-2">{children}</h6>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
