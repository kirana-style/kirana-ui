import { describe, expect, it } from "vite-plus/test"

import { AXES, DEFAULT_DESIGN_SYSTEM } from "./config"
import type { DesignSystem } from "./config"
import {
  PRESET_FIELDS,
  decodePreset,
  encodePreset,
  isPresetCode,
  readDesignSystem,
} from "./preset"

const params = (query: string) => new URLSearchParams(query)

function base62(value: number): string {
  const alphabet =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  let digits = ""
  for (let rest = value; rest > 0; rest = Math.floor(rest / 62))
    digits = alphabet[rest % 62] + digits
  return digits || "0"
}

describe("k codes", () => {
  it("fit in a safe integer, and every list fits its field", () => {
    const bits = PRESET_FIELDS.reduce((sum, field) => sum + field.bits, 0)
    expect(bits).toBe(51)
    expect(bits).toBeLessThanOrEqual(53)
    for (const field of PRESET_FIELDS)
      expect(field.values.length).toBeLessThanOrEqual(2 ** field.bits)
  })

  it("cover every axis once", () => {
    expect(PRESET_FIELDS.map((field) => field.key).sort()).toEqual(
      Object.keys(AXES).sort()
    )
  })

  it("write the default design system as k0", () => {
    expect(encodePreset(DEFAULT_DESIGN_SYSTEM)).toBe("k0")
    expect(decodePreset("k0")).toEqual(DEFAULT_DESIGN_SYSTEM)
  })

  it("round-trip every value of every axis", () => {
    for (const field of PRESET_FIELDS)
      for (const value of field.values) {
        const system = { ...DEFAULT_DESIGN_SYSTEM, [field.key]: value }
        expect(decodePreset(encodePreset(system))).toEqual(system)
      }
  })

  it("round-trip a design system with every axis away from its default", () => {
    const system: DesignSystem = {
      framework: "svelte",
      base: "ark",
      style: "rhea",
      baseColor: "taupe",
      theme: "violet",
      chartColor: "teal",
      iconLibrary: "remixicon",
      font: "instrument-serif",
      fontHeading: "eb-garamond",
      radius: "small",
      menuColor: "inverted-translucent",
      menuAccent: "bold",
    }
    const code = encodePreset(system)
    expect(isPresetCode(code)).toBe(true)
    expect(code.length).toBeLessThanOrEqual(10)
    expect(decodePreset(code)).toEqual(system)
  })

  it("read an index past a list's end as the axis's default", () => {
    // The style is 5 bits from bit 28; index 31 is past the eight styles.
    const offset = PRESET_FIELDS.slice(0, 7).reduce((sum, f) => sum + f.bits, 0)
    expect(PRESET_FIELDS[7].key).toBe("style")
    expect(decodePreset(`k${base62(31 * 2 ** offset)}`)?.style).toBe("nova")
  })
})

describe("shadcn/ui's codes", () => {
  // Written by shadcn/ui's own encoder (packages/registry/src/preset/preset.ts at 25af02b), or
  // taken from ui.shadcn.com (b6ZjlcKFk). Each must open here as it looks there.
  const fixtures: [string, Partial<DesignSystem>][] = [
    [
      "b0",
      {
        style: "nova",
        baseColor: "neutral",
        theme: "neutral",
        chartColor: "neutral",
        iconLibrary: "lucide",
        font: "inter",
        fontHeading: "inherit",
        radius: "default",
        menuColor: "default",
        menuAccent: "subtle",
      },
    ],
    [
      "bLYa5Y9gx",
      {
        style: "lyra",
        baseColor: "stone",
        theme: "rose",
        chartColor: "blue",
        iconLibrary: "hugeicons",
        font: "geist",
        fontHeading: "inter",
        radius: "none",
        menuColor: "inverted-translucent",
        menuAccent: "bold",
      },
    ],
    [
      "bbWkWAc",
      {
        style: "maia",
        baseColor: "neutral",
        theme: "blue",
        chartColor: "neutral",
        iconLibrary: "tabler",
        font: "figtree",
        fontHeading: "inherit",
        radius: "large",
        menuColor: "default-translucent",
        menuAccent: "subtle",
      },
    ],
    [
      "b4xFeBLg5Q",
      {
        style: "sera",
        baseColor: "taupe",
        theme: "taupe",
        chartColor: "taupe",
        iconLibrary: "lucide",
        font: "noto-sans",
        fontHeading: "playfair-display",
        radius: "none",
        menuColor: "default",
        menuAccent: "subtle",
      },
    ],
    [
      "b89Vy46mvg",
      {
        style: "rhea",
        baseColor: "mist",
        theme: "amber",
        chartColor: "violet",
        iconLibrary: "remixicon",
        font: "instrument-serif",
        fontHeading: "eb-garamond",
        radius: "small",
        menuColor: "default",
        menuAccent: "bold",
      },
    ],
    [
      "b6ZjlcKFk",
      {
        style: "mira",
        baseColor: "mauve",
        theme: "mauve",
        chartColor: "mauve",
        iconLibrary: "lucide",
        font: "inter",
        fontHeading: "inherit",
        radius: "default",
        menuColor: "default",
        menuAccent: "subtle",
      },
    ],
    // `a` codes predate the chart colour and the heading font; a base colour's theme reopens
    // with the hue its charts used then.
    [
      "a0",
      {
        style: "nova",
        theme: "neutral",
        chartColor: "blue",
        fontHeading: "inherit",
      },
    ],
    [
      "aZ9",
      {
        font: "nunito-sans",
        radius: "small",
        menuColor: "inverted-translucent",
        chartColor: "blue",
      },
    ],
  ]

  for (const [code, expected] of fixtures)
    it(`decodes ${code}`, () => {
      expect(isPresetCode(code)).toBe(true)
      expect(decodePreset(code)).toMatchObject(expected)
    })

  it("leave the framework and the base to the URL", () => {
    expect(decodePreset("b0")).not.toHaveProperty("framework")
    expect(decodePreset("b0")).not.toHaveProperty("base")
  })
})

describe("isPresetCode", () => {
  it("rejects what is not a code", () => {
    for (const value of ["", "k", "c0", "k!", "b0+", "k01234567890", " k0"])
      expect(isPresetCode(value)).toBe(false)
    expect(decodePreset("c0")).toBeNull()
  })
})

describe("readDesignSystem", () => {
  it("takes the code, then the axes named beside it, then the rules", () => {
    const { system, unknown } = readDesignSystem(
      params("preset=bLYa5Y9gx&framework=vue&radius=large")
    )
    expect(unknown).toEqual([])
    expect(system).toMatchObject({
      style: "lyra",
      theme: "rose",
      framework: "vue",
      // Vue has only Ark UI.
      base: "ark",
      // Lyra keeps its square corners whatever the URL asks.
      radius: "none",
    })
  })

  it("reports a malformed code and an unknown value, and keeps the defaults", () => {
    const { system, unknown } = readDesignSystem(
      params("preset=zz&style=papyrus")
    )
    expect(unknown).toEqual(["preset", "style"])
    expect(system).toEqual(DEFAULT_DESIGN_SYSTEM)
  })

  it("reads the default system from an empty URL", () => {
    expect(readDesignSystem(params(""))).toEqual({
      system: DEFAULT_DESIGN_SYSTEM,
      unknown: [],
    })
  })
})
