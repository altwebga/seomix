"use server"

const API_URL = process.env.API_URL || "https://localhost:8055"
const TOKEN = process.env.TOKEN || ""

interface getContentProps {
  collection:
    | "pages"
    | "services"
    | "blog"
    | "portfolio"
    | "team"
    | "clients"
    | "legal_information"
  fields: string[]
  status?: "draft" | "published" | "archived"
  limit?: number
  slug?: string
  id?: number
}

export async function getContent<T>({
  collection,
  fields = ["*"],
  status = "published",
  limit,
  slug,
  id,
}: getContentProps): Promise<T[]> {
  try {
    const res = await fetch(
      `${API_URL}/items/${collection}${id ? `/${id}` : ""}?fields=${fields.join(",")}&filter[status][_eq]=${status}${limit ? `&limit=${limit}` : ""}${slug ? `&filter[slug][_eq]=${slug}` : ""}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        next: { revalidate: 3600 },
      }
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch content: ${res.status}`)
    }

    const json = await res.json()
    return json.data
  } catch (error) {
    console.error("getContent error:", error)
    return []
  }
}

export async function getContentByID<T>({
  collection,
  id,
  fields = ["*"],
}: getContentProps): Promise<T> {
  try {
    const res = await fetch(
      `${API_URL}/items/${collection}/${id}?fields=${fields.join(",")}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
        next: { revalidate: 3600 },
      }
    )
    if (!res.ok) {
      throw new Error(`Failed to fetch content: ${res.status}`)
    }
    const json = await res.json()
    return json.data
  } catch (error) {
    console.error("getContentByID error:", error)
    return {} as T
  }
}
