import { describe, expect, it } from "vite-plus/test"

import { exclusiveFrom } from "./check"
import { changesFrom, classifier, flattenRecipe, flattenValue } from "./flatten"
import { generate, quote } from "./generate"
import type { RecipeHandle, StyleHandle } from "./kirana-stub"
import { marker } from "./markers"
import { importsOf, packageOf } from "./registry"
import { entriesOf, mergeStyles, valueOf } from "./styles"
import { readLine, readTrace, splitTop } from "./trace"
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

describe("reading kirana-style trace", () => {
  it("splits outside brackets and quotes", () => {
    expect(splitTop(':not(:has(a & b)) & [x="a & b"] & :hover', " & ")).toEqual(
      [":not(:has(a & b))", '[x="a & b"]', ":hover"]
    )
  })

  it("reads a value and its conditions, short or long", () => {
    expect(
      readLine(
        '  ✓ 2rem                     [data-size="sm"] & relation Within .kr0UoJ[data-style="vega"] kirana.atoms       step 6 (deterministic tie-break; see ambiguous-precedence)'
      )
    ).toEqual({
      value: "2rem",
      conditions: [
        '[data-size="sm"]',
        'relation Within .kr0UoJ[data-style="vega"]',
      ],
    })
    expect(
      readLine(
        '  ✓ light-dark(var(--kvFpAq), var(--kvEiqo)) :hover & relation Within .kr0UoJ[data-style="maia"] kirana.atoms       step 2 (2 conditions > 1)'
      ).value
    ).toBe("light-dark(var(--kvFpAq), var(--kvEiqo))")
    expect(
      readLine(
        "    calc(0.5rem * -1) 0      base                             kirana.atoms       "
      )
    ).toEqual({
      value: "calc(0.5rem * -1) 0",
      conditions: [],
    })
  })

  it("takes the entries after the header, in order", () => {
    const ranked = readTrace(
      [
        "height at styles/x.ts:3",
        '  ✓ 2rem                     [data-size="sm"]                 kirana.atoms       step 2 (1 condition > 0)',
        "    1rem                     base                             kirana.atoms       ",
      ].join("\n")
    )
    expect(ranked.map((entry) => entry.value)).toEqual(["2rem", "1rem"])
  })

  it("refuses a line it cannot take apart", () => {
    expect(() => readLine("  ✓ ???")).toThrow()
  })
})

describe("winners", () => {
  const lyra = 'relation Within .kr0UoJ[data-style="lyra"]'
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
