import { getContent, getContentWithParams, FetchOptions } from "@/shared/api/graphql-client";

import type { Service } from "@/entities/service/model/types";

const GET_SERVICES = `
  query GetServices {
    services(
      filter: { status: { _eq: "published" } }
    ) {
      id
      slug
      title
      short_content
      price
      seo {
        title
        meta_description
      }
      cover_image {
        id
        title
      }
      content
    }
  }
`;

const GET_SERVICE = `
  query GetService($slug: String!) {
    services(filter: { slug: { _eq: $slug }, status: { _eq: "published" } }) {
      id
      slug
      title
      content
      price
      short_content
      seo {
        title
        meta_description
      }
      cover_image {
        id
        title
      }
    }
  }
`;

interface ServicesResponse {
  services: Service[];
}

export async function getServices(options?: FetchOptions) {
  return getContent<ServicesResponse>(GET_SERVICES, {
    revalidate: 60 * 60,
    ...options,
    tags: ["services", ...(options?.tags ?? [])],
  });
}

export async function getServiceBySlug(
  slug: string,
  options?: FetchOptions
) {
  return getContentWithParams<ServicesResponse>(
    GET_SERVICE,
    { slug },
    {
      revalidate: 60 * 60,
      ...options,
      tags: ["services", "service", slug, ...(options?.tags ?? [])],
    }
  );
}
