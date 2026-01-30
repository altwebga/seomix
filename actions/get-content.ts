"use server";

import { IContent } from "@/config/types";

const API_URL = process.env.API_URL || "https://localhost:8055";
const TOKEN = process.env.TOKEN || "";

type getContentProps = {
  content_type: "service" | "article" | "project";
  status?: "draft" | "published" | "archived";
  fields?: string[];
};

export async function getContent({
  content_type,
  status = "published",
  fields = ["id", "title", "slug", "description", "cover_image"],
}: getContentProps): Promise<IContent[]> {
  try {
    const res = await fetch(
      `${API_URL}/items/content?filter[content_type][_eq]=${content_type}&filter[status][_eq]=${status}&fields=${fields.join(",")}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch content: ${res.status}`);
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("getContent error:", error);
    return [];
  }
}
