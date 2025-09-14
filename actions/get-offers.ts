"use server";
import { gql } from "./gql";

export type OfferLite = { slug: string };

export type OfferSeo = {
  title: string;
  meta_description: string;
};

export type OfferImage = {
  id: string;
  title: string;
};

export type Offer = {
  id: string;
  status: string;
  slug: string;
  title: string;
  in_city: string;
  from_city: string;
  content: string;
  image: OfferImage;
  seo: OfferSeo;
};

export type Offers = {
  offers: Offer[];
};

export async function getOffersLite(status = "published") {
  const q = `
    query GetOffers($status: String!) {
      offer(filter: { status: { _eq: $status } }) {
        id
        status
        slug
        title
      }
    }
  `;
  return gql<Offers>(q, { status });
}

export async function getOffer(slug: string, status = "published") {
  const q = /* GraphQL */ `
    query GetOffer($slug: String!, $status: String!) {
      offer(
        limit: 1
        filter: { slug: { _eq: $slug }, status: { _eq: $status } }
      ) {
        id
        status
        slug
        title
        in_city
        from_city
        content
        image {
          id
          title
        }
        seo
      }
    }
  `;

  const data = await gql<{ offer: Offer[] }, { slug: string; status: string }>(
    q,
    { slug, status },
    { revalidate: 60 * 60 * 24, tags: ["offers", `offer:${slug}`] }
  );

  return data.offer?.[0] ?? null;
}
