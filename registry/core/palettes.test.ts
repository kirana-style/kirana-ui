import { describe, expect, it } from "vite-plus/test"

import { BASE_COLORS, THEMES } from "./config"
import { baseColors, chartColors, themeColors } from "./palettes"

const keys = (group: Record<string, object>) =>
  Object.values(group).map((colors) => Object.keys(colors))

describe("the palettes", () => {
  it("give every base colour, theme and chart colour the same tokens", () => {
    for (const group of [baseColors, themeColors, chartColors]) {
      const [first, ...rest] = keys(group)
      for (const other of rest) expect(other).toEqual(first)
    }
  })

  it("own disjoint groups of tokens, 20 + 6 + 5, so no two axes set one token", () => {
    const neutral = Object.keys(baseColors.neutral)
    const accent = Object.keys(themeColors.neutral)
    const chart = Object.keys(chartColors.neutral)
    expect([neutral.length, accent.length, chart.length]).toEqual([20, 6, 5])
    expect(new Set([...neutral, ...accent, ...chart]).size).toBe(31)
  })

  it("name only values the axes know", () => {
    for (const name of Object.keys(baseColors))
      expect(BASE_COLORS).toContain(name)
    for (const name of [
      ...Object.keys(themeColors),
      ...Object.keys(chartColors),
    ])
      expect(THEMES).toContain(name)
  })

  it("write each colour as one value or a light-dark() pair of two", () => {
    const colour = String.raw`oklch\([\d.]+ [\d.]+ [\d.]+( \/ \d+%)?\)`
    const pattern = new RegExp(
      `^(${colour}|light-dark\\(${colour}, ${colour}\\))$`
    )
    for (const group of [baseColors, themeColors, chartColors])
      for (const colors of Object.values(group))
        for (const value of Object.values(colors))
          expect(value).toMatch(pattern)
  })
})
