"use server";
import { gql } from "./gql";

/* ========= Общие типы ========= */
export type Seo = { title: string; meta_description: string };
export type Image = { id: string; title: string };

export type ContentBase = {
  id: string;
  status: "draft" | "published" | string;
  content_type: "portfolio" | "offer" | "service" | "post" | string;
  slug: string;
  title: string;
  description?: string | null;
  cover_image?: Image | null;
  release_date: string;
  seo: Seo;
};

/* ========= Варианты по content_type (дискриминируемое объединение) ========= */
export type PortfolioContent = ContentBase & {
  content_type: "portfolio";
  release_date?: string | null;
  video_id?: string | null;
  site_url?: string | null;
  client?: string | null;
  client_tag?: string | null;
  client_logo?: Image | null;
};

export type OfferContent = ContentBase & {
  content_type: "offer";
  from_city?: string | null;
  in_city?: string | null;
};

export type ServiceContent = ContentBase & {
  content_type: "service";
  price?: string | null;
};

export type PostContent = ContentBase & {
  content_type: "post";
  // при необходимости: content/html, cover_image и т.п.
};

export type AnyContent =
  | PortfolioContent
  | OfferContent
  | ServiceContent
  | PostContent;

/* ========= Фрагменты GraphQL, чтобы не дублировать ========= */
const FRAGMENT_BASE = `
  fragment ContentBase on content {
    id
    status
    content_type
    slug
    title
    description
    cover_image { id title }
    release_date
    seo
  }
`;

const FRAGMENT_PORTFOLIO = `
  fragment PortfolioFields on content {
    video_id
    site_url
    client
    client_tag
    client_logo { id title }
  }
`;

const FRAGMENT_OFFER = `
  fragment OfferFields on content {
    from_city
    in_city
  }
`;

const FRAGMENT_SERVICE = `
  fragment ServiceFields on content {
    price
  }
`;

/* ========= Лёгкий список для любого типа ========= */
export async function getContentLite(
  type: AnyContent["content_type"],
  status: string = "published"
) {
  const q = /* GraphQL */ `
    ${FRAGMENT_BASE}
    query GetContentLite($status: String!, $content_type: String!) {
      content(
        filter: {
          status: { _eq: $status }
          content_type: { _eq: $content_type }
        }
      ) {
        ...ContentBase
      }
    }
  `;
  return gql<{ content: ContentBase[] }>(q, { status, content_type: type });
}

/* ========= Детальная карточка по slug + типу =========
   — подмешиваем поля фрагментом в зависимости от типа
*/
export async function getContentBySlug<
  T extends AnyContent["content_type"]
>(params: { type: T; slug: string; status?: string }) {
  const { type, slug, status = "published" } = params;

  const typeFragment =
    type === "portfolio"
      ? FRAGMENT_PORTFOLIO
      : type === "offer"
      ? FRAGMENT_OFFER
      : type === "service"
      ? FRAGMENT_SERVICE
      : ""; // post без специфичных полей

  const q = /* GraphQL */ `
    ${FRAGMENT_BASE}
    ${typeFragment}
    query GetContent($type: String!, $slug: String!, $status: String!) {
      content(
        limit: 1
        filter: {
          content_type: { _eq: $type }
          slug: { _eq: $slug }
          status: { _eq: $status }
        }
      ) {
        ...ContentBase
        ${type === "portfolio" ? "...PortfolioFields" : ""}
        ${type === "offer" ? "...OfferFields" : ""}
        ${type === "service" ? "...ServiceFields" : ""}
      }
    }
  `;

  const data = await gql<{ content: AnyContent[] }>(
    q,
    { type, slug, status },
    { revalidate: 60 * 60 * 24, tags: ["content", `${type}:${slug}`] }
  );

  // Узкий тип по `type` (TS сужает по литералу)
  return (data.content?.[0] ?? null) as Extract<
    AnyContent,
    { content_type: T }
  > | null;
}
