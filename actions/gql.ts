// gql.ts
"use server";

import { unstable_noStore as noStore } from "next/cache";

export type GqlFetchOpts = {
  /** seconds; false => полностью без кеша */
  revalidate?: number | false;
  /** next.js cache tags */
  tags?: string[];
  /** дополнительные заголовки к запросу */
  headers?: Record<string, string>;
  /** AbortController.signal для отмены */
  signal?: AbortSignal;
  /** переопределение ENV при необходимости */
  endpoint?: string;
  token?: string;
};

type GraphQLErrorItem = {
  message: string;
  path?: (string | number)[];
  extensions?: Record<string, unknown>;
};

type GqlEnvelope<TData> = {
  data?: TData;
  errors?: GraphQLErrorItem[];
};

function formatGraphQLErrors(errors: GraphQLErrorItem[] | undefined) {
  if (!errors?.length) return "";
  return errors
    .map((e, i) => {
      const where = e.path ? ` @ ${e.path.join(".")}` : "";
      return `${i + 1}) ${e.message}${where}`;
    })
    .join(" | ");
}

/**
 * Универсальный GraphQL fetcher для Next.js 15 (server).
 * - Авторизация по Bearer токену (из ENV или opts.token)
 * - Кэширование: revalidate (секунды) или false => полностью без кеша
 * - Теги кэша: tags
 * - Доп. заголовки: headers
 */
export async function gql<
  TData,
  TVars extends Record<string, unknown> = Record<string, unknown>
>(query: string, variables?: TVars, opts: GqlFetchOpts = {}): Promise<TData> {
  const endpoint = opts.endpoint ?? process.env.GRAPHQL_ENDPOINT;
  const token = opts.token ?? process.env.ACCESS_TOKEN;

  if (!endpoint)
    throw new Error("Missing env GRAPHQL_ENDPOINT (or opts.endpoint)");
  if (!token) throw new Error("Missing env ACCESS_TOKEN (or opts.token)");

  const isNoStore = opts.revalidate === false;
  if (isNoStore) noStore();

  const res = await fetch(endpoint, {
    method: "POST",
    signal: opts.signal,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(opts.headers ?? {}),
    },
    body: JSON.stringify({ query, variables }),
    ...(isNoStore
      ? { cache: "no-store" as const }
      : {
          next: {
            revalidate: opts.revalidate ?? 60 * 60 * 24, // 24h по умолчанию
            tags: opts.tags ?? [],
          },
        }),
  });

  if (!res.ok) {
    let details = "";
    try {
      // сервер может вернуть JSON с ошибками/HTML; берём как текст
      details = (await res.text()).slice(0, 2000);
    } catch {}
    throw new Error(
      `GraphQL HTTP ${res.status}${details ? `: ${details}` : ""}`
    );
  }

  let json: GqlEnvelope<TData>;
  try {
    json = (await res.json()) as GqlEnvelope<TData>;
  } catch {
    throw new Error("Failed to parse GraphQL JSON response");
  }

  if (json.errors?.length) {
    throw new Error(formatGraphQLErrors(json.errors));
  }

  if (json.data === undefined) {
    throw new Error("GraphQL response did not contain 'data'");
  }

  return json.data;
}
