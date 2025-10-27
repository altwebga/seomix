const FALLBACK_URL = "https://seomix.ru";

function getMetadataBase(): URL {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL ?? FALLBACK_URL;

  try {
    return new URL(candidate);
  } catch {
    return new URL(FALLBACK_URL);
  }
}

export const siteMetadata = {
  name: "SeoMix",
  shortName: "SeoMix",
  description:
    "SEO-продвижение, разработка и поддержка цифровых продуктов для бизнеса.",
  keywords: [
    "seo",
    "продвижение",
    "разработка сайтов",
    "digital маркетинг",
    "seomix",
  ],
  metadataBase: getMetadataBase(),
  creator: "SeoMix Studio",
  authors: [{ name: "SeoMix Studio", url: "https://seomix.ru" }],
  twitter: {
    card: "summary_large_image" as const,
    creator: "@seomix",
  },
};
