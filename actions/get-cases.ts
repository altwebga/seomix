"use server";
import { gql } from "./gql";

export type CaseSeo = {
  title: string;
  meta_description: string;
};

export type CaseImage = {
  id: string;
  title: string;
};

export type Case = {
  id: string;
  status: string;
  slug: string;
  title: string;
  content: string;
  video_id: string;
  link: string;
  creation_date: Date;
  client: string;
  client_tag: string;
  client_logo: CaseImage;
  image: CaseImage;
  seo: CaseSeo;
};

export type Cases = {
  cases: Case[];
};

export async function getCasesLite(status = "published") {
  const q = `
   query GetCases($status: String!) {
      cases:portfolio(filter: { status: { _eq: $status } }) {
        id
        slug
        status
        creation_date
        title
        image {
          id
          title
        }
      }
    }
  `;
  return gql<Cases>(q, { status });
}

export async function getCase(slug: string, status = "published") {
  const q = /* GraphQL */ `
    query GetCase($slug: String!) {
      case: portfolio(limit: 1, filter: { slug: { _eq: $slug } }) {
        id
        status
        slug
        title
        content
        video_id
        link
        client_tag
        client_logo {
          id
          title
        }
        image {
          id
          title
        }
        seo
      }
    }
  `;

  const data = await gql<{ case: Case[] }, { slug: string; status: string }>(
    q,
    { slug, status },
    { revalidate: 60 * 60 * 24, tags: ["cases", `portfolio:${slug}`] }
  );

  return data.case?.[0] ?? null;
}
