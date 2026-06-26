import { afterEach, describe, expect, test } from "bun:test"
import { extractH2Headings } from "./extract-headings"

const originalRandomUUID = crypto.randomUUID

afterEach(() => {
  Object.defineProperty(crypto, "randomUUID", {
    configurable: true,
    value: originalRandomUUID,
  })
})

function mockRandomUUID(ids: `${string}-${string}-${string}-${string}-${string}`[]) {
  Object.defineProperty(crypto, "randomUUID", {
    configurable: true,
    value: () => ids.shift(),
  })
}

describe("extractH2Headings", () => {
  test("extracts only level-two markdown headings", () => {
    mockRandomUUID([
      "00000000-0000-4000-8000-000000000001",
      "00000000-0000-4000-8000-000000000002",
    ])

    expect(
      extractH2Headings(`
# Page title
## First section
### Nested section
Text
##   Second section
`)
    ).toEqual([
      {
        label: "First section",
        id: "00000000-0000-4000-8000-000000000001",
      },
      {
        label: "Second section",
        id: "00000000-0000-4000-8000-000000000002",
      },
    ])
  })

  test("returns an empty list when there are no h2 headings", () => {
    expect(extractH2Headings("# Title\n### Details")).toEqual([])
  })
})
