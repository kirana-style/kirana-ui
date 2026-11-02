/**
 * The colour axes from shadcn/ui's `apps/v4/registry/themes.ts`, two modules per axis in
 * `registry/core/`: its values as `light-dark()` pairs, plain data the site's pickers and the tests
 * read too (`base-color-palette.ts`, `theme-palette.ts`, `chart-color-palette.ts`), and the root's
 * entries that reassign the tokens it owns under each value's attribute on `<html>`
 * (`base-colors.ts`, `themes.ts`, `chart-colors.ts`); and `neutral.ts`, the default design's
 * colours the tokens are declared with. The modules are written by the builder's
 * `palette-modules.ts`, which also writes both for one value at a time for the `kirana` item, so a
 * project installs its own design's colours only.
 *
 *   bun scripts/import-palettes.ts [<shadcn-ui checkout>]   # default: ../../myna-creative/shadcn-ui
 *
 * Then `vp check --fix` formats them. A value upstream does not have (the codec's `gray`) gets no
 * palette: a design naming it draws the default, and the customizers do not offer it.
 */
import { execFileSync } from "node:child_process"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

import {
  COLOR_AXES,
  axisModule,
  neutralModule,
  paletteModule,
} from "../packages/builder/src/palette-modules"
import type { Palette } from "../packages/builder/src/palette-modules"

const ROOT = join(import.meta.dirname, "..")
const UPSTREAM = process.argv[2] ?? join(ROOT, "../../myna-creative/shadcn-ui")
const THEMES_FILE = join(UPSTREAM, "apps/v4/registry/themes.ts")

type Vars = Record<string, string>
type Theme = { name: string; cssVars: { light: Vars; dark: Vars } }

// The module is one array of data with types around it: the array alone is read.
const text = readFileSync(THEMES_FILE, "utf8")
const end = text.indexOf("] as const")
const source = `return ${text.slice(text.indexOf("["), end + 1)}`
const themes = new Function(source)() as Theme[]
const commit = execFileSync(
  "git",
  ["-C", UPSTREAM, "rev-parse", "--short", "HEAD"],
  {
    encoding: "utf8",
  }
).trim()

/** The base colours upstream's site offers (`apps/v4/registry/base-colors.ts`). */
const BASE = ["neutral", "stone", "zinc", "mauve", "olive", "mist", "taupe"]

const BASE_TOKENS = [
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "border",
  "input",
  "ring",
  "sidebar",
  "sidebar-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
]
const THEME_TOKENS = [
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
]
const CHART_TOKENS = ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"]

const camel = (name: string) =>
  name.replace(/-([a-z0-9])/g, (_, next: string) => next.toUpperCase())
const pair = (light: string, dark: string) =>
  light === dark ? light : `light-dark(${light}, ${dark})`

/** Each named value's colours for the tokens given, keyed in camel case. */
function palette(names: string[], tokens: string[]): Palette {
  return Object.fromEntries(
    names.map((name) => {
      const theme = themes.find((entry) => entry.name === name)!
      const values = tokens.map((token) => {
        const light = theme.cssVars.light[token]
        const dark = theme.cssVars.dark[token]
        if (!light || !dark) throw new Error(`${name} has no ${token}`)
        return [camel(token), pair(light, dark)]
      })
      return [name, Object.fromEntries(values)]
    })
  )
}

const all = themes.map((theme) => theme.name)

/**
 * shadcn/ui merges a base colour's properties, then the theme's, then the chart colour's
 * `chart-1` to `chart-5`. The three never set the same token, so each axis owns a disjoint group.
 * The radius every base colour sets (0.625rem) is the radius axis's default (`config.ts`).
 */
const palettes: Record<(typeof COLOR_AXES)[number]["axis"], Palette> = {
  baseColor: palette(BASE, BASE_TOKENS),
  theme: palette(all, THEME_TOKENS),
  chartColor: palette(all, CHART_TOKENS),
}

for (const spec of COLOR_AXES) {
  writeFileSync(
    join(ROOT, "registry/core", spec.paletteFile),
    paletteModule(spec, palettes[spec.axis], commit)
  )
  writeFileSync(
    join(ROOT, "registry/core", spec.file),
    axisModule(spec, palettes[spec.axis], commit)
  )
}
writeFileSync(
  join(ROOT, "registry/core/neutral.ts"),
  neutralModule(
    {
      ...palettes.baseColor.neutral,
      ...palettes.theme.neutral,
      ...palettes.chartColor.neutral,
    },
    commit
  )
)
console.log(
  `palettes: ${BASE.length} base colours, ${all.length} themes and chart colours, from ${commit}`
)
