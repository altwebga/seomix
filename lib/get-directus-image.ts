export type DirectusImageOptions = {
  width?: number;
  height?: number;
  fit?: "cover" | "contain" | "inside" | "outside";
  quality?: number; // 1..100
  format?: "jpg" | "png" | "webp" | "avif";
};

function clampQuality(q?: number) {
  if (q == null) return undefined;
  return Math.min(100, Math.max(1, Math.round(q)));
}

/** Возвращает прямую ссылку на картинку Directus или запасную */
export function getDirectusImage(
  id?: string,
  opts: DirectusImageOptions = {}
): string {
  if (!id) return "/images/no-image.png";

  // если пришёл уже полный URL — просто добавим параметры
  const isAbsolute = /^https?:\/\//i.test(id);
  const baseUrl = isAbsolute
    ? id.replace(/\/$/, "")
    : `${(process.env.NEXT_PUBLIC_IMAGE_URL || "").replace(/\/$/, "")}/${id}`;

  if (!isAbsolute && !process.env.NEXT_PUBLIC_IMAGE_URL) {
    console.warn("NEXT_PUBLIC_IMAGE_URL is not defined");
    return "/images/no-image.png";
  }

  const params = new URLSearchParams();
  if (opts.width) params.set("width", String(opts.width));
  if (opts.height) params.set("height", String(opts.height));
  if (opts.fit) params.set("fit", opts.fit);
  const q = clampQuality(opts.quality);
  if (q) params.set("quality", String(q));
  if (opts.format) params.set("format", opts.format);

  const qs = params.toString();
  return qs ? `${baseUrl}?${qs}` : baseUrl;
}

/** Loader для next/image, чтобы оптимизатор подставлял параметры в Directus */
export const directusImageLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  // width обязателен от Next — пробрасываем его в Directus
  return getDirectusImage(src, {
    width,
    quality,
    fit: "cover",
  });
};
