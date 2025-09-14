"use server";
import { gql } from "./gql";

export type ServiceLite = { slug: string };

export type ServiceSeo = {
  title: string;
  meta_description: string;
};

export type ServiceImage = {
  id: string;
  title: string;
};

export type Service = {
  id: string;
  status: string;
  slug: string;
  title: string;
  price: string;
  content: string;
  image: ServiceImage;
  seo: ServiceSeo;
};

export type Services = {
  services: Service[];
};

export async function getServicesLite(status = "published") {
  const q = `
    query GetServices($status: String!) {
      services:service(filter: { status: { _eq: $status } }) {
        id
        status
        slug
        title
        image {
        id
        }
        price
      }
    }
  `;
  return gql<Services>(q, { status });
}

export async function getService(slug: string, status = "published") {
  const q = /* GraphQL */ `
    query GetService($slug: String!, $status: String!) {
      service(
        limit: 1
        filter: { slug: { _eq: $slug }, status: { _eq: $status } }
      ) {
        id
        status
        slug
        title
        content
        price
        image {
          id
          title
        }
        seo
      }
    }
  `;

  const data = await gql<
    { service: Service[] },
    { slug: string; status: string }
  >(
    q,
    { slug, status },
    { revalidate: 60 * 60 * 24, tags: ["services", `service:${slug}`] }
  );

  return data.service?.[0] ?? null;
}
