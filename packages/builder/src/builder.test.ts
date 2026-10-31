import { describe, expect, it } from "vite-plus/test"

import { exclusiveFrom, foreignTexts } from "./check"
import {
  atDefaultAliases,
  previewedItems,
  withoutFrame,
  withoutPortNote,
} from "./demos"
import { changesFrom, classifier, flattenRecipe, flattenValue } from "./flatten"
import { generate, quote } from "./generate"
import type { RecipeHandle, StyleHandle } from "./kirana-stub"
import { relation } from "./kirana-stub"
import { marker, plainStates, split } from "./markers"
import type { Item } from "./items"
import { dependenciesOf, importsOf, ownersOf, packageOf } from "./registry"
import { checkDependencyFrameworks, checkKiranaItems } from "./kirana-check"
import { argumentsAt, choicesOf } from "./compose"
import { classDiff, hookPlaces, hooksIn, placeHooks, rulesOf } from "./upstream"
import { axesOf, kiranaFile } from "./kirana-items"
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

  it("are two exclusive states of one parent, read through one relation", () => {
    const parent = (held: string) => `relation parent drawer-popup ${held}`
    const within = (held: string) => `relation within drawer-popup ${held}`
    expect(
      exclusive(parent('[data-axis="x"]'), parent('[data-axis="y"]'))
    ).toBe(true)
    expect(exclusive(parent("[data-open]"), parent("[data-closed]"))).toBe(true)
    // Two anchors up the tree may each hold one.
    expect(
      exclusive(within('[data-axis="x"]'), within('[data-axis="y"]'))
    ).toBe(false)
    expect(
      exclusive(
        parent('[data-axis="x"]'),
        'relation parent sheet [data-axis="y"]'
      )
    ).toBe(false)
  })
})

