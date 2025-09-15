type DirectusImageOptions = {
  width?: number;
  height?: number;
  fit?: "cover" | "contain" | "inside" | "outside";
  quality?: number;
  format?: "jpg" | "png" | "webp" | "avif";
};

export function getDirectusImage(
  id?: string,
  opts: DirectusImageOptions = {}
): string {
  if (!id) {
    return "/images/no-image.png"; // запасная картинка
  }

  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL;
  if (!baseUrl) {
    console.warn("NEXT_PUBLIC_IMAGE_URL is not defined");
    return "/images/no-image.png";
  }

  const params = new URLSearchParams();

  if (opts.width) params.append("width", String(opts.width));
  if (opts.height) params.append("height", String(opts.height));
  if (opts.fit) params.append("fit", opts.fit);
  if (opts.quality) params.append("quality", String(opts.quality));
  if (opts.format) params.append("format", opts.format);

  return `${baseUrl}/${id}${params.size ? "?" + params.toString() : ""}`;
}
