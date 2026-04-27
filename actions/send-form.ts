"use server"

import { IRequest } from "@/lib/types"

const API_KEY = process.env.TOKEN
const API_URL = process.env.API_URL

export async function sendForm(data: IRequest) {
  try {
    if (!API_URL || !API_KEY) {
      throw new Error("API_URL or TOKEN is not configured")
    }

    const res = await fetch(`${API_URL}/items/requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(data),
    })

    const text = await res.text()

    if (!res.ok) {
      throw new Error(text || "Ошибка при отправке формы")
    }

    return {
      ok: true,
      data: text ? JSON.parse(text) : null,
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return { ok: false, error: message }
  }
}
