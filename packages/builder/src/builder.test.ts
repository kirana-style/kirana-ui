import { describe, expect, it } from "vite-plus/test"

import { exclusiveFrom } from "./check"
import { changesFrom, classifier, flattenRecipe, flattenValue } from "./flatten"
import { generate, quote } from "./generate"
import type { RecipeHandle, StyleHandle } from "./kirana-stub"
import { marker } from "./markers"
import { importsOf, packageOf } from "./registry"
import { checkKiranaItems } from "./kirana-check"
import { axesOf, hashOf, kiranaFile } from "./kirana-items"
import { entriesOf, mergeStyles, valueOf } from "./styles"
import { conditionText, partText, ranked } from "./session"
import type { Ranked } from "./session"
import { compareWinners, sameAttribute, styleOf } from "./winners"

const style = (name: string) =>
  marker({
    kind: "read",
    relation: "ui",
    how: "within",
    condition: `[data-style="${name}"]`,
  })
const state = (base: "base" | "aria" | "ark", key: string) =>
  marker({ kind: "state", base, key })

describe("entries", () => {
  it("are each value with its conditions, outermost first", () => {
    expect(
      entriesOf({ base: "a", ":hover": { base: "b", "[x]": "c" } })
    ).toEqual([
      { path: [], value: "a" },
      { path: [":hover"], value: "b" },
      { path: [":hover", "[x]"], value: "c" },
    ])
  })

  it("write back as Kirana's syntax, `{ base: x }` as `x`", () => {
    expect(valueOf([{ path: [], value: "a" }])).toBe("a")
    expect(
      valueOf([
        { path: [], value: "a" },
        { path: [":hover"], value: "b" },
      ])
    ).toEqual({
      base: "a",
      ":hover": "b",
    })
  })

  it("merge as Kirana merges: a later entry replaces the same set, the rest stay", () => {
    expect(
      mergeStyles(
        { color: { base: "a", ":hover": "b" } },
        { color: "c", padding: "1px" }
      )
    ).toEqual({ color: { base: "c", ":hover": "b" }, padding: "1px" })
  })
})

describe("flattening", () => {
  const lyra = classifier({ style: "lyra", base: "base" })

  it("keeps the base look where the style says nothing", () => {
    expect(flattenValue({ base: "1rem", [style("vega")]: "2rem" }, lyra)).toBe(
      "1rem"
    )
  })

  it("puts the style's value in place of the base look", () => {
    expect(flattenValue({ base: "1rem", [style("lyra")]: "0" }, lyra)).toBe("0")
  })

  it("lets the style's entry win a set it shares after its condition goes", () => {
    expect(
      flattenValue(
        {
          base: "a",
          ":hover": "b",
          [style("lyra")]: { base: "c", ":hover": "d" },
        },
        lyra
      )
    ).toEqual({ base: "c", ":hover": "d" })
  })

  it("keeps the target base's state keys, as plain keys, and drops the others'", () => {
    expect(
      flattenValue(
        {
          base: 1,
          [state("base", "[data-starting-style]")]: 0,
          [state("aria", "[data-entering]")]: 0,
        },
        lyra
      )
    ).toEqual({ base: 1, "[data-starting-style]": 0 })
  })

  it("keeps a plain key that only looks like another base's", () => {
    expect(
      flattenValue(
        { '[data-orientation="vertical"]': "column" },
        classifier({ style: "nova", base: "aria" })
      )
    ).toEqual({
      '[data-orientation="vertical"]': "column",
    })
  })
})

