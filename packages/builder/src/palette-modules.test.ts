import { readFileSync } from "node:fs"
import { join } from "node:path"

import { describe, expect, it } from "vite-plus/test"

import {
  COLOR_AXES,
  axisModule,
  paletteModule,
  readPaletteModule,
} from "./palette-modules"

const CORE = join(import.meta.dirname, "../../../registry/core")
const [BASE, THEME] = COLOR_AXES
const module = (file: string) => readFileSync(join(CORE, file), "utf8")
/** Code without its layout, so a formatted module compares with the writer's. */
const squash = (code: string) =>
  code.replace(/\/\*\*[\s\S]*?\*\//, "").replace(/[\s,;]+/g, "")

describe("the colour axes' modules", () => {
  it("read back the palette and the commit they were written with", () => {
    for (const spec of COLOR_AXES) {
      const { palette, commit } = readPaletteModule(
        module(spec.paletteFile),
        spec
      )
      const again = readPaletteModule(
        paletteModule(spec, palette, commit),
        spec
      )
      expect(again).toEqual({ palette, commit })
      // The entries module as committed is the writer's, formatted.
      expect(squash(axisModule(spec, palette, commit))).toBe(
        squash(module(spec.file))
      )
    }
  })

  it("build one value with its colours and entries alone", () => {
    const { palette, commit } = readPaletteModule(
      module(THEME!.paletteFile),
      THEME!
    )
    const data = paletteModule(THEME!, palette, commit, "cyan")
    const entries = axisModule(THEME!, palette, commit, "cyan")
    expect(Object.keys(readPaletteModule(data, THEME!).palette)).toEqual([
      "cyan",
    ])
    expect(entries).toContain(`'[data-theme="cyan"]'`)
    expect(entries).not.toMatch(/data-theme="(?!cyan)/)
  })

  it("build the default with no entries but the menu accent's, which every design keeps", () => {
    const { palette, commit } = readPaletteModule(
      module(BASE!.paletteFile),
      BASE!
    )
    const build = axisModule(BASE!, palette, commit, "neutral")
    expect(build).not.toContain("data-base-color=")
    expect(build).not.toContain(`from "./base-color-palette"`)
    expect(build.match(/data-menu-accent="bold"/g)).toHaveLength(2)
  })

  it("build a value with no palette (the codec's gray) as the default", () => {
    const { palette, commit } = readPaletteModule(
      module(BASE!.paletteFile),
      BASE!
    )
    const data = paletteModule(BASE!, palette, commit, "gray")
    expect(readPaletteModule(data, BASE!).palette).toEqual({})
    expect(axisModule(BASE!, palette, commit, "gray")).not.toContain(
      "data-base-color="
    )
  })
})
