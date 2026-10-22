import { describe, expect, it } from "vite-plus/test"

import {
  AXES,
  BASE_COLORS,
  DEFAULT_DESIGN_SYSTEM,
  FONTS,
  FONT_INFO,
  FRAMEWORKS,
  FRAMEWORK_BASES,
  RADII,
  RADIUS_VALUES,
  STYLES,
  STYLE_INFO,
  resolveDesignSystem,
  themesFor,
} from "./config"

describe("the axes", () => {
  it("default to each list's first value", () => {
    for (const [axis, values] of Object.entries(AXES))
      expect(DEFAULT_DESIGN_SYSTEM[axis as keyof typeof AXES]).toBe(values[0])
  })

  it("describe every value they list", () => {
    expect(Object.keys(STYLE_INFO)).toEqual([...STYLES])
    expect(Object.keys(FONT_INFO)).toEqual([...FONTS])
    expect(Object.keys(RADIUS_VALUES)).toEqual([...RADII])
    expect(Object.keys(FRAMEWORK_BASES)).toEqual([...FRAMEWORKS])
  })

  it("name every value once", () => {
    for (const values of Object.values(AXES))
      expect(new Set(values).size).toBe(values.length)
  })

  it("give radii as lengths, so a corner can multiply them", () => {
    for (const value of Object.values(RADIUS_VALUES))
      expect(value).toMatch(/^\d+(\.\d+)?rem$/)
  })
})

describe("themesFor", () => {
  it("allows the base colour itself and every hue, never another base colour", () => {
    const themes = themesFor("stone")
    expect(themes).toContain("stone")
    expect(themes).toContain("blue")
    for (const other of BASE_COLORS.filter((color) => color !== "stone"))
      expect(themes).not.toContain(other)
  })
})

describe("resolveDesignSystem", () => {
  it("fills every axis from the defaults", () => {
    expect(resolveDesignSystem({})).toEqual({
      system: DEFAULT_DESIGN_SYSTEM,
      unknown: [],
    })
  })

  it("reports an unknown value and keeps the default", () => {
    const { system, unknown } = resolveDesignSystem({
      font: "comic-sans",
      menuAccent: "loud",
    })
    expect(unknown).toEqual(["font", "menuAccent"])
    expect(system.font).toBe("inter")
    expect(system.menuAccent).toBe("subtle")
  })

  it("gives a framework one of its own bases", () => {
    expect(
      resolveDesignSystem({ framework: "solid", base: "base" }).system.base
    ).toBe("ark")
    expect(
      resolveDesignSystem({ framework: "react", base: "ark" }).system.base
    ).toBe("base")
    expect(
      resolveDesignSystem({ framework: "react", base: "aria" }).system.base
    ).toBe("aria")
  })

  it("keeps the theme and the chart colour to the base colour or a hue", () => {
    const { system } = resolveDesignSystem({
      baseColor: "stone",
      theme: "neutral",
      chartColor: "zinc",
    })
    expect(system.theme).toBe("stone")
    expect(system.chartColor).toBe("stone")
    const hue = resolveDesignSystem({
      baseColor: "stone",
      theme: "blue",
      chartColor: "zinc",
    }).system
    expect(hue.chartColor).toBe("blue")
  })

  it("gives Lyra and Sera square corners, and Rhea no large ones", () => {
    for (const style of ["lyra", "sera"])
      expect(
        resolveDesignSystem({ style, radius: "large" }).system.radius
      ).toBe("none")
    expect(
      resolveDesignSystem({ style: "rhea", radius: "large" }).system.radius
    ).toBe("default")
    expect(
      resolveDesignSystem({ style: "rhea", radius: "small" }).system.radius
    ).toBe("small")
  })
})
