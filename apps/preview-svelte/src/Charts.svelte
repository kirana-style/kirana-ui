<script lang="ts">
  /**
   * `/create`'s charts preview on Svelte (`/preview/svelte/ark/charts`), React's `charts-base.tsx` and
   * `charts-canvas.tsx`: the registry's charts on one canvas, a column per type in the charts pages'
   * order, so a design's chart colours, radius and type show on every chart at once. The interactive
   * charts, which span the charts pages' grid, are left out, as React's leaves them. Site code, not
   * an item.
   */
  import { css, select } from "@kirana-style/core"
  import { previews } from "@workspace/registry/bases/svelte-ark/previews.ts"
  import { axes } from "@workspace/registry/core/axes.ts"
  import {
    breakpoint,
    fontSize,
    fontWeight,
    lineHeight,
    space,
    spacing,
  } from "@workspace/registry/core/scales.ts"
  import { theme } from "@workspace/registry/core/tokens.ts"

  const styles = {
    // `preview-02`'s ground and its gap, `md:` wider, Lyra's and Mira's tighter.
    ground: css({
      overflowX: "auto",
      overflowY: "hidden",
      minHeight: "100vh",
      backgroundColor: `light-dark(${theme.muted}, ${theme.background})`,
      contain: "paint",
      "--gap": {
        base: spacing(4),
        [breakpoint.md]: spacing(10),
        [axes.style.lyra]: { [breakpoint.md]: spacing(6) },
        [axes.style.mira]: { [breakpoint.md]: spacing(6) },
      },
    }),
    center: css({
      display: "flex",
      width: "100%",
      minWidth: "max-content",
      justifyContent: "center",
    }),
    canvas: css({
      display: "block",
      width: { base: "2400px", [breakpoint.md]: "3000px" },
      columnCount: 7,
      columnFill: "balance",
      columnGap: "var(--gap)",
      // Longhands: Kirana cannot tell a variable is one value, so a shorthand stays whole.
      paddingBlockStart: "var(--gap)",
      paddingBlockEnd: "var(--gap)",
      paddingInlineStart: "var(--gap)",
      paddingInlineEnd: "var(--gap)",
    }),
    // A type's charts flow on through the columns: the section itself draws no box.
    column: css({
      display: "contents",
      [select.descendant('[data-slot="card"]')]: {
        width: "100%",
        breakInside: "avoid",
        marginBlockEnd: "var(--gap)",
      },
    }),
    heading: css({
      breakAfter: "avoid",
      marginBlockEnd: space[3],
      paddingInline: space[1],
      fontSize: fontSize.sm,
      lineHeight: lineHeight.sm,
      fontWeight: fontWeight.medium,
      color: theme.mutedForeground,
    }),
  }

  const TYPES = [
    {
      label: "Area Charts",
      charts: [
        "chart-area-default",
        "chart-area-linear",
        "chart-area-step",
        "chart-area-legend",
        "chart-area-stacked",
        "chart-area-stacked-expand",
        "chart-area-icons",
        "chart-area-gradient",
        "chart-area-axes",
      ],
    },
    {
      label: "Bar Charts",
      charts: [
        "chart-bar-default",
        "chart-bar-horizontal",
        "chart-bar-multiple",
        "chart-bar-stacked",
        "chart-bar-label",
        "chart-bar-label-custom",
        "chart-bar-mixed",
        "chart-bar-active",
        "chart-bar-negative",
      ],
    },
    {
      label: "Line Charts",
      charts: [
        "chart-line-default",
        "chart-line-linear",
        "chart-line-step",
        "chart-line-multiple",
        "chart-line-dots",
        "chart-line-dots-custom",
        "chart-line-dots-colors",
        "chart-line-label",
        "chart-line-label-custom",
      ],
    },
    {
      label: "Pie Charts",
      charts: [
        "chart-pie-simple",
        "chart-pie-separator-none",
        "chart-pie-label",
        "chart-pie-label-custom",
        "chart-pie-label-list",
        "chart-pie-legend",
        "chart-pie-donut",
        "chart-pie-donut-active",
        "chart-pie-donut-text",
        "chart-pie-stacked",
        "chart-pie-interactive",
      ],
    },
    {
      label: "Radar Charts",
      charts: [
        "chart-radar-default",
        "chart-radar-dots",
        "chart-radar-lines-only",
        "chart-radar-label-custom",
        "chart-radar-grid-custom",
        "chart-radar-grid-none",
        "chart-radar-grid-circle",
        "chart-radar-grid-circle-no-lines",
        "chart-radar-grid-circle-fill",
        "chart-radar-grid-fill",
        "chart-radar-multiple",
        "chart-radar-legend",
        "chart-radar-icons",
        "chart-radar-radius",
      ],
    },
    {
      label: "Radial Charts",
      charts: [
        "chart-radial-simple",
        "chart-radial-label",
        "chart-radial-grid",
        "chart-radial-text",
        "chart-radial-shape",
        "chart-radial-stacked",
      ],
    },
    {
      label: "Tooltips",
      charts: [
        "chart-tooltip-default",
        "chart-tooltip-indicator-line",
        "chart-tooltip-indicator-none",
        "chart-tooltip-label-custom",
        "chart-tooltip-label-formatter",
        "chart-tooltip-label-none",
        "chart-tooltip-formatter",
        "chart-tooltip-icons",
        "chart-tooltip-advanced",
      ],
    },
  ]

  const types = TYPES.map(({ label, charts }) => ({
    label,
    charts: charts.map((name) => ({
      name,
      load: previews[name]!,
    })),
  }))
</script>

<div sx={styles.ground}>
  <div sx={styles.center}>
    <main sx={styles.canvas} data-slot="capture-target">
      {#each types as type (type.label)}
        <section sx={styles.column} aria-label={type.label}>
          <h2 sx={styles.heading}>
            {type.label}
          </h2>
          {#each type.charts as chart (chart.name)}
            {#await chart.load() then module}<module.default />{/await}
          {/each}
        </section>
      {/each}
    </main>
  </div>
</div>
