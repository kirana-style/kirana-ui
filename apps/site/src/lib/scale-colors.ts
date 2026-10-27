/**
 * The colour scales of `@kirana-style/preset-scales` (Tailwind's palette, as `oklch()` values), as
 * the colours page lists them: each palette's shades, each with the three ways a project writes
 * it, the Kirana token (`color.red[500]`, inlined by the compiler), the `oklch()` value, and hex
 * for tools that take only sRGB (converted here, clamped into its gamut).
 */
import { color } from "@kirana-style/preset-scales"

export const COLOR_FORMATS = ["token", "oklch", "hex"] as const
export type ColorFormat = (typeof COLOR_FORMATS)[number]

export type ScaleColor = {
  scale: string
  token: string
  oklch: string
  hex: string
}

export type Palette = { name: string; colors: ScaleColor[] }

/** `oklch(L% C H)` into sRGB hex, through OKLab and linear sRGB (Björn Ottosson's matrices). */
export function oklchToHex(value: string): string {
  const match = /oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)/.exec(value)
  if (!match) return value
  const lightness = Number(match[1]) / (value.includes("%") ? 100 : 1)
  const chroma = Number(match[2])
  const hue = (Number(match[3]) * Math.PI) / 180
  const a = chroma * Math.cos(hue)
  const b = chroma * Math.sin(hue)
  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3
  const linear = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ]
  return `#${linear
    .map((channel) => {
      const gamma =
        channel <= 0.0031308
          ? 12.92 * channel
          : 1.055 * channel ** (1 / 2.4) - 0.055
      const byte = Math.round(Math.min(1, Math.max(0, gamma)) * 255)
      return byte.toString(16).padStart(2, "0")
    })
    .join("")}`
}

/** Every palette with shades, in the scale's order; `black` and `white` have none. */
export const PALETTES: Palette[] = (
  Object.entries(color) as [string, string | Record<string, string>][]
)
  .filter(
    (entry): entry is [string, Record<string, string>] =>
      typeof entry[1] === "object"
  )
  .map(([name, shades]) => ({
    name,
    colors: Object.entries(shades).map(([scale, oklch]) => ({
      scale,
      token: `color.${name}[${scale}]`,
      oklch,
      hex: oklchToHex(oklch),
    })),
  }))
