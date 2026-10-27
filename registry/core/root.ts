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
  [font.sans]: { [on.font.geist]: FONT_INFO.geist.family },
  [font.heading]: {
    base: font.sans,
    [on.fontHeading.inter]: FONT_INFO.inter.family,
    [on.fontHeading.geist]: FONT_INFO.geist.family,
  },
})
