/**
 * Chart, in every style: shadcn/ui's `bases/base/ui/chart.tsx` with the `cn-chart-tooltip` rules of
 * its style files (MIT), at commit `25af02b`, on TanStack Charts instead of Recharts. Nova is the
 * base look; the other styles override what differs.
 *
 * TanStack Charts draws the chart from a definition: its ticks, grid and focus ring take their
 * colours from `chartTheme` (`chart.tsx`), which reads these tokens, where upstream reached into
 * Recharts' classes (`[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground`). What is
 * styled here is the container, the tooltip body and the legend; the library's own tooltip
 * surface is cleared, since the body is the visible box.
 *
 * A series' colour is a custom property on the container, `--color-<key>`, as upstream's; an
 * indicator reads the row's colour from `--color-bg` and `--color-border`, set on it.
 */
import { css, select } from "@kirana-style/core"

import { axes } from "../core/axes"
import {
  fontFamily,
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  shadow,
  space,
} from "../core/scales"
import { alpha, radius, surface, theme } from "../core/tokens"

const { nova, vega, lyra, maia, mira, luma, rhea, sera } = axes.style

export const chart = {
  // cn-chart and the component's own classes: `flex aspect-video justify-center text-xs`.
  container: css({
    display: "flex",
    aspectRatio: "16 / 9",
    justifyContent: "center",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    // The library's tooltip surface: `chart.tooltip` is the visible box.
    "--ts-chart-tooltip-background": "transparent",
    "--ts-chart-tooltip-border": "none",
    "--ts-chart-tooltip-shadow": "none",
    "--ts-chart-tooltip-padding": "0",
    // Until the chart mounts (`data-entering`, as the server renders it), its marks wait for the
    // entrance, which replays from the baseline: shown, they would flash at their final size
    // first. Only where scripts run and motion is allowed; otherwise the server's chart is the
    // chart.
    [select.descendant(".ts-chart__marks")]: {
      visibility: {
        "@media (scripting: enabled) and (prefers-reduced-motion: no-preference)":
          { "[data-entering]": "hidden" },
      },
    },
  }),
  // The chart itself fills the container. Its grid is the theme's half-strength border at full
  // opacity, as upstream's `stroke-border/50`: TanStack Charts paints a grid at 0.11 by default.
  plot: css({
    width: "100%",
    [select.descendant(".ts-chart__grid")]: { strokeOpacity: 1 },
  }),
  // With a legend, Recharts' wrapper: the plot over the legend (or under it, `verticalAlign="top"`).
  withLegend: css({ display: "flex", flexDirection: "column", width: "100%" }),
  // There, the plot takes the height the legend leaves, as Recharts' does inside `aspect-video`.
  plotWithLegend: css({ flex: "1 1 0%", minHeight: 0 }),

  // cn-chart-tooltip and the component's own classes (`grid min-w-32 items-start`): a bordered
  // card in the first five styles; Luma, Rhea and Sera ring a popover instead.
  tooltip: css({
    display: "grid",
    minWidth: space[32],
    alignItems: "start",
    gap: space["1.5"],
    paddingInline: space["2.5"],
    paddingBlock: space["1.5"],
    fontSize: fontSize.xs,
    lineHeight: { base: lineHeight.xs, [mira]: leading.relaxed },
    color: {
      [luma]: theme.popoverForeground,
      [rhea]: theme.popoverForeground,
      [sera]: theme.popoverForeground,
    },
    backgroundColor: {
      base: theme.background,
      [luma]: theme.popover,
      [rhea]: theme.popover,
      [sera]: theme.popover,
    },
    // Sera's tooltip has no corners of its own.
    borderRadius: {
      [nova]: radius.lg,
      [vega]: radius.lg,
      [lyra]: "0",
      [maia]: radius.lg,
      [mira]: radius.lg,
      [luma]: radius.xl,
      [rhea]: radius.xl,
    },
    borderWidth: {
      [nova]: "1px",
      [vega]: "1px",
      [lyra]: "1px",
      [maia]: "1px",
      [mira]: "1px",
    },
    borderStyle: "solid",
    // `border-border/50` where there is a border; the others keep the colour upstream's base layer
    // gives every element (`border-border`), which the reset does not.
    borderColor: {
      base: alpha.border50,
      [luma]: theme.border,
      [rhea]: theme.border,
      [sera]: theme.border,
    },
    boxShadow: {
      base: shadow.xl,
      [luma]: `0 0 0 1px ${surface.ringSoft}, ${shadow.lg}`,
      [rhea]: `0 0 0 1px ${surface.ringSoft}, ${shadow.lg}`,
      [sera]: `0 0 0 1px ${alpha.foreground10}, ${shadow.sm}`,
    },
  }),
  tooltipLabel: css({ fontWeight: fontWeight.medium }),
  tooltipRows: css({ display: "grid", gap: space["1.5"] }),
  // A row: its indicator, then its name and value.
  // `[&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground`: a series' icon in place of its
  // indicator.
  tooltipRow: css({
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    alignItems: "stretch",
    gap: space[2],
    [select.child("svg")]: {
      width: space["2.5"],
      height: space["2.5"],
      color: theme.mutedForeground,
    },
  }),
  tooltipRowDot: css({ alignItems: "center" }),
  tooltipBody: css({
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    lineHeight: "1",
  }),
  tooltipBodyNested: css({ alignItems: "flex-end" }),
  tooltipBodyFlat: css({ alignItems: "center" }),
  tooltipNames: css({ display: "grid", gap: space["1.5"] }),
  tooltipName: css({ color: theme.mutedForeground }),
  tooltipValue: css({
    fontFamily: fontFamily.mono,
    fontWeight: fontWeight.medium,
    color: theme.foreground,
    fontVariantNumeric: "tabular-nums",
  }),

  // The row's indicator, in the row's colour (`--color-bg`, `--color-border` on it).
  indicator: css({
    flexShrink: 0,
    borderRadius: "2px",
    // Each side, since a custom property cannot be split into a shorthand's longhands.
    borderTopColor: "var(--color-border)",
    borderRightColor: "var(--color-border)",
    borderBottomColor: "var(--color-border)",
    borderLeftColor: "var(--color-border)",
    backgroundColor: "var(--color-bg)",
  }),
  indicatorDot: css({ width: space["2.5"], height: space["2.5"] }),
  indicatorLine: css({ width: space[1] }),
  indicatorDashed: css({
    width: 0,
    borderWidth: "1.5px",
    borderStyle: "dashed",
    backgroundColor: "transparent",
  }),
  indicatorNested: css({ marginBlock: space["0.5"] }),

  legend: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: space[4],
  }),
  legendTop: css({ order: -1, paddingBottom: space[3] }),
  legendBottom: css({ paddingTop: space[3] }),
  // `[&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground`: a series' icon in place of its swatch.
  legendItem: css({
    display: "flex",
    alignItems: "center",
    gap: space["1.5"],
    [select.child("svg")]: {
      width: space[3],
      height: space[3],
      color: theme.mutedForeground,
    },
  }),
  legendSwatch: css({
    width: space[2],
    height: space[2],
    flexShrink: 0,
    borderRadius: "2px",
    backgroundColor: "var(--color-bg)",
  }),
}