describe("flattening a recipe", () => {
  const lyra = classifier({ style: "lyra", base: "base" })
  const nova = classifier({ style: "nova", base: "base" })
  // Button's `sm`: Nova's `text-[0.8rem]`, while Lyra keeps the base's `text-xs`, whose condition
  // outranks the variant's plain value on the site.
  const button: RecipeHandle = {
    kind: "recipe",
    config: {
      base: { fontSize: { base: "0.875rem", [style("lyra")]: "0.75rem" } },
      variants: {
        size: {
          default: {},
          sm: { fontSize: { base: "0.8rem", [style("vega")]: "0.875rem" } },
        },
      },
    },
    site: { file: "", line: 0 },
  }
  const sizeOf = (recipe: RecipeHandle) =>
    (recipe.config as { variants: { size: Record<string, unknown> } }).variants
      .size

  it("drops a variant's value that the base's style entry beat", () => {
    expect(sizeOf(flattenRecipe(button, lyra)).sm).toEqual({})
  })

  it("keeps it where nothing outranked it", () => {
    expect(sizeOf(flattenRecipe(button, nova)).sm).toEqual({
      fontSize: "0.8rem",
    })
  })

  it("writes what a variant changes, and drops what it removed", () => {
    expect(
      changesFrom(
        { color: { base: "a", ":hover": "b" }, padding: "1px" },
        { color: { base: "a", ":hover": "c" } }
      )
    ).toEqual({ color: { ":hover": "c" }, padding: null })
    expect(
      changesFrom({ color: { base: "a", ":hover": "b" } }, { color: "d" })
    ).toEqual({ color: { "*": null, base: "d" } })
  })
})

describe("exclusive conditions", () => {
  // Two vocabularies, as `exclusiveAcross(Base, Aria)` gives them: each names its first-frame key,
  // and both name `[data-side]`.
  const exclusive = exclusiveFrom(
    [["[data-open]", "[data-closed]"]],
    [
      ["[data-side]", "[data-starting-style]"],
      ["[data-entering]", "[data-side]"],
    ]
  )

  it("are a configured pair, or one attribute with two values", () => {
    expect(exclusive("[data-open]", "[data-closed]")).toBe(true)
    expect(exclusive('[data-size="sm"]', '[data-size="lg"]')).toBe(true)
  })

  it("are two keys of different vocabularies that no vocabulary holds together", () => {
    expect(exclusive("[data-starting-style]", "[data-entering]")).toBe(true)
    expect(exclusive("[data-side]", "[data-entering]")).toBe(false)
    expect(exclusive("[data-starting-style]", ":hover")).toBe(false)
  })
})

describe("Kirana's answers", () => {
  it("name each condition by kind: a relation with its placement, an at-rule with its keyword", () => {
    expect(
      conditionText({
        kind: "relation",
        text: '[data-style="lyra"]',
        relation: "ui",
        placement: "within",
      })
    ).toBe('relation within ui [data-style="lyra"]')
    expect(
      conditionText({
        kind: "relation",
        text: "",
        relation: "menu-row",
        placement: "after",
      })
    ).toBe("relation after menu-row")
    expect(conditionText({ kind: "media", text: "(width >= 40rem)" })).toBe(
      "@media (width >= 40rem)"
    )
    expect(conditionText({ kind: "attribute", text: '[data-size="sm"]' })).toBe(
      '[data-size="sm"]'
    )
  })

  it("tell a recipe's parts apart", () => {
    expect(partText({ options: {}, compound: false })).toBe("")
    expect(partText({ options: { size: "sm" }, compound: false })).toBe(
      "size=sm"
    )
    expect(
      ranked({
        value: "0.8rem",
        conditions: [],
        layer: "kirana.atoms",
        class: "k1",
        part: { options: { variant: "link", size: "sm" }, compound: true },
        reason: "",
      })
    ).toEqual({
      value: "0.8rem",
      conditions: [],
      part: "variant=link,size=sm!",
    })
  })
})

