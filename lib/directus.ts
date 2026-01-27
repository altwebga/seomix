import { createDirectus, authentication, rest } from "@directus/sdk";
import { IContent } from "@/config/types";

export interface Schema {
  content: IContent[];
}

const API_URL = process.env.API_URL || "http://localhost:8055";
const TOKEN = process.env.TOKEN || "";

if (!TOKEN) {
  console.warn(
    "Directus token is not set. Please set the TOKEN environment variable.",
  );
}

const directus = createDirectus<Schema>(API_URL)
  .with(authentication())
  .with(rest());

await directus.setToken(TOKEN);

export default directus;
