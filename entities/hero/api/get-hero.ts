import { getContent, FetchOptions } from "@/shared/api/graphql-client";

import type { Hero } from "@/entities/hero/model/types";

const GET_HERO = `
  query GetHero  {
    hero {
      hero_title
      hero_city
      hero_content
      hero_image {
        id
        title
      }
    }
  }
`;

interface HeroResponse {
  hero: Hero;
}

export async function getHero(options?: FetchOptions) {
  return getContent<HeroResponse>(GET_HERO, {
    revalidate: 60 * 60 * 24,
    ...options,
    tags: ["hero", ...(options?.tags ?? [])],
  });
}
