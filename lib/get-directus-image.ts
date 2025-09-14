type DirectusImageOptions = {
  width?: number;
  height?: number;
  fit?: "cover" | "contain" | "inside" | "outside";
  quality?: number;
  format?: "jpg" | "png" | "webp" | "avif";
};

export function getDirectusImage(
  id: string,
  opts: DirectusImageOptions = {}
): string {
  if (!id) return "";

  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";
  const params = new URLSearchParams();

  if (opts.width) params.append("width", String(opts.width));
  if (opts.height) params.append("height", String(opts.height));
  if (opts.fit) params.append("fit", opts.fit);
  if (opts.quality) params.append("quality", String(opts.quality));
  if (opts.format) params.append("format", opts.format);

  return `${baseUrl}/${id}${params.toString() ? "?" + params.toString() : ""}`;
}
