"use server";

/**
 * Универсальная функция для любых GraphQL-запросов.
 *  - query: строка GraphQL
 *  - variables (опционально)
 *  - options: { revalidate, cache, headers }
 */

const ENDPOINT = process.env.GRAPHQL_ENDPOINT;
const TOKEN = process.env.ACCESS_TOKEN;

export interface FetchOptions {
  revalidate?: number;
  cache?: RequestCache;
  headers?: HeadersInit;
}

interface GraphQLResponse<T = unknown> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
  }>;
}

async function requestGraphQL<T = unknown>(
  query: string,
  variables?: Record<string, unknown>,
  options?: FetchOptions
): Promise<GraphQLResponse<T> | null> {
  // Проверка окружения
  if (!ENDPOINT) {
    console.error("[GraphQL] Не задан GRAPHQL_ENDPOINT в .env");
    throw new Error("GRAPHQL_ENDPOINT не настроен");
  }
  if (!TOKEN) {
    console.error("[GraphQL] Не задан ACCESS_TOKEN в .env");
    throw new Error("ACCESS_TOKEN не настроен");
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
    ...(options?.headers ?? {}),
  };

  const body = JSON.stringify({
    query,
    ...(variables && { variables }),
  });

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers,
      body,
      next: options?.revalidate
        ? { revalidate: options.revalidate }
        : undefined,
      cache: options?.cache,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      const errorMessage = `HTTP ${res.status}: ${text || res.statusText}`;
      console.error(`[GraphQL] ${errorMessage}`);
      throw new Error(errorMessage);
    }

    const json: GraphQLResponse<T> = await res.json();

    if (json.errors && json.errors.length > 0) {
      console.error("[GraphQL] Errors:", json.errors);
      // Не бросаем ошибку, возвращаем ответ с errors для обработки на верхнем уровне
    }

    return json;
  } catch (error) {
    console.error("[GraphQL] Fetch error:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Неизвестная ошибка при выполнении GraphQL запроса");
  }
}

/** Запрос без параметров */
export async function getContent<T = unknown>(
  query: string,
  options?: FetchOptions
): Promise<T | null> {
  try {
    const result = await requestGraphQL<T>(query, undefined, options);
    return result?.data || null;
  } catch (error) {
    console.error("[getContent] Error:", error);
    return null;
  }
}

/** Запрос с параметрами */
export async function getContentParams<T = unknown>(
  query: string,
  variables: Record<string, unknown>,
  options?: FetchOptions
): Promise<T | null> {
  try {
    const result = await requestGraphQL<T>(query, variables, options);
    return result?.data || null;
  } catch (error) {
    console.error("[getContentParams] Error:", error);
    return null;
  }
}

/** Полный ответ GraphQL с возможными ошибками */
export async function getGraphQLResponse<T = unknown>(
  query: string,
  variables?: Record<string, unknown>,
  options?: FetchOptions
): Promise<GraphQLResponse<T> | null> {
  try {
    return await requestGraphQL<T>(query, variables, options);
  } catch (error) {
    console.error("[getGraphQLResponse] Error:", error);
    return null;
  }
}
