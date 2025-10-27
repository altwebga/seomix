import { getContent, FetchOptions } from "@/shared/api/graphql-client";

import type { Client } from "@/entities/client/model/types";

const GET_CLIENTS = `
  query GetClients {
    clients {
      id
      title
      direction
      logo {
        id
        title
      }
    }
  }
`;

interface ClientsResponse {
  clients: Client[];
}

export async function getClients(options?: FetchOptions) {
  return getContent<ClientsResponse>(GET_CLIENTS, {
    revalidate: 60 * 60 * 6,
    ...options,
    tags: ["clients", ...(options?.tags ?? [])],
  });
}
