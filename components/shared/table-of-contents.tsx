import { slugify } from "@/lib/utils";

type Props = {
  markdown: string;
};

export function TableOfContents({ markdown }: Props) {
  const matches = markdown.matchAll(/^(#{2,4})\s+(.+)$/gm);
  const headers = Array.from(matches).map((match) => {
    // Strip markdown links [text](url) -> text
    const text = match[2].replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1");
    // Strip other simple markdown if needed, e.g. **bold**, *italic*
    const cleanText = text.replace(/[*_~`]/g, "");

    return {
      level: match[1].length,
      text: cleanText,
      id: slugify(cleanText),
    };
  });

  if (headers.length === 0) return null;

  return (
    <nav className="sticky top-20 max-h-[calc(100vh-100px)] overflow-auto rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
      <h2 className="mb-4 text-lg font-semibold tracking-tight">Содержание</h2>
      <ul className="space-y-2 text-sm">
        {headers.map((header, index) => (
          <li
            key={index}
            style={{ paddingLeft: `${(header.level - 2) * 12}px` }}
          >
            <a
              href={`#${header.id}`}
              className="block text-muted-foreground transition-colors hover:text-foreground line-clamp-2"
            >
              {header.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
