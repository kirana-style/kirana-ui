/**
 * The design axes the site offers, in the order the customizers show them, each with its values
 * as a picker lists them: the bottom bar and `/create` read the same list. Only values the site
 * draws are offered: the base colours, themes and chart colours with a palette (`palettes.ts`, all
 * of shadcn/ui's; the codec's `gray` has none, as upstream's site has none), and the fonts the site
 * loads. A value only some other choice allows (a theme of the base colour's) is left out, as
 * shadcn/ui's customizer leaves it out.
 */
import {
  FONT_INFO,
  ICON_LIBRARIES,
  MENU_ACCENTS,
  MENU_COLORS,
  RADII,
  STYLES,
  STYLE_INFO,
  themesFor,
} from "@workspace/registry/core/config"
import type {
  Axis,
  BaseColor,
  DesignSystem,
  Font,
  Theme,
} from "@workspace/registry/core/config"
import { baseColors, themeColors } from "@workspace/registry/core/palettes"

/**
 * The families the site ships (`styles/registry.css`): a font the page has not loaded would show
 * its fallback, so the pickers offer these until the site loads the others.
 */
export const SITE_FONTS: readonly Font[] = ["inter", "geist"]

/** The base colours with a palette, in shadcn/ui's order. */
export const BASE_COLOR_CHOICES = Object.keys(baseColors) as BaseColor[]

/** The themes (and chart colours) a base colour allows that have a palette. */
export function themeChoices(baseColor: BaseColor): Theme[] {
  return themesFor(baseColor).filter((theme) => theme in themeColors)
}

/** `default-translucent` as "Default translucent". */
const title = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1).replaceAll("-", " ")

export type Choice = { value: string; label: string }

/** The design axes a customizer offers; the framework and base are the project's (`/create`). */
export type DesignAxis = Exclude<Axis, "framework" | "base">

export function designChoices(
  system: DesignSystem
): [DesignAxis, string, Choice[]][] {
  const plain = (values: readonly string[]) =>
    values.map((value) => ({ value, label: title(value) }))
  const fonts = SITE_FONTS.map((font) => ({
    value: font,
    label: FONT_INFO[font].title,
  }))
  return [
    [
      "style",
      "Style",
      STYLES.map((style) => ({ value: style, label: STYLE_INFO[style].title })),
    ],
    ["baseColor", "Base colour", plain(BASE_COLOR_CHOICES)],
    ["theme", "Theme", plain(themeChoices(system.baseColor))],
    ["chartColor", "Chart colours", plain(themeChoices(system.baseColor))],
    ["font", "Font", fonts],
    [
      "fontHeading",
      "Heading font",
      [{ value: "inherit", label: "The font" }, ...fonts],
    ],
    ["radius", "Radius", plain(RADII)],
    ["iconLibrary", "Icon library", plain(ICON_LIBRARIES)],
    ["menuColor", "Menu colour", plain(MENU_COLORS)],
    ["menuAccent", "Menu accent", plain(MENU_ACCENTS)],
  ]
}
