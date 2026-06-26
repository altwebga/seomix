import { afterEach, describe, expect, mock, test } from "bun:test"

type FetchMock = ReturnType<typeof mock>

const originalFetch = globalThis.fetch
const originalApiUrl = process.env.API_URL
const originalToken = process.env.TOKEN

afterEach(() => {
  globalThis.fetch = originalFetch
  process.env.API_URL = originalApiUrl
  process.env.TOKEN = originalToken
})

async function importGetContent() {
  return import(
    `./get-content.ts?test=${Date.now()}-${Math.random()}`
  ) as Promise<typeof import("./get-content")>
}

function mockFetchOnce(response: Partial<Response>): FetchMock {
  const fetchMock = mock(async () => response as Response)
  globalThis.fetch = fetchMock as unknown as typeof fetch
  return fetchMock
}

describe("getContent", () => {
  test("requests published collection items with query filters", async () => {
    process.env.API_URL = "https://cms.example.test"
    process.env.TOKEN = "secret"

    const fetchMock = mockFetchOnce({
      ok: true,
      json: async () => ({ data: [{ title: "SEO" }] }),
    })

    const { getContent } = await importGetContent()
    const data = await getContent<{ title: string }>({
      collection: "services",
      fields: ["title", "slug"],
      limit: 3,
      slug: "seo",
      filters: {
        "[category][_eq]": "marketing",
      },
    })

    expect(data).toEqual([{ title: "SEO" }])
    expect(fetchMock).toHaveBeenCalledTimes(1)

    const [url, options] = fetchMock.mock.calls[0]
    const parsedUrl = new URL(url as string)

    expect(parsedUrl.origin).toBe("https://cms.example.test")
    expect(parsedUrl.pathname).toBe("/items/services")
    expect(parsedUrl.searchParams.get("fields")).toBe("title,slug")
    expect(parsedUrl.searchParams.get("filter[status][_eq]")).toBe("published")
    expect(parsedUrl.searchParams.get("filter[slug][_eq]")).toBe("seo")
    expect(parsedUrl.searchParams.get("filter[category][_eq]")).toBe(
      "marketing"
    )
    expect(parsedUrl.searchParams.get("limit")).toBe("3")
    expect(options).toEqual({
      headers: {
        Authorization: "Bearer secret",
      },
      next: { revalidate: 3600 },
    })
  })

  test("can request an item by id without a status filter", async () => {
    process.env.API_URL = "https://cms.example.test"

    const fetchMock = mockFetchOnce({
      ok: true,
      json: async () => ({ data: [{ id: 7 }] }),
    })

    const { getContent } = await importGetContent()
    await getContent({
      collection: "blog",
      fields: ["id"],
      id: 7,
      status: null,
    })

    const parsedUrl = new URL(fetchMock.mock.calls[0][0] as string)
    expect(parsedUrl.pathname).toBe("/items/blog/7")
    expect(parsedUrl.searchParams.has("filter[status][_eq]")).toBe(false)
  })

  test("returns an empty list when the request fails", async () => {
    const consoleError = console.error
    console.error = mock(() => {})

    mockFetchOnce({
      ok: false,
      status: 500,
    })

    const { getContent } = await importGetContent()

    expect(
      await getContent({
        collection: "pages",
        fields: ["slug"],
      })
    ).toEqual([])

    console.error = consoleError
  })
})

describe("getContentByID", () => {
  test("returns a single item by id", async () => {
    process.env.API_URL = "https://cms.example.test"
    process.env.TOKEN = "secret"

    const fetchMock = mockFetchOnce({
      ok: true,
      json: async () => ({ data: { id: 5, title: "Case" } }),
    })

    const { getContentByID } = await importGetContent()
    const data = await getContentByID<{ id: number; title: string }>({
      collection: "portfolio",
      id: 5,
      fields: ["id", "title"],
    })

    expect(data).toEqual({ id: 5, title: "Case" })
    expect(fetchMock.mock.calls[0][0]).toBe(
      "https://cms.example.test/items/portfolio/5?fields=id,title"
    )
  })
})
