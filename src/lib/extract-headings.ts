// lib/extract-headings.ts
export function extractH2Headings(markdown: string) {
  const regex = /^## (.+)$/gm;
  const headings: { label: string; id: string }[] = [];
  let match;
  while ((match = regex.exec(markdown)) !== null) {
    headings.push({
      label: match[1].trim(),
      id: crypto.randomUUID(),
    });
  }
  return headings;
}
