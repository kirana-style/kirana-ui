import { readFileSync } from "node:fs"
import { join } from "node:path"

import { describe, expect, it } from "vite-plus/test"

import {
  VOCABULARIES,
  configModule,
  importsFrom,
  kiranaModule,
  ownPairs,
  withoutStates,
} from "./design-system"
import { COLOR_AXES, axisModule, readPaletteModule } from "./palette-modules"

const CORE = join(import.meta.dirname, "../../../registry/core")

const block = `import { css } from "@kirana-style/core"
import { orientation, when } from "@/registry/lib/kirana/states"
import { space } from "@/registry/lib/kirana/scales"

const styles = {
  separator: css({
    height: { ...when(orientation.vertical, space[4]) },
    alignSelf: when(orientation.vertical, "auto"),
  }),
}

export const Page = () => <Separator orientation="vertical" sx={styles.separator} />
`

describe("markup written without states.ts", () => {
  it("writes each when() with the keys its base writes, and drops the import", () => {
    const problems: string[] = []
    const aria = withoutStates("page.tsx", block, "aria", problems)
    expect(aria).not.toContain("lib/kirana/states")
    expect(aria).toContain(
      `height: { '[aria-orientation="vertical"]': space[4] },`
    )
    expect(aria).toContain(
      `alignSelf: { '[aria-orientation="vertical"]': "auto" },`
    )
    // A prop of the same name is no read of the module.
    expect(aria).toContain(`<Separator orientation="vertical"`)
    expect(problems).toEqual([])
    // Kirana UI Primitives write Base UI's key.
    expect(withoutStates("page.tsx", block, "kirana", problems)).toContain(
      `'[data-orientation="vertical"]': space[4]`
    )
  })

  it("reports a read it cannot write, since a project has no states.ts", () => {
    const problems: string[] = []
    withoutStates(
      "page.tsx",
      `import { orientation } from "@/registry/lib/kirana/states"\nconst key = orientation.vertical.base\n`,
      "base",
      problems
    )
    expect(problems).toEqual([
      "page.tsx: reads orientation from states.ts, which a project does not install",
    ])
  })

  it("leaves a file that does not import states.ts as it is", () => {
    const text = `import { css } from "@kirana-style/core"\n`
    expect(withoutStates("a.ts", text, "base", [])).toBe(text)
  })
})

describe("the installed kirana.ts", () => {
  it("imports its base's vocabularies alone and keeps the pairs its code meets", () => {
    const code = `'[aria-orientation="horizontal"]' '[aria-orientation="vertical"]'`
    const module = kiranaModule("aria", code)
    expect(module).toContain(
      `import * as Aria from "@kirana-style/states/react-aria"`
    )
    expect(module.match(/@kirana-style\/states\//g)).toHaveLength(1)
    expect(module).not.toContain("exclusiveAcross")
    expect(module).toContain(
      `['[aria-orientation="horizontal"]', '[aria-orientation="vertical"]'],`
    )
    expect(module).not.toContain("data-swipe-axis")
    expect(module).toContain("export const installConfig")
  })

  it("names both vocabularies on Kirana UI Primitives", () => {
    expect(VOCABULARIES.kirana).toEqual(["kirana-ui", "base-ui"])
    const module = kiranaModule("kirana", "")
    expect(module).toContain("...KiranaUi.exclusive,")
    expect(module).toContain("...Base.exclusive,")
  })

  it("takes the registry's own pairs, not the vocabularies'", () => {
    const pairs = ownPairs()
    expect(pairs).toContainEqual([
      '[data-swipe-axis="x"]',
      '[data-swipe-axis="y"]',
    ])
    expect(pairs.length).toBeLessThan(20)
  })
})

describe("the installed config.ts", () => {
  it("holds what the installed files import, written out", () => {
    const imported = importsFrom(
      `import { FONT_INFO, RADIUS_VALUES } from "./config"\nimport type { Axis } from "./config"\nimport { x } from "./other"\n`,
      (specifier) => specifier === "./config"
    )
    const problems: string[] = []
    const module = configModule(imported, problems)
    expect(problems).toEqual([])
    expect(module).toContain(
      `export type Axis = "framework" | "base" | "style"`
    )
    expect(module).toContain(`export const RADIUS_VALUES = {`)
    expect(module).toContain(`family: "'Inter Variable', sans-serif",`)
    expect(module).not.toContain("FRAMEWORK_BASES")
    expect(module).not.toContain("STYLE_INFO")
  })

  it("reports a name it cannot write", () => {
    const problems: string[] = []
    configModule(
      { values: new Set(["resolveDesignSystem"]), types: new Set(["Nope"]) },
      problems
    )
    expect(problems).toHaveLength(2)
  })
})

describe("the colour entries as installed", () => {
  it("write the value's colours in, importing no palette module", () => {
    const theme = COLOR_AXES.find((spec) => spec.axis === "theme")!
    const { palette, commit } = readPaletteModule(
      readFileSync(join(CORE, theme.paletteFile), "utf8"),
      theme
    )
    const cyan = axisModule(theme, palette, commit, "cyan", true)
    expect(cyan).not.toContain("theme-palette")
    expect(cyan).toMatch(/const themeColors = \{\n {2}cyan: \{/)
    expect(cyan).toContain(`'[data-theme="cyan"]'`)
    const neutral = axisModule(theme, palette, commit, "neutral", true)
    expect(neutral).not.toContain("themeColors")
  })
})
