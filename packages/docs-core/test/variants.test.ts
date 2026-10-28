import { describe, expect, it } from "vite-plus/test"

import { narrow, variantHref } from "../src/variants.ts"

const VARIANTS = [
  { id: "react/base", label: "Base UI", name: "React with Base UI" },
  { id: "react/aria", label: "React Aria", name: "React with React Aria" },
  { id: "vue/ark", label: "Vue", name: "Vue" },
]

const SOURCE = `---
title: Button
---

# Button

<!-- ::preview item="button-demo" combinations="react/base,react/aria,vue/ark" -->
<!-- ::preview item="button-rtl" combinations="react/base" -->

<!-- ::start:only react/base,react/aria -->
With shadcn/ui's CLI too.
<!-- ::end:only -->

<!-- ::start:tabs -->

### Base UI

base usage

### Vue

vue usage

<!-- ::end:tabs -->

<!-- ::start:tabs -->

### npm

npm i

<!-- ::end:tabs -->
`

describe("narrow", () => {
  it("keeps what the variant has and pins its embeds", () => {
    const vue = narrow(SOURCE, "vue/ark", VARIANTS)
    expect(vue).toContain(
      '<!-- ::preview item="button-demo" combinations="vue/ark" -->'
    )
    expect(vue).not.toContain("button-rtl")
    expect(vue).not.toContain("shadcn/ui's CLI")
    expect(vue).toContain("vue usage")
    expect(vue).not.toContain("base usage")
    expect(vue).not.toContain("### Vue")
    expect(vue).toContain("# Button\n\n<!-- ::frameworks -->")
  })

  it("drops a variant tab group where the variant has no section", () => {
    const aria = narrow(SOURCE, "react/aria", VARIANTS)
    expect(aria).not.toContain("usage")
    expect(aria).toContain("With shadcn/ui's CLI too.")
  })

  it("gives a section to every variant its heading names", () => {
    const shared =
      "<!-- ::start:tabs -->\n\n### Base UI, React Aria\n\nreact usage\n\n### Vue\n\nvue usage\n\n<!-- ::end:tabs -->\n"
    expect(narrow(shared, "react/aria", VARIANTS)).toContain("react usage")
    expect(narrow(shared, "vue/ark", VARIANTS)).not.toContain("react usage")
  })

  it("leaves a tab group of other headings alone", () => {
    expect(narrow(SOURCE, "react/base", VARIANTS)).toContain("### npm")
  })

  it("refuses an unknown variant in ::only", () => {
    expect(() =>
      narrow(
        "<!-- ::start:only svelte/ark -->x<!-- ::end:only -->",
        "vue/ark",
        VARIANTS
      )
    ).toThrow(/svelte\/ark/)
  })
})

describe("variantHref", () => {
  it("puts the variant before the page's name", () => {
    expect(variantHref("/docs/components/button", "vue/ark")).toBe(
      "/docs/components/vue/ark/button"
    )
  })
})