describe("another base's keys", () => {
  it("never hold on the target, a compound key's attributes each on their own", () => {
    const foreign = foreignTexts(
      {
        opacity: {
          [state("base", ":disabled")]: 0.5,
          [state("aria", "[data-rac][data-disabled]")]: 0.5,
          "[data-open]": 1,
        },
      },
      { base: "base" }
    )
    expect(foreign).toEqual(
      new Set(["[data-rac][data-disabled]", "[data-rac]", "[data-disabled]"])
    )
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

  it("writes a fallback() chain back as code, inside a template string too", () => {
    const token = (key: string) =>
      marker({ kind: "token", group: "scrollFadeCtx", key })
    const chain = marker({
      kind: "fallback",
      args: [token("topSize"), token("size"), "min(12%, 2.5rem)"],
    })
    const handle: StyleHandle = {
      kind: "style",
      anchors: [],
      styles: [{ paddingTop: chain, marginTop: `calc(${chain} * -1)` }],
      site: { file: "", line: 0 },
    }
    const names = {
      tokens: new Map([
        [
          "scrollFadeCtx",
          { module: "context" as const, name: "scrollFadeCtx" },
        ],
      ]),
      axes: new Map(),
      relations: new Map(),
    }
    const { code } = generate({ fade: handle }, names, {
      flatten: (h) => h,
      flattenRecipe: (h) => h,
      imports: (module) => `./${module}`,
      header: "// test",
      relationsFrom: (module) => ({ specifier: `./${module}`, own: false }),
    })
    expect(code).toContain('import { css, fallback } from "@kirana-style/core"')
    expect(code).toContain(
      'paddingTop: fallback(scrollFadeCtx.topSize, scrollFadeCtx.size, "min(12%, 2.5rem)")'
    )
    expect(code).toContain(
      'marginTop: `calc(${fallback(scrollFadeCtx.topSize, scrollFadeCtx.size, "min(12%, 2.5rem)")} * -1)`'
    )
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

  it("declares an optional relation as optional", () => {
    const { code } = generate(
      {
        fieldScope: relation("field", { optional: true }),
        other: relation("x"),
      },
      { tokens: new Map(), axes: new Map(), relations: new Map() },
      {
        flatten: (h) => h,
        flattenRecipe: (h) => h,
        imports: (module) => `./${module}`,
        header: "// test",
        relationsFrom: (module) => ({ specifier: `./${module}`, own: false }),
      }
    )
    expect(code).toContain(
      'export const fieldScope = relation("field", { optional: true })'
    )
    expect(code).toContain('export const other = relation("x")')
  })

  it("re-exports a relation another module declares, once", () => {
    const { code } = generate(
      { fieldScope: relation("field", { optional: true }) },
      {
        tokens: new Map(),
        axes: new Map(),
        relations: new Map([
          ["field", { module: "field-scope.styles.ts", name: "fieldScope" }],
        ]),
      },
      {
        flatten: (h) => h,
        flattenRecipe: (h) => h,
        imports: (module) => `./${module}`,
        header: "// test",
        module: "field.styles.ts",
        relationsFrom: (module) => ({
          specifier: `./${module.replace(/\.ts$/, "")}`,
          own: false,
        }),
      }
    )
    expect(code).toContain('import { fieldScope } from "./field-scope.styles"')
    expect(code).toContain("export { fieldScope }")
    expect(code).not.toContain("relation(")
  })

  it("writes a parent read back as one, with or without its condition", () => {
    const read = (condition: string) =>
      marker({ kind: "read", relation: "field", how: "parent", condition })
    const handle: StyleHandle = {
      kind: "style",
      anchors: [],
      styles: [{ width: { [read("")]: "1rem", [read("[x]")]: "100%" } }],
      site: { file: "", line: 0 },
    }
    const { code } = generate(
      { part: handle },
      {
        tokens: new Map(),
        axes: new Map(),
        relations: new Map([
          ["field", { module: "field.styles.ts", name: "fieldScope" }],
        ]),
      },
      {
        flatten: (h) => h,
        flattenRecipe: (h) => h,
        imports: (module) => `./${module}`,
        header: "// test",
        module: "field.styles.ts",
        relationsFrom: (module) => ({ specifier: `./${module}`, own: false }),
      }
    )
    expect(code).toContain(
      'width: { [fieldScope.parent()]: "1rem", [fieldScope.parent("[x]")]: "100%" }'
    )
  })
})

describe("an item's imports", () => {
  it("are found past a comment with an apostrophe in an export list", () => {
    const code = `export {
  // Tailwind's \`font-mono\` stack.
  fontFamily,
} from "@kirana-style/preset-scales"
/* a block, it's here */ import { x } from "./y"`
    expect(importsOf(code)).toEqual(["@kirana-style/preset-scales", "./y"])
  })

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

  it("of a block's own part are its own, where another item installs the same place", () => {
    const file = (installed: string, content = "") => ({
      source: installed,
      installed,
      content,
    })
    const chart = [file("components/chart-area-interactive.tsx")]
    const block = [
      file(
        "blocks/dashboard-01/page.tsx",
        'import { ChartAreaInteractive } from "@/registry/x/components/chart-area-interactive"\nimport { Card } from "@/registry/x/ui/card"'
      ),
      file("components/chart-area-interactive.tsx"),
    ]
    const card = [file("ui/card.tsx")]
    const item = (name: string) => ({ name }) as Item
    const owner = ownersOf([
      [item("dashboard-01"), block],
      [item("chart-area-interactive"), chart],
      [item("card"), card],
    ])
    const found = dependenciesOf(
      block,
      "dashboard-01",
      owner,
      "@/registry/x",
      () => undefined
    )
    expect([...found.registryDependencies]).toEqual(["card"])
    expect(found.problems).toEqual([])
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
  })

  it("name the axes their style modules read", () => {
    expect(
      axesOf(
        "const { vega } = axes.style\nfoo(axes.radius.lg, axes.style.lyra)"
      )
    ).toEqual(["radius", "style"])
  })

  it("are checked with Kirana's registry", () => {
    const check = () => ({
      kind: "item" as const,
      problems: [{ pointer: "/version", message: "is required" }],
    })
    expect(checkKiranaItems([["button", {}]], check)).toEqual([
      "kirana/button: /version is required",
    ])
    // Kirana's own check, by default.
    expect(checkKiranaItems([["button", {}]])).toEqual([
      "kirana/button: /name is required",
      "kirana/button: /type is required",
      "kirana/button: /version is required",
    ])
  })
})

describe("a composition at a use site", () => {
  it("is each top-level argument, nested calls and arrays kept whole", () => {
    const text = "sx={[menuRowBase, inset && menuInset, mix(a, [b]), sx]}"
    expect(argumentsAt(text, text.indexOf("["))).toEqual([
      "menuRowBase",
      "inset && menuInset",
      "mix(a, [b])",
      "sx",
    ])
  })
})

describe("a choice between handles", () => {
  it("is each branch, and anything else is itself", () => {
    expect(
      choicesOf('variant === "line" ? tabs.listLine : tabs.listDefault')
    ).toEqual(["tabs.listLine", "tabs.listDefault"])
    expect(choicesOf("menuRowBase")).toEqual(["menuRowBase"])
  })
})

describe("an item's dependencies", () => {
  const targets = [
    ["react", "base"],
    ["vue", "ark"],
  ] as const
  it("must have markup on every framework the item is installed for", () => {
    const items = [
      {
        name: "select",
        registryDependencies: ["field", "kirana"],
        frameworks: { react: { base: {} }, vue: { ark: {} } },
      },
      { name: "field", frameworks: { react: { base: {} } } },
      { name: "kirana" },
    ]
    expect(checkDependencyFrameworks(items, targets)).toEqual([
      "kirana/select: needs field on vue (ark), which has no markup there.",
    ])
  })

  it("count a framework's own dependencies, and an item without frameworks everywhere", () => {
    const items = [
      {
        name: "dialog",
        frameworks: {
          react: { base: { registryDependencies: ["sx"] } },
          vue: { ark: {} },
        },
      },
      { name: "sx", frameworks: { react: { base: {} } } },
      { name: "styles", registryDependencies: ["sx"] },
    ]
    expect(checkDependencyFrameworks(items, targets)).toEqual([
      "kirana/styles: needs sx on vue (ark), which has no markup there.",
    ])
  })
})

describe("upstream's units", () => {
  it("are each style file's rules by hook, their class lists normalised", () => {
    const css = `@layer components {
  .cn-button {
    @apply inline-flex   gap-1;
  }
  .cn-button-size-sm {
    @apply h-7 px-2.5;
  }
}`
    expect([...rulesOf(css)]).toEqual([
      ["cn-button", "inline-flex gap-1"],
      ["cn-button-size-sm", "h-7 px-2.5"],
    ])
  })

  it("name the hooks a component's markup uses", () => {
    expect(hooksIn('cn("cn-card-title", x) cn-card cn-card-title')).toEqual([
      "cn-card",
      "cn-card-title",
    ])
  })

  it("diff a class list by utility", () => {
    expect(classDiff("h-7 px-2.5 text-xs", "h-7 px-3 text-xs ring-1")).toEqual({
      added: ["px-3", "ring-1"],
      removed: ["px-2.5"],
    })
  })
})

describe("a hook's place", () => {
  it("is the key or export after the comment naming it", () => {
    const text = `export const field = {
  // cn-field-set
  set: css({}),
  // cn-field and its orientations (cn-field-orientation-vertical).
  root: css({}),
}
// cn-input
export const input = css({})`
    expect(Object.fromEntries(hookPlaces("x.styles.ts", text))).toEqual({
      "cn-field-set": "registry/styles/x.styles.ts#field.set",
      "cn-field": "registry/styles/x.styles.ts#field.root",
      "cn-field-orientation-vertical": "registry/styles/x.styles.ts#field.root",
      "cn-input": "registry/styles/x.styles.ts#input",
    })
  })

  it("covers a React Aria hook with its plain one, and lists the rest", () => {
    const places = new Map([
      ["cn-label", "registry/styles/label.styles.ts#label"],
    ])
    expect(
      placeHooks(["cn-label", "cn-label-aria", "cn-other"], places)
    ).toEqual({
      placed: {
        "cn-label": "registry/styles/label.styles.ts#label",
        "cn-label-aria": "registry/styles/label.styles.ts#label",
      },
      unmapped: ["cn-other"],
    })
  })
})

describe("a read of a state key", () => {
  const open = (base: "base" | "aria", key: string) =>
    marker({
      kind: "read",
      relation: "collapsible",
      how: "within",
      condition: state(base, key),
    })

  it("is one marker holding the key's", () => {
    expect(split(`${open("base", "[data-open]")} x`)).toEqual([
      {
        kind: "read",
        relation: "collapsible",
        how: "within",
        condition: state("base", "[data-open]"),
      },
      " x",
    ])
    expect(plainStates(`a ${state("aria", "[data-expanded]")}`)).toBe(
      "a [data-expanded]"
    )
  })

  it("is kept for its base and dropped for another", () => {
    const value = {
      [open("base", "[data-open]")]: "90deg",
      [open("aria", "[data-expanded]")]: "90deg",
    }
    const flat = flattenValue(
      value,
      classifier({ style: "nova", base: "aria" })
    ) as Record<string, string>
    expect(Object.keys(flat)).toEqual([open("aria", "[data-expanded]")])
  })
})

describe("a docs demo's code", () => {
  it("takes the preview's frame off, keeping the demo's own style", () => {
    const framed = [
      'import { page } from "../../../styles/page.styles"',
      'import { Button } from "../ui/button"',
      "",
      "export default function Demo() {",
      "  return (",
      "    <div sx={page.example}>",
      "      <Button>One</Button>",
      "    </div>",
      "  )",
      "}",
    ].join("\n")
    expect(withoutFrame(framed, "react")).toBe(
      [
        'import { Button } from "../ui/button"',
        "",
        "export default function Demo() {",
        "  return (",
        "    <Button>One</Button>",
        "  )",
        "}",
      ].join("\n")
    )
    expect(withoutFrame("    <div sx={[page.example, row]}>", "react")).toBe(
      "    <div sx={row}>"
    )
    expect(withoutFrame('  <div :sx="[page.example, column]">', "vue")).toBe(
      '  <div :sx="column">'
    )
    expect(
      withoutFrame("      <Textarea sx={page.narrow} disabled />", "react")
    ).toBe("      <Textarea disabled />")
  })

  it("leaves the port's opening note out of a demo's code", () => {
    expect(
      withoutPortNote(
        '/**\n * Upstream\'s `chart-demo`, on TanStack Charts.\n */\nimport * as React from "react"\n'
      )
    ).toBe('import * as React from "react"\n')
    // A comment further down is the demo's own.
    expect(withoutPortNote('import "x"\n/** kept */\n')).toBe(
      'import "x"\n/** kept */\n'
    )
  })

  it("wraps more than one root in a fragment, in JSX only", () => {
    const framed = [
      "    <div sx={page.example}>",
      "      <A />",
      "      <B />",
      "    </div>",
    ].join("\n")
    expect(withoutFrame(framed, "react")).toBe(
      ["    <>", "      <A />", "      <B />", "    </>"].join("\n")
    )
    expect(
      withoutFrame(
        framed.replace("sx={", ':sx="').replace("example}", 'example"'),
        "vue"
      )
    ).toBe(["    <A />", "    <B />"].join("\n"))
  })

  it("names its imports at the default aliases", () => {
    expect(
      atDefaultAliases(
        'import { Button } from "@/registry/ui/button"\nimport { space } from "@/registry/lib/kirana/scales"'
      )
    ).toBe(
      'import { Button } from "@/components/ui/button"\nimport { space } from "@/lib/kirana/scales"'
    )
  })

  it("reads the items the docs preview", () => {
    expect(
      previewedItems([
        '<!-- ::preview item="button-demo" height="360" -->\n<!-- ::preview item="accordion-demo" -->',
        '<!-- ::preview item="button-demo" -->',
      ])
    ).toEqual(["accordion-demo", "button-demo"])
  })
})
