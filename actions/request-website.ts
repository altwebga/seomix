"use server";

import * as z from "zod";
import directus from "@/lib/directus"; // путь поправь под себя
import { createItem } from "@directus/sdk";

const schema = z.object({
  client: z.string().trim().min(1),
  phone: z.string().trim().min(1),
  page_url: z.string().trim().optional(),
});

export async function createRequestWebsite(input: unknown) {
  const data = schema.parse(input);

  await directus.request(
    createItem("requests_website", {
      client: data.client,
      phone: data.phone,
      page_url: data.page_url,
    })
  );

  return { ok: true };
}
