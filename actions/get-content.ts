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
    | "region_hero"
    | "categories"
  fields: string[]
  status?: "draft" | "published" | "archived" | null
  limit?: number
  slug?: string
  id?: number
  filters?: Record<string, string | number | boolean>
}

export async function getContent<T>({
  collection,
  fields = ["*"],
  limit,
  status = "published",
  slug,
  id,
  filters,
}: getContentProps): Promise<T[]> {
  try {
    const params = new URLSearchParams({
      fields: fields.join(","),
    })

    if (status) {
      params.set("filter[status][_eq]", status)
    }

    if (limit) {
      params.set("limit", String(limit))
    }

    if (slug) {
      params.set("filter[slug][_eq]", slug)
    }

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        params.set(`filter${key}`, String(value))
      })
    }

    const res = await fetch(
      `${API_URL}/items/${collection}${id ? `/${id}` : ""}?${params.toString()}`,
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
