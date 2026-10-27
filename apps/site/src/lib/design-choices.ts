/**
 * The design axes the site offers, in the order the customizers show them, each with its values
 * as a picker lists them: the Customize sheet and `/create` read the same list. A value only some
 * other choice allows (a theme of the base colour's) is left out here, as shadcn/ui's customizer
 * leaves it out.
 */
import {
  BASE_COLORS,
  FONT_INFO,
  ICON_LIBRARIES,
  MENU_ACCENTS,
  MENU_COLORS,
  RADII,
  STYLES,
  STYLE_INFO,
  themesFor,
} from "@workspace/registry/core/config"
import type { Axis, DesignSystem, Font } from "@workspace/registry/core/config"

/**
 * The families the site ships (`styles/registry.css`): a font the page has not loaded would show
 * its fallback, so the pickers offer these until the site loads the others.
 */
const SITE_FONTS: readonly Font[] = ["inter", "geist"]

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
    ["baseColor", "Base colour", plain(BASE_COLORS)],
    ["theme", "Theme", plain(themesFor(system.baseColor))],
    ["chartColor", "Chart colours", plain(themesFor(system.baseColor))],
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
