import { describe, expect, it } from "vite-plus/test"

import {
  DEFAULT_DESIGN_SYSTEM,
  themesFor,
} from "@workspace/registry/core/config"
import { encodePreset } from "@workspace/registry/core/preset"

import {
  componentsJson,
  initCommand,
  presetRun,
  itemOf,
  openPreset,
  shuffle,
} from "./create"

describe("/create", () => {
  it("shuffles only the axes not locked, within the rules between axes", () => {
    let seed = 0.37
    const random = () => (seed = (seed * 9301 + 0.49297) % 1)
    for (let run = 0; run < 50; run++) {
      const next = shuffle(
        { ...DEFAULT_DESIGN_SYSTEM, style: "lyra" },
        new Set(["style", "font"]),
        random
      )
      expect(next.style).toBe("lyra")
      expect(next.font).toBe(DEFAULT_DESIGN_SYSTEM.font)
      // A theme is one the base colour allows.
      expect(themesFor(next.baseColor)).toContain(next.theme)
    }
  })

  it("opens a preset from a code, a link, or neither", () => {
    const blue = {
      ...DEFAULT_DESIGN_SYSTEM,
      style: "maia",
      theme: "blue",
    } as const
    const code = encodePreset(blue)
    expect(openPreset(code)?.style).toBe("maia")
    expect(
      openPreset(`https://ui.kirana.style/create?preset=${code}`)?.theme
    ).toBe("blue")
    // shadcn/ui's own codes and links: `b6ZjlcKFk` is Mira on Mauve.
    expect(
      openPreset("https://ui.shadcn.com/create?preset=b6ZjlcKFk")?.style
    ).toBe("mira")
    expect(openPreset("not a preset")).toBeNull()
    expect(openPreset("https://example.com/")).toBeNull()
  })

  it("writes the project's commands for its design", () => {
    const design = {
      ...DEFAULT_DESIGN_SYSTEM,
      base: "aria",
      style: "lyra",
    } as const
    const command = initCommand(design, "vite-react")
    expect(command).toContain("--template vite-react my-app")
    expect(command).toContain("--framework react --base aria")
    expect(command).toContain(`--preset ${encodePreset(design)}`)
    expect(command).not.toContain("--pointer")
    expect(
      initCommand(design, "vite-react", { pointer: true, rtl: true })
    ).toContain("--pointer --rtl")
    expect(presetRun(design, { rtl: true })).toBe(
      `kirana-style ui preset ${encodePreset(design)} --rtl`
    )
    expect(JSON.parse(componentsJson(design)).style).toBe("react-aria-lyra")
    expect(itemOf("dropdown-menu-demo")).toBe("dropdown-menu")
    expect(itemOf("sidebar-07")).toBe("sidebar-07")
  })
})
