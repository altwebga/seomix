"use server";
import { gql } from "./gql";

export type CityLite = { slug: string };

export type CityAdvantage = {
  advantagesName: string;
  advantagesDescription: string;
};

export type CityService = {
  serviceName: string;
  serviceDescription: string;
};

export type CityExtra = {
  advantages: CityAdvantage[];
  services: CityService[];
  prep: string | null;
};

export type CityImage = {
  node: {
    mediaItemUrl: string;
  };
};

export type City = {
  id: string;
  slug: string;
  title: string | null;
  content: string | null;
  cityExtra?: CityExtra;
  featuredImage?: CityImage;
};

export async function getCities() {
  const q = /* GraphQL */ `
    query AllCitySlugs {
      cities(first: 500) {
        nodes {
          slug
        }
      }
    }
  `;
  return gql<{ cities: { nodes: CityLite[] } }>(q, undefined, {
    tags: ["wp:cities"],
  });
}

export async function getCityBySlug(slug: string) {
  const q = /* GraphQL */ `
    query CityBySlug($slug: ID!) {
      city(id: $slug, idType: SLUG) {
        slug
        title
        content
        cityExtra {
          advantages {
            advantagesName
            advantagesDescription
          }
          services {
            serviceName
            serviceDescription
          }
          prep
        }
        featuredImage {
          node {
            mediaItemUrl
          }
        }
      }
    }
  `;
  return gql<{ city: City | null }>(
    q,
    { slug },
    { tags: ["wp:city", `wp:city:${slug}`] }
  );
}
