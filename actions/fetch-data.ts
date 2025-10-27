"use server";

export {
  getContent,
  getContentWithParams as getContentParams,
  getGraphQLResponse,
} from "@/shared/api/graphql-client";

export type { FetchOptions } from "@/shared/api/graphql-client";
