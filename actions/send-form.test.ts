import { afterEach, describe, expect, mock, test } from "bun:test"

const originalFetch = globalThis.fetch
const originalApiUrl = process.env.API_URL
const originalToken = process.env.TOKEN

afterEach(() => {
  globalThis.fetch = originalFetch
  process.env.API_URL = originalApiUrl
  process.env.TOKEN = originalToken
})

async function importSendForm() {
  return import(
    `./send-form.ts?test=${Date.now()}-${Math.random()}`
  ) as Promise<typeof import("./send-form")>
}

describe("sendForm", () => {
  test("posts request data to Directus", async () => {
    process.env.API_URL = "https://cms.example.test"
    process.env.TOKEN = "secret"

    const fetchMock = mock(async () => ({
      ok: true,
      text: async () => JSON.stringify({ data: { id: 1 } }),
    }))
    globalThis.fetch = fetchMock as unknown as typeof fetch

    const { sendForm } = await importSendForm()
    const request = {
      name: "Ivan",
      phone: "+79990000000",
      url: "https://example.test",
      message: "Call me",
    }

    await expect(sendForm(request)).resolves.toEqual({
      ok: true,
      data: { data: { id: 1 } },
    })

    expect(fetchMock).toHaveBeenCalledWith(
      "https://cms.example.test/items/requests",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer secret",
        },
        body: JSON.stringify(request),
      }
    )
  })

  test("returns null data for an empty successful response", async () => {
    process.env.API_URL = "https://cms.example.test"
    process.env.TOKEN = "secret"

    globalThis.fetch = mock(async () => ({
      ok: true,
      text: async () => "",
    })) as unknown as typeof fetch

    const { sendForm } = await importSendForm()

    await expect(
      sendForm({
        name: "Ivan",
        phone: "+79990000000",
        url: "https://example.test",
      })
    ).resolves.toEqual({ ok: true, data: null })
  })

  test("returns an error when API credentials are missing", async () => {
    process.env.API_URL = ""
    process.env.TOKEN = ""

    const { sendForm } = await importSendForm()

    await expect(
      sendForm({
        name: "Ivan",
        phone: "+79990000000",
        url: "https://example.test",
      })
    ).resolves.toEqual({
      ok: false,
      error: "API_URL or TOKEN is not configured",
    })
  })

  test("returns the API error body for failed responses", async () => {
    process.env.API_URL = "https://cms.example.test"
    process.env.TOKEN = "secret"

    globalThis.fetch = mock(async () => ({
      ok: false,
      text: async () => "Validation failed",
    })) as unknown as typeof fetch

    const { sendForm } = await importSendForm()

    await expect(
      sendForm({
        name: "Ivan",
        phone: "+79990000000",
        url: "https://example.test",
      })
    ).resolves.toEqual({ ok: false, error: "Validation failed" })
  })
})
