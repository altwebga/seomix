"use server";
import { gql } from "./gql";

export type PostSeo = {
  title: string;
  meta_description: string;
};

export type PostImage = {
  id: string;
  title: string;
};

export type Post = {
  id: string;
  status: string;
  slug: string;
  title: string;
  content: string;
  image: PostImage;
  seo: PostSeo;
};

export type Posts = {
  posts: Post[];
};

export async function getPostsLite(status = "published") {
  const q = `
   query GetPosts($status: String!) {
      posts:post(filter: { status: { _eq: $status } }) {
        id
        slug
        status
        title
        image {
          id
          title
        }
          seo
      }
    }
  `;
  return gql<Posts>(q, { status });
}

export async function getPost(slug: string, status = "published") {
  const q = /* GraphQL */ `
    query GetOffer($slug: String!, $status: String!) {
      post(
        limit: 1
        filter: { slug: { _eq: $slug }, status: { _eq: $status } }
      ) {
        id
        status
        slug
        title
        content
        image {
          id
          title
        }
        seo
      }
    }
  `;

  const data = await gql<{ post: Post[] }, { slug: string; status: string }>(
    q,
    { slug, status },
    { revalidate: 60 * 60 * 24, tags: ["posts", `post:${slug}`] }
  );

  return data.post?.[0] ?? null;
}
