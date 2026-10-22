/**
 * The token axes, applied to `<html>` with its attributes (`axes.ts`): each value an axis can take
 * besides its default reassigns the variable tokens it owns. The defaults are the tokens' own values
 * (`tokens.ts`), so a page with no attribute shows Neutral, Inter and a 0.625rem radius.
 *
 * The base colour, the theme and the chart colour own disjoint groups of tokens (`palettes.ts`), so
 * no two axes assign the same token and each has one winner for every combination; the compiler's
 * `ambiguous-precedence` warning is the check, and stays at zero here. The one overlap, the menu
 * accent's `bold` over the base colour's `accent`, is resolved by nesting.
 *
 * Every rule here is in the stylesheet ahead of time: switching a design is switching attributes.
 */
import { css } from "@kirana-style/core"

import { on } from "./axes"
import { FONT_INFO, RADIUS_VALUES } from "./config"
import { baseColors, chartColors, themeColors } from "./palettes"
import { font, radiusBase, theme } from "./tokens"

export const root = css({
  // Base colour: the 20 neutral tokens. `accent` and its foreground follow the menu accent:
  // `bold` makes them the primary colour, nested under each base colour so it wins there too.
  [theme.background]: { [on.baseColor.stone]: baseColors.stone.background },
  [theme.foreground]: { [on.baseColor.stone]: baseColors.stone.foreground },
  [theme.card]: { [on.baseColor.stone]: baseColors.stone.card },
  [theme.cardForeground]: {
    [on.baseColor.stone]: baseColors.stone.cardForeground,
  },
  [theme.popover]: { [on.baseColor.stone]: baseColors.stone.popover },
  [theme.popoverForeground]: {
    [on.baseColor.stone]: baseColors.stone.popoverForeground,
  },
  [theme.muted]: { [on.baseColor.stone]: baseColors.stone.muted },
  [theme.mutedForeground]: {
    [on.baseColor.stone]: baseColors.stone.mutedForeground,
  },
  [theme.accent]: {
    [on.menuAccent.bold]: theme.primary,
    [on.baseColor.stone]: {
      base: baseColors.stone.accent,
      [on.menuAccent.bold]: theme.primary,
    },
  },
  [theme.accentForeground]: {
    [on.menuAccent.bold]: theme.primaryForeground,
    [on.baseColor.stone]: {
      base: baseColors.stone.accentForeground,
      [on.menuAccent.bold]: theme.primaryForeground,
    },
  },
  [theme.destructive]: { [on.baseColor.stone]: baseColors.stone.destructive },
  [theme.border]: { [on.baseColor.stone]: baseColors.stone.border },
  [theme.input]: { [on.baseColor.stone]: baseColors.stone.input },
  [theme.ring]: { [on.baseColor.stone]: baseColors.stone.ring },
  [theme.sidebar]: { [on.baseColor.stone]: baseColors.stone.sidebar },
  [theme.sidebarForeground]: {
    [on.baseColor.stone]: baseColors.stone.sidebarForeground,
  },
  [theme.sidebarAccent]: {
    [on.baseColor.stone]: baseColors.stone.sidebarAccent,
  },
  [theme.sidebarAccentForeground]: {
    [on.baseColor.stone]: baseColors.stone.sidebarAccentForeground,
  },
  [theme.sidebarBorder]: {
    [on.baseColor.stone]: baseColors.stone.sidebarBorder,
  },
  [theme.sidebarRing]: { [on.baseColor.stone]: baseColors.stone.sidebarRing },

  // Theme: the 6 accent tokens.
  [theme.primary]: {
    [on.theme.stone]: themeColors.stone.primary,
    [on.theme.blue]: themeColors.blue.primary,
    [on.theme.rose]: themeColors.rose.primary,
  },
  [theme.primaryForeground]: {
    [on.theme.stone]: themeColors.stone.primaryForeground,
    [on.theme.blue]: themeColors.blue.primaryForeground,
    [on.theme.rose]: themeColors.rose.primaryForeground,
  },
  [theme.secondary]: {
    [on.theme.stone]: themeColors.stone.secondary,
    [on.theme.blue]: themeColors.blue.secondary,
    [on.theme.rose]: themeColors.rose.secondary,
  },
  [theme.secondaryForeground]: {
    [on.theme.stone]: themeColors.stone.secondaryForeground,
    [on.theme.blue]: themeColors.blue.secondaryForeground,
    [on.theme.rose]: themeColors.rose.secondaryForeground,
  },
  [theme.sidebarPrimary]: {
    [on.theme.stone]: themeColors.stone.sidebarPrimary,
    [on.theme.blue]: themeColors.blue.sidebarPrimary,
    [on.theme.rose]: themeColors.rose.sidebarPrimary,
  },
  [theme.sidebarPrimaryForeground]: {
    [on.theme.stone]: themeColors.stone.sidebarPrimaryForeground,
    [on.theme.blue]: themeColors.blue.sidebarPrimaryForeground,
    [on.theme.rose]: themeColors.rose.sidebarPrimaryForeground,
  },

  // Chart colour: the 5 chart tokens.
  [theme.chart1]: {
    [on.chartColor.stone]: chartColors.stone.chart1,
    [on.chartColor.blue]: chartColors.blue.chart1,
    [on.chartColor.rose]: chartColors.rose.chart1,
  },
  [theme.chart2]: {
    [on.chartColor.stone]: chartColors.stone.chart2,
    [on.chartColor.blue]: chartColors.blue.chart2,
    [on.chartColor.rose]: chartColors.rose.chart2,
  },
  [theme.chart3]: {
    [on.chartColor.stone]: chartColors.stone.chart3,
    [on.chartColor.blue]: chartColors.blue.chart3,
    [on.chartColor.rose]: chartColors.rose.chart3,
  },
  [theme.chart4]: {
    [on.chartColor.stone]: chartColors.stone.chart4,
    [on.chartColor.blue]: chartColors.blue.chart4,
    [on.chartColor.rose]: chartColors.rose.chart4,
  },
  [theme.chart5]: {
    [on.chartColor.stone]: chartColors.stone.chart5,
    [on.chartColor.blue]: chartColors.blue.chart5,
    [on.chartColor.rose]: chartColors.rose.chart5,
  },

  // Radius: the base every corner derives from.
  [radiusBase.value]: {
    [on.radius.none]: RADIUS_VALUES.none,
    [on.radius.small]: RADIUS_VALUES.small,
    [on.radius.medium]: RADIUS_VALUES.medium,
    [on.radius.large]: RADIUS_VALUES.large,
  },

  // Fonts: headings follow the body font unless a heading font is chosen.
  [font.sans]: { [on.font.geist]: FONT_INFO.geist.family },
  [font.heading]: {
    base: font.sans,
    [on.fontHeading.inter]: FONT_INFO.inter.family,
    [on.fontHeading.geist]: FONT_INFO.geist.family,
  },
})
