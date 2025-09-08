"use server";
import { gql } from "./gql";

export type OfferLite = {
  slug: string;
  title: string | null;
};

export type OfferSEO = {
  seoTitle: string | null;
  seoDescription: string | null;
};

export type OfferExtra = {
  vGorode: string | null;
  izGoroda: string | null;
  seo: OfferSEO | null;
};

export type Offer = {
  slug: string;
  title: string | null;
  content: string | null;
  cityExtra?: OfferExtra;
};

export async function getOffers() {
  const q = /* GraphQL */ `
    query Offers {
      offers {
        nodes {
          slug
          title
        }
      }
    }
  `;
  return gql<{ offers: { nodes: OfferLite[] } }>(q, undefined, {
    tags: ["wp:offers"],
  });
}

export async function getOfferBySlug(slug: string) {
  const q = /* GraphQL */ `
    query Offer($slug: ID!) {
      offer(id: $slug, idType: SLUG) {
        slug
        title
        content
        cityExtra {
          vGorode
          izGoroda
          seo {
            seoTitle
            seoDescription
          }
        }
      }
    }
  `;
  return gql<{ offer: Offer | null }>(
    q,
    { slug },
    {
      tags: ["wp:offer", `wp:offer:${slug}`],
    }
  );
}