describe("winners", () => {
  const lyra = 'relation within ui [data-style="lyra"]'
  const md = "@media (width >= 48rem)"
  const fixed = (condition: string) => {
    const name = styleOf(condition)
    return name === undefined ? undefined : name === "lyra"
  }

  it("agree when flattening keeps the order", () => {
    const before = [
      { value: "3rem", conditions: [md, lyra] },
      { value: "2rem", conditions: [md] },
      { value: "3rem", conditions: [lyra] },
      { value: "1rem", conditions: [] },
    ]
    const after = [
      { value: "3rem", conditions: [md] },
      { value: "3rem", conditions: [] },
    ]
    expect(compareWinners(before, after, fixed, sameAttribute)).toEqual([])
  })

  it("catch a style override that lost to a breakpoint once flattened", () => {
    const before = [
      { value: "3rem", conditions: [lyra] },
      { value: "2rem", conditions: [md] },
      { value: "1rem", conditions: [] },
    ]
    const after = [
      { value: "2rem", conditions: [md] },
      { value: "3rem", conditions: [] },
    ]
    expect(compareWinners(before, after, fixed, sameAttribute)).toEqual([
      { holding: [md], before: "3rem", after: "2rem" },
    ])
  })

  it("skip two values of one attribute together", () => {
    expect(sameAttribute('[data-size="sm"]', '[data-size="lg"]')).toBe(true)
    expect(sameAttribute('[data-size="sm"]', "[data-inset]")).toBe(false)
  })
})

describe("winners, against trying every combination", () => {
  // The definition the check stands for: every subset of the free conditions, one by one.
  const enumerate = (
    before: Ranked[],
    after: Ranked[],
    fixed: (condition: string) => boolean | undefined,
    exclusive: (a: string, b: string) => boolean
  ) => {
    const free = [
      ...new Set(
        [...before, ...after].flatMap((entry) =>
          entry.conditions.filter((condition) => fixed(condition) === undefined)
        )
      ),
    ]
    const differing: string[][] = []
    for (let mask = 0; mask < 1 << free.length; mask++) {
      const holding = free.filter((_, index) => mask & (1 << index))
      if (
        holding.some((a, i) =>
          holding.slice(i + 1).some((b) => exclusive(a, b))
        )
      )
        continue
      const holds = (condition: string) =>
        fixed(condition) ?? holding.includes(condition)
      const winner = (entries: Ranked[]) =>
        entries.find((entry) => entry.conditions.every(holds))?.value
      if (winner(before) !== winner(after)) differing.push(holding)
    }
    return differing
  }

  it("agree on every random case, and each difference reported is one", () => {
    let seed = 7
    const random = () => (seed = (seed * 48271) % 2147483647) / 2147483647
    const pick = <T>(items: T[]) => items[Math.floor(random() * items.length)]
    const pool = [
      ":hover",
      ":focus",
      "[data-a]",
      '[data-s="1"]',
      '[data-s="2"]',
      "@media (x)",
      "LYRA",
      "VEGA",
      "FOREIGN",
    ]
    const fixed = (condition: string) =>
      condition === "LYRA"
        ? true
        : condition === "VEGA" || condition === "FOREIGN"
          ? false
          : undefined
    const list = () =>
      Array.from({ length: 1 + Math.floor(random() * 5) }, () => ({
        value: pick(["a", "b", "c"]),
        conditions: [
          ...new Set(
            Array.from({ length: Math.floor(random() * 3) }, () => pick(pool))
          ),
        ],
      }))
    for (let run = 0; run < 2000; run++) {
      const before = list()
      const after = list()
      const reported = compareWinners(before, after, fixed, sameAttribute)
      const differing = enumerate(before, after, fixed, sameAttribute)
      expect(reported.length > 0).toBe(differing.length > 0)
      const sets = differing.map((set) => [...set].sort().join())
      for (const { holding } of reported)
        expect(sets.includes([...holding].sort().join())).toBe(true)
    }
  })
})

