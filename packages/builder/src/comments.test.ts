import { describe, expect, it } from "vite-plus/test"

import { shipped, speaksOfTheCode } from "./comments"

describe("what a file ships with", () => {
  it("drops the comments written for the registry's maintainers", () => {
    const source = [
      "// Why this is here, for whoever maintains it.",
      'import { a } from "./a"',
      "",
      "/* A block of the same. */",
      "const local = a // and a trailing one",
      "",
      "export { local }",
      "",
    ].join("\n")
    expect(shipped("x.ts", source)).toBe(
      [
        'import { a } from "./a"',
        "",
        "const local = a",
        "",
        "export { local }",
        "",
      ].join("\n")
    )
  })

  it("keeps a doc comment on an export that speaks of the code", () => {
    const source = "/** The button's sizes. */\nexport const sizes = 1\n"
    expect(shipped("x.ts", source)).toBe(source)
  })

  it("drops a doc comment that tells the registry's story, or is on no export", () => {
    expect(
      shipped("x.ts", "/** As upstream's `size-9`. */\nexport const a = 1\n")
    ).toBe("export const a = 1\n")
    expect(shipped("x.ts", "/** Its sizes. */\nconst a = 1\n")).toBe(
      "const a = 1\n"
    )
    expect(speaksOfTheCode("A workaround (PF-011).")).toBe(false)
    expect(speaksOfTheCode("Base UI's key holds here.")).toBe(false)
  })

  it("keeps a tool's directive", () => {
    const source =
      "// eslint-disable-next-line no-console\nconsole.log(/* @__PURE__ */ f())\n"
    expect(shipped("x.ts", source)).toBe(source)
  })

  it("reads strings, templates, expressions and markup's text as they are", () => {
    const source = [
      'const url = "https://example.com/a//b"',
      "const text = `a // ${b /* gone */} /* kept */`",
      "const pattern = /\\/\\/[^/]*/",
      "const view = <a href={url}>{/* gone */}https://example.com</a>",
      "",
    ].join("\n")
    expect(shipped("x.tsx", source)).toBe(
      [
        'const url = "https://example.com/a//b"',
        "const text = `a // ${b } /* kept */`",
        "const pattern = /\\/\\/[^/]*/",
        "const view = <a href={url}>https://example.com</a>",
        "",
      ].join("\n")
    )
  })

  it("takes a component's script, markup and style each by its own rule", () => {
    const source = [
      '<script setup lang="ts">',
      "// gone",
      "const a = 1",
      "</script>",
      "",
      "<template>",
      "  <!-- gone -->",
      "  <p>{{ a }}</p>",
      "</template>",
      "",
      "<style>",
      "/* gone */",
      "p { color: red; }",
      "</style>",
      "",
    ].join("\n")
    expect(shipped("x.vue", source)).toBe(
      [
        '<script setup lang="ts">',
        "const a = 1",
        "</script>",
        "",
        "<template>",
        "  <p>{{ a }}</p>",
        "</template>",
        "",
        "<style>",
        "p { color: red; }",
        "</style>",
        "",
      ].join("\n")
    )
  })
})
