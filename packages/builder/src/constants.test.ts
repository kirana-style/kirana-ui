import { describe, expect, it } from "vite-plus/test"

import { classifier, keepsConstant } from "./flatten"
import { generate } from "./generate"
import type { RecipeHandle, StyleHandle } from "./kirana-stub"
import { relation } from "./kirana-stub"
import { marker } from "./markers"

type Base = "base" | "aria" | "ark" | "uisdk"

const state = (base: Base, key: string) => marker({ kind: "state", base, key })
const within = (condition: string) =>
  marker({ kind: "read", relation: "collapsible", how: "within", condition })

/** `OPEN` as `collapsible.styles.ts` writes it: one read of the scope per base. */
const OPEN = {
  base: within(state("base", "[data-open]")),
  aria: within(state("aria", "[data-expanded]")),
  ark: within(state("ark", '[data-state="open"]')),
  uisdk: within(state("uisdk", "[data-open]")),
}

const names = {
  tokens: new Map(),
  axes: new Map(),
  relations: new Map([
    [
      "collapsible",
      { module: "collapsible.styles.ts", name: "collapsibleScope" },
    ],
  ]),
}

const written = (base: Base | "kirana") => {
  const classify = classifier({ style: "nova", base })
  return generate({ collapsibleScope: relation("collapsible"), OPEN }, names, {
    flatten: (h: StyleHandle) => h,
    flattenRecipe: (h: RecipeHandle) => h,
    keep: (value) => keepsConstant(value, classify),
    imports: (module) => `./${module}`,
    header: "",
    module: "collapsible.styles.ts",
    relationsFrom: (module) => ({ specifier: `./${module}`, own: false }),
  }).code
}

describe("a module's constants, flattened", () => {
  it("keep the project's base's entry alone", () => {
    const ark = written("ark")
    expect(ark).toContain(`ark: collapsibleScope.within('[data-state="open"]')`)
    expect(ark).not.toMatch(/\b(base|aria|uisdk):/)
  })

  it("keep Base UI's on Kirana UI Primitives, which write its vocabulary", () => {
    const kirana = written("kirana")
    expect(kirana).toContain(`base: collapsibleScope.within("[data-open]")`)
    expect(kirana).not.toMatch(/\b(aria|ark|uisdk):/)
  })

  it("keep a member that names no base or style", () => {
    const classify = classifier({ style: "nova", base: "aria" })
    expect(keepsConstant('[data-slot="field"]', classify)).toBe(true)
    expect(keepsConstant(OPEN.aria, classify)).toBe(true)
    expect(keepsConstant(OPEN.base, classify)).toBe(false)
  })

  it("are written whole when the generator is not flattening", () => {
    const code = generate(
      { collapsibleScope: relation("collapsible"), OPEN },
      names,
      {
        flatten: (h: StyleHandle) => h,
        flattenRecipe: (h: RecipeHandle) => h,
        imports: (module) => `./${module}`,
        header: "",
        module: "collapsible.styles.ts",
        relationsFrom: (module) => ({ specifier: `./${module}`, own: false }),
      }
    ).code
    for (const base of ["base", "aria", "ark", "uisdk"])
      expect(code).toContain(`${base}: collapsibleScope.within(`)
  })
})