describe("writing a module", () => {
  it("quotes with the quote the text does not hold", () => {
    expect(quote('[data-size="sm"]')).toBe(`'[data-size="sm"]'`)
    expect(quote(":hover")).toBe('":hover"')
  })

  it("writes tokens, reads and targets back as code, with each css() line", () => {
    const handle: StyleHandle = {
      kind: "style",
      anchors: [],
      styles: [
        {
          color: {
            base: marker({ kind: "token", group: "theme", key: "primary" }),
            [style("maia")]: "red",
          },
          borderRadius: `calc(${marker({ kind: "token", group: "radius", key: "lg" })} * 2)`,
          [marker({ kind: "target", how: "child", selector: "a" })]: {
            textDecorationLine: "underline",
          },
        },
      ],
      site: { file: "", line: 0 },
    }
    const names = {
      tokens: new Map([
        ["theme", { module: "tokens" as const, name: "theme" }],
        ["radius", { module: "tokens" as const, name: "radius" }],
      ]),
      axes: new Map([[style("maia"), "axes.style.maia"]]),
      relations: new Map(),
    }
    const { code, sites } = generate({ link: handle }, names, {
      flatten: (h) => h,
      flattenRecipe: (h) => h,
      imports: (module) => `./${module}`,
      header: "// test",
      relationsFrom: (module) => ({ specifier: `./${module}`, own: false }),
    })
    expect(code).toContain('import { css, select } from "@kirana-style/core"')
    expect(code).toContain('import { axes } from "./axes"')
    expect(code).toContain('import { radius, theme } from "./tokens"')
    expect(code).toContain(
      'color: { base: theme.primary, [axes.style.maia]: "red" }'
    )
    expect(code).toContain("borderRadius: `calc(${radius.lg} * 2)`")
    expect(code).toContain(
      '[select.child("a")]: { textDecorationLine: "underline" }'
    )
    expect(code.split("\n")[sites.get("link")! - 1]).toContain("css(")
  })
})

describe("an item's imports", () => {
  it("are every import and export source, static or dynamic", () => {
    expect(
      importsOf(
        'import a from "x"\nimport type { B } from "@s/y/z"\nexport { c } from "./c"\nconst d = import("./d")\nimport "./e.css"'
      )
    ).toEqual(["x", "@s/y/z", "./c", "./d", "./e.css"])
  })

  it("name their package", () => {
    expect(packageOf("@base-ui/react/button")).toBe("@base-ui/react")
    expect(packageOf("lucide")).toBe("lucide")
  })
})

describe("Kirana's items", () => {
  it("place a file under the alias for its folder, with its hash", () => {
    const file = (installed: string) =>
      kiranaFile({ source: "", installed, content: "x" })
    expect(file("ui/button.tsx")).toMatchObject({
      type: "ui",
      path: "button.tsx",
    })
    expect(file("lib/kirana/axes.ts")).toMatchObject({
      type: "lib",
      path: "kirana/axes.ts",
    })
    expect(file("components/login-form.tsx")).toMatchObject({
      type: "component",
      path: "login-form.tsx",
    })
    // An import names a file by the type and path the item lists it with.
    expect(
      kiranaFile({
        source: "",
        installed: "blocks/login-01/page.tsx",
        content:
          'import { LoginForm } from "@/registry/components/login-form"\nimport x from "@/registry/blocks/x"\nimport { y } from "@/registry/ui/y"',
      }).content
    ).toBe(
      'import { LoginForm } from "@/registry/component/login-form"\nimport x from "@/registry/component/blocks/x"\nimport { y } from "@/registry/ui/y"'
    )
    expect(file("blocks/login-01/page.tsx")).toMatchObject({
      type: "component",
      path: "blocks/login-01/page.tsx",
    })
    // What Kirana checks: `sha256-` and the base64 SHA-256 of the UTF-8 bytes.
    expect(hashOf("")).toBe(
      "sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU="
    )
  })

  it("name the axes their style modules read", () => {
    expect(
      axesOf(
        "const { vega } = axes.style\nfoo(axes.radius.lg, axes.style.lyra)"
      )
    ).toEqual(["radius", "style"])
  })

  it("are checked with Kirana's registry when it is there, and say so when not", async () => {
    const check = () => ({
      kind: "item",
      problems: [{ pointer: "/version", message: "is required" }],
    })
    expect(
      await checkKiranaItems([["button", {}]], async () => ({ check }))
    ).toEqual({
      problems: ["kirana/button: /version is required"],
      note: "checked with @kirana-style/registry",
    })
    expect(
      await checkKiranaItems([["button", {}]], async () => {
        throw new Error("the placeholder throws")
      })
    ).toEqual({
      problems: [],
      note: "not checked: this Kirana release has no @kirana-style/registry",
    })
  })
})
