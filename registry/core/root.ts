/**
 * The token axes, applied to `<html>` with its attributes (`axes.ts`): each value an axis can take
 * besides its default reassigns the variable tokens it owns. The defaults are the tokens' own values
 * (`tokens.ts`), so a page with no attribute shows Neutral, Inter and a 0.625rem radius.
 *
 * The base colour, the theme and the chart colour own disjoint groups of tokens (`palettes.ts`), so
 * no two axes assign the same token and each has one winner for every combination; the compiler's
 * `ambiguous-precedence` warning is the check, and stays at zero here. The one overlap, the menu
 * accent's `bold` over the base colour's `accent`, is resolved by nesting. Their entries are
 * generated from shadcn/ui's palettes (`colors.ts`, `scripts/import-palettes.ts`).
 *
 * Every rule here is in the stylesheet ahead of time: switching a design is switching attributes.
 */
import { css } from "@kirana-style/core"

import { on } from "./axes"
import { FONT_INFO, RADIUS_VALUES } from "./config"
import { colorEntries } from "./colors"
import { font, radiusBase } from "./tokens"

export const root = css({
  ...colorEntries,

  // Radius: the base every corner derives from. Lyra and Sera draw square corners whatever the
  // radius, and Rhea has no large one: the choice is kept (`resolveDesignSystem`) and comes back with
  // another style, as on shadcn/ui's site. Each radius restates the styles' values, which win there.
  [radiusBase.value]: {
    [on.style.lyra]: RADIUS_VALUES.none,
    [on.style.sera]: RADIUS_VALUES.none,
    [on.radius.none]: RADIUS_VALUES.none,
    [on.radius.small]: {
      base: RADIUS_VALUES.small,
      [on.style.lyra]: RADIUS_VALUES.none,
      [on.style.sera]: RADIUS_VALUES.none,
    },
    [on.radius.medium]: {
      base: RADIUS_VALUES.medium,
      [on.style.lyra]: RADIUS_VALUES.none,
      [on.style.sera]: RADIUS_VALUES.none,
    },
    [on.radius.large]: {
      base: RADIUS_VALUES.large,
      [on.style.lyra]: RADIUS_VALUES.none,
      [on.style.sera]: RADIUS_VALUES.none,
      [on.style.rhea]: RADIUS_VALUES.default,
    },
  },

  // Fonts: headings follow the body font unless a heading font is chosen.
  [font.sans]: {
    [on.font["noto-sans"]]: FONT_INFO["noto-sans"].family,
    [on.font["nunito-sans"]]: FONT_INFO["nunito-sans"].family,
    [on.font.figtree]: FONT_INFO.figtree.family,
    [on.font.roboto]: FONT_INFO.roboto.family,
    [on.font.raleway]: FONT_INFO.raleway.family,
    [on.font["dm-sans"]]: FONT_INFO["dm-sans"].family,
    [on.font["public-sans"]]: FONT_INFO["public-sans"].family,
    [on.font.outfit]: FONT_INFO.outfit.family,
    [on.font["jetbrains-mono"]]: FONT_INFO["jetbrains-mono"].family,
    [on.font.geist]: FONT_INFO.geist.family,
    [on.font["geist-mono"]]: FONT_INFO["geist-mono"].family,
    [on.font.lora]: FONT_INFO.lora.family,
    [on.font.merriweather]: FONT_INFO.merriweather.family,
    [on.font["playfair-display"]]: FONT_INFO["playfair-display"].family,
    [on.font["noto-serif"]]: FONT_INFO["noto-serif"].family,
    [on.font["roboto-slab"]]: FONT_INFO["roboto-slab"].family,
    [on.font.oxanium]: FONT_INFO.oxanium.family,
    [on.font.manrope]: FONT_INFO.manrope.family,
    [on.font["space-grotesk"]]: FONT_INFO["space-grotesk"].family,
    [on.font.montserrat]: FONT_INFO.montserrat.family,
    [on.font["ibm-plex-sans"]]: FONT_INFO["ibm-plex-sans"].family,
    [on.font["source-sans-3"]]: FONT_INFO["source-sans-3"].family,
    [on.font["instrument-sans"]]: FONT_INFO["instrument-sans"].family,
    [on.font["eb-garamond"]]: FONT_INFO["eb-garamond"].family,
    [on.font["instrument-serif"]]: FONT_INFO["instrument-serif"].family,
  },
  [font.heading]: {
    base: font.sans,
    [on.fontHeading.inter]: FONT_INFO.inter.family,
    [on.fontHeading["noto-sans"]]: FONT_INFO["noto-sans"].family,
    [on.fontHeading["nunito-sans"]]: FONT_INFO["nunito-sans"].family,
    [on.fontHeading.figtree]: FONT_INFO.figtree.family,
    [on.fontHeading.roboto]: FONT_INFO.roboto.family,
    [on.fontHeading.raleway]: FONT_INFO.raleway.family,
    [on.fontHeading["dm-sans"]]: FONT_INFO["dm-sans"].family,
    [on.fontHeading["public-sans"]]: FONT_INFO["public-sans"].family,
    [on.fontHeading.outfit]: FONT_INFO.outfit.family,
    [on.fontHeading["jetbrains-mono"]]: FONT_INFO["jetbrains-mono"].family,
    [on.fontHeading.geist]: FONT_INFO.geist.family,
    [on.fontHeading["geist-mono"]]: FONT_INFO["geist-mono"].family,
    [on.fontHeading.lora]: FONT_INFO.lora.family,
    [on.fontHeading.merriweather]: FONT_INFO.merriweather.family,
    [on.fontHeading["playfair-display"]]: FONT_INFO["playfair-display"].family,
    [on.fontHeading["noto-serif"]]: FONT_INFO["noto-serif"].family,
    [on.fontHeading["roboto-slab"]]: FONT_INFO["roboto-slab"].family,
    [on.fontHeading.oxanium]: FONT_INFO.oxanium.family,
    [on.fontHeading.manrope]: FONT_INFO.manrope.family,
    [on.fontHeading["space-grotesk"]]: FONT_INFO["space-grotesk"].family,
    [on.fontHeading.montserrat]: FONT_INFO.montserrat.family,
    [on.fontHeading["ibm-plex-sans"]]: FONT_INFO["ibm-plex-sans"].family,
    [on.fontHeading["source-sans-3"]]: FONT_INFO["source-sans-3"].family,
    [on.fontHeading["instrument-sans"]]: FONT_INFO["instrument-sans"].family,
    [on.fontHeading["eb-garamond"]]: FONT_INFO["eb-garamond"].family,
    [on.fontHeading["instrument-serif"]]: FONT_INFO["instrument-serif"].family,
  },
})
