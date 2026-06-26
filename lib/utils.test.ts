import { describe, expect, test } from "bun:test"
import { cn } from "./utils"

describe("cn", () => {
  test("combines conditional classes", () => {
    expect(cn("base", false && "hidden", ["flex", "gap-2"])).toBe(
      "base flex gap-2"
    )
  })

  test("resolves conflicting tailwind classes with the latest value", () => {
    expect(cn("px-2 py-1", "px-4", "text-sm", "text-lg")).toBe(
      "py-1 px-4 text-lg"
    )
  })
})
