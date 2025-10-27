"use server";

import crypto from "node:crypto";
import { unstable_cache } from "next/cache";

import { getServerEnv } from "@/shared/config/server-env";

export interface FetchOptions {
  revalidate?: number;
  cache?: RequestCache;
  tags?: string[];
}

interface GraphQLError {
  message: string;
  locations?: Array<{ line: number; column: number }>;
  path?: string[];
}

interface GraphQLResponse<T = unknown> {
  data?: T;
  errors?: GraphQLError[];
}

interface RequestArgs {
  query: string;
  variables?: Record<string, unknown>;
  options?: FetchOptions;
}

function buildCacheKey(query: string, variables?: Record<string, unknown>) {
  const hash = crypto.createHash("sha1");
  hash.update(query);
  hash.update(JSON.stringify(variables ?? {}));
  return hash.digest("hex");
}

async function requestGraphQL<T>({
  query,
  variables,
  options,
}: RequestArgs): Promise<GraphQLResponse<T>> {
  const {
    GRAPHQL_ENDPOINT,
    ACCESS_TOKEN,
  } = getServerEnv();

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  };

  const body = JSON.stringify({
    query,
    ...(variables && { variables }),
  });

  const nextOptions = options?.revalidate
    ? { revalidate: options.revalidate, tags: options.tags }
    : options?.tags
      ? { tags: options.tags }
      : undefined;

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers,
    body,
    cache: options?.cache,
    next: nextOptions,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `GraphQL запрос завершился с ошибкой ${response.status}: ${text}`
    );
  }

  return (await response.json()) as GraphQLResponse<T>;
}

async function cachedRequestGraphQL<T>({
  query,
  variables,
  options,
}: RequestArgs) {
  const cacheKey = buildCacheKey(query, variables);
  const cacheTags = options?.tags ?? [];
  const revalidate = options?.revalidate ?? 60 * 60; // 1 час по умолчанию

  const cachedFetcher = unstable_cache(
    async () => requestGraphQL<T>({ query, variables, options }),
    ["graphql", cacheKey, String(revalidate), ...cacheTags],
    { revalidate }
  );

  return cachedFetcher();
}

export async function getContent<T>(
  query: string,
  options?: FetchOptions
): Promise<T | null> {
  try {
    const response = await cachedRequestGraphQL<T>({ query, options });

    if (response.errors && response.errors.length > 0) {
      console.error("[GraphQL] Ошибки запроса", response.errors);
    }

    return response.data ?? null;
  } catch (error) {
    console.error("[GraphQL] Ошибка выполнения", error);
    return null;
  }
}

export async function getContentWithParams<T>(
  query: string,
  variables: Record<string, unknown>,
  options?: FetchOptions
): Promise<T | null> {
  try {
    const response = await cachedRequestGraphQL<T>({
      query,
      variables,
      options,
    });

    if (response.errors && response.errors.length > 0) {
      console.error("[GraphQL] Ошибки запроса", response.errors);
    }

    return response.data ?? null;
  } catch (error) {
    console.error("[GraphQL] Ошибка выполнения", error);
    return null;
  }
}

export async function getGraphQLResponse<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: FetchOptions
): Promise<GraphQLResponse<T> | null> {
  try {
    return await cachedRequestGraphQL<T>({ query, variables, options });
  } catch (error) {
    console.error("[GraphQL] Ошибка выполнения", error);
    return null;
  }
}
