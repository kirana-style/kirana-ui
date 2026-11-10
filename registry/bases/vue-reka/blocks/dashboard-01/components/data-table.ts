/**
 * What the data table's parts share: its styles, the rows' schema, the table's features and the
 * viewer's chart (React's keeps them in `data-table.tsx` beside its components).
 */
import { areaY, defineChart, dot, lineY, whenFocused } from "@tanstack/charts"
import { d3Curve } from "@tanstack/charts/d3/shape"
import { decorative } from "@tanstack/charts/mark/decorative"
import { scaleLinear } from "@tanstack/charts/scales/linear"
import { scalePoint } from "@tanstack/charts/scales/point"
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
} from "@tanstack/vue-table"
import { curveNatural } from "d3-shape"
import { z } from "zod"

import type { ChartConfig } from "../../../ui/chart"
import {
  chartTheme,
  chartTooltip,
  hiddenAxis,
  niceTicks,
} from "../../../ui/chart"
import { inEveryStyle } from "../../../../../core/axes"
import { css, select } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import {
  breakpoint,
  color,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../../core/scales"

export const styles = {
  dragHandleButton: css({
    width: { "*": null, base: space[7] },
    height: { "*": null, base: space[7] },
    color: theme.mutedForeground,
    backgroundColor: { ":hover": "transparent" },
  }),
  dragHandleIconPlaceholder: css({
    width: space[3],
    height: space[3],
    color: theme.mutedForeground,
  }),
  dragHandleSpan: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
  div: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  div2: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  div3: css({
    width: space[32],
  }),
  badge: css({
    paddingInline: { "*": null, base: space["1.5"] },
    color: theme.mutedForeground,
  }),
  badge2: css({
    paddingInline: { "*": null, base: space["1.5"] },
    color: theme.mutedForeground,
  }),
  iconPlaceholder: css({
    fill: `light-dark(${color.green[500]}, ${color.green[400]})`,
  }),
  div4: css({
    width: "100%",
    textAlign: "right",
  }),
  label: css({
    borderWidth: { "*": null, base: "0" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    clipPath: { "*": null, base: "inset(50%)" },
    height: { "*": null, base: "1px" },
    margin: { "*": null, base: "-1px" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: "0" },
    position: { "*": null, base: "absolute" },
    whiteSpace: { "*": null, base: "nowrap" },
    width: { "*": null, base: "1px" },
  }),
  input: css({
    height: { "*": null, base: space[8] },
    width: { "*": null, base: space[16] },
    // `border-transparent bg-transparent shadow-none` and their states, over Input's own in every
    // style (Sera's underline, Vega's shadow, the others' fills).
    borderColor: inEveryStyle({ base: "transparent" }),
    borderBottomColor: inEveryStyle({ base: "transparent" }),
    backgroundColor: inEveryStyle({
      base: "transparent",
      ":hover": `color-mix(in oklab, ${theme.input} 30%, transparent)`,
      ":focus-visible": `light-dark(${theme.background}, color-mix(in oklab, ${theme.input} 30%, transparent))`,
    }),
    textAlign: { "*": null, base: "right" },
    boxShadow: inEveryStyle({ base: "none" }),
    borderStyle: { ":focus-visible": "solid" },
    borderWidth: { ":focus-visible": "1px" },
  }),
  div5: css({
    width: "100%",
    textAlign: "right",
  }),
  label2: css({
    borderWidth: { "*": null, base: "0" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    clipPath: { "*": null, base: "inset(50%)" },
    height: { "*": null, base: "1px" },
    margin: { "*": null, base: "-1px" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: "0" },
    position: { "*": null, base: "absolute" },
    whiteSpace: { "*": null, base: "nowrap" },
    width: { "*": null, base: "1px" },
  }),
  input2: css({
    height: { "*": null, base: space[8] },
    width: { "*": null, base: space[16] },
    // `border-transparent bg-transparent shadow-none` and their states, over Input's own in every
    // style (Sera's underline, Vega's shadow, the others' fills).
    borderColor: inEveryStyle({ base: "transparent" }),
    borderBottomColor: inEveryStyle({ base: "transparent" }),
    backgroundColor: inEveryStyle({
      base: "transparent",
      ":hover": `color-mix(in oklab, ${theme.input} 30%, transparent)`,
      ":focus-visible": `light-dark(${theme.background}, color-mix(in oklab, ${theme.input} 30%, transparent))`,
    }),
    textAlign: { "*": null, base: "right" },
    boxShadow: inEveryStyle({ base: "none" }),
    borderStyle: { ":focus-visible": "solid" },
    borderWidth: { ":focus-visible": "1px" },
  }),
  label3: css({
    borderWidth: { "*": null, base: "0" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    clipPath: { "*": null, base: "inset(50%)" },
    height: { "*": null, base: "1px" },
    margin: { "*": null, base: "-1px" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: "0" },
    position: { "*": null, base: "absolute" },
    whiteSpace: { "*": null, base: "nowrap" },
    width: { "*": null, base: "1px" },
  }),
  selectTrigger: css({
    width: { "*": null, base: "9.5rem" },
  }),
  // `**:data-[slot=select-value]:block truncate` on the trigger, written on the value, where it
  // wins over SelectValue's own `flex`.
  selectValue: css({
    display: { "*": null, base: "block" },
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
  button: css({
    display: { "*": null, base: "flex" },
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
    color: theme.mutedForeground,
    backgroundColor: { "[data-open]": theme.muted },
  }),
  span: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
  dropdownMenuContent: css({
    width: { "*": null, base: space[32] },
  }),
  draggableRowTableRow: css({
    position: { "*": null, base: "relative" },
    zIndex: { "*": null, base: "0", '[data-dragging="true"]': "10" },
    opacity: { '[data-dragging="true"]': "80%" },
  }),
  dataTableTabs: css({
    width: { "*": null, base: "100%" },
    flexDirection: { "*": null, base: "column" },
    justifyContent: { "*": null, base: "flex-start" },
    gap: { "*": null, base: space[6] },
  }),
  dataTableDiv: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: { base: space[4], [breakpoint.lg]: space[6] },
  }),
  dataTableLabel: css({
    borderWidth: { "*": null, base: "0" },
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
    clipPath: { "*": null, base: "inset(50%)" },
    height: { "*": null, base: "1px" },
    margin: { "*": null, base: "-1px" },
    overflow: { "*": null, base: "hidden" },
    padding: { "*": null, base: "0" },
    position: { "*": null, base: "absolute" },
    whiteSpace: { "*": null, base: "nowrap" },
    width: { "*": null, base: "1px" },
  }),
  dataTableSelectTrigger: css({
    display: {
      "*": null,
      base: "flex",
      "@container main (width >= 56rem)": "none",
    },
    width: { "*": null, base: "fit-content" },
  }),
  tabsList: css({
    display: {
      "*": null,
      base: "none",
      "@container main (width >= 56rem)": "flex",
    },
  }),
  // Upstream's `**:data-[slot=badge]:…` on the list, which would rank below the badge's own here.
  tabBadge: css({
    width: { "*": null, base: space[5] },
    height: { "*": null, base: space[5] },
    borderRadius: { "*": null, base: radius.full },
    backgroundColor: {
      "*": null,
      base: `color-mix(in oklab, ${theme.mutedForeground} 30%, transparent)`,
    },
    paddingInline: { "*": null, base: space[1] },
  }),
  dataTableDiv2: css({
    display: "flex",
    alignItems: "center",
    gap: space[2],
  }),
  // The column menu: `w-32`, as upstream's bases write it.
  dataTableDropdownMenuContent: css({
    width: { "*": null, base: space[32] },
  }),
  dropdownMenuCheckboxItem: css({
    textTransform: { "*": null, base: "capitalize" },
  }),
  dataTableSpan: css({
    display: { base: "none", [breakpoint.lg]: "inline" },
  }),
  tabsContent: css({
    position: { "*": null, base: "relative" },
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[4] },
    overflow: { "*": null, base: "auto" },
    paddingInline: { "*": null, base: space[4], [breakpoint.lg]: space[6] },
  }),
  dataTableDiv3: css({
    overflow: "hidden",
    borderRadius: radius.lg,
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
  }),
  tableHeader: css({
    position: { "*": null, base: "sticky" },
    top: { "*": null, base: space["0"] },
    zIndex: { "*": null, base: "10" },
    backgroundColor: theme.muted,
  }),
  tableBody: css({
    [select.descendant('[data-slot="table-cell"]:first-child')]: {
      width: space[8],
    },
  }),
  tableCell: css({
    height: { "*": null, base: space[24] },
    textAlign: { "*": null, base: "center" },
  }),
  dataTableDiv4: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingInline: space[4],
  }),
  dataTableDiv5: css({
    display: { base: "none", [breakpoint.lg]: "flex" },
    flex: "1 1 0%",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  div6: css({
    display: "flex",
    width: { base: "100%", [breakpoint.lg]: "fit-content" },
    alignItems: "center",
    gap: space[8],
  }),
  div7: css({
    display: { base: "none", [breakpoint.lg]: "flex" },
    alignItems: "center",
    gap: space[2],
  }),
  dataTableLabel2: css({
    fontSize: { "*": null, base: fontSize.sm },
    fontWeight: { "*": null, base: fontWeight.medium },
  }),
  selectTrigger2: css({
    width: { "*": null, base: space[20] },
  }),
  div8: css({
    display: "flex",
    width: "fit-content",
    alignItems: "center",
    justifyContent: "center",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
  }),
  div9: css({
    marginLeft: { base: "auto", [breakpoint.lg]: space["0"] },
    display: "flex",
    alignItems: "center",
    gap: space[2],
  }),
  dataTableButton: css({
    display: { "*": null, base: "none", [breakpoint.lg]: "flex" },
    height: { "*": null, base: space[8] },
    width: { "*": null, base: space[8] },
    padding: { "*": null, base: space["0"] },
  }),
  span2: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
  button2: css({
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
  }),
  span3: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
  button3: css({
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
  }),
  span4: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
  button4: css({
    display: { "*": null, base: "none", [breakpoint.lg]: "flex" },
    width: { "*": null, base: space[8] },
    height: { "*": null, base: space[8] },
  }),
  span5: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
  tabsContent2: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    paddingInline: { "*": null, base: space[4], [breakpoint.lg]: space[6] },
  }),
  div10: css({
    aspectRatio: "16 / 9",
    width: "100%",
    flex: "1 1 0%",
    borderRadius: radius.lg,
    borderStyle: "dashed",
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
  }),
  tabsContent3: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    paddingInline: { "*": null, base: space[4], [breakpoint.lg]: space[6] },
  }),
  div11: css({
    aspectRatio: "16 / 9",
    width: "100%",
    flex: "1 1 0%",
    borderRadius: radius.lg,
    borderStyle: "dashed",
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
  }),
  tabsContent4: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    paddingInline: { "*": null, base: space[4], [breakpoint.lg]: space[6] },
  }),
  div12: css({
    aspectRatio: "16 / 9",
    width: "100%",
    flex: "1 1 0%",
    borderRadius: radius.lg,
    borderStyle: "dashed",
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
  }),
  tableCellViewerButton: css({
    width: { "*": null, base: "fit-content" },
    paddingInline: { "*": null, base: space["0"] },
    textAlign: { "*": null, base: "left" },
    color: theme.foreground,
  }),
  tableCellViewerDrawerHeader: css({
    gap: { "*": null, base: space[1] },
  }),
  tableCellViewerDiv: css({
    display: "flex",
    flexDirection: "column",
    gap: space[4],
    overflowY: "auto",
    paddingInline: space[4],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  tableCellViewerDiv2: css({
    display: "grid",
    gap: space[2],
  }),
  tableCellViewerDiv3: css({
    display: "flex",
    gap: space[2],
    lineHeight: "1",
    fontWeight: fontWeight.medium,
  }),
  tableCellViewerIconPlaceholder: css({
    width: space[4],
    height: space[4],
  }),
  tableCellViewerDiv4: css({
    color: theme.mutedForeground,
  }),
  tableCellViewerForm: css({
    display: "flex",
    flexDirection: "column",
    gap: space[4],
  }),
  tableCellViewerDiv5: css({
    display: "flex",
    flexDirection: "column",
    gap: space[3],
  }),
  tableCellViewerDiv6: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: space[4],
  }),
  tableCellViewerDiv7: css({
    display: "flex",
    flexDirection: "column",
    gap: space[3],
  }),
  tableCellViewerSelectTrigger: css({
    width: { "*": null, base: "100%" },
  }),
  tableCellViewerDiv8: css({
    display: "flex",
    flexDirection: "column",
    gap: space[3],
  }),
  tableCellViewerSelectTrigger2: css({
    width: { "*": null, base: "100%" },
  }),
  tableCellViewerDiv9: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: space[4],
  }),
  tableCellViewerDiv10: css({
    display: "flex",
    flexDirection: "column",
    gap: space[3],
  }),
  tableCellViewerDiv11: css({
    display: "flex",
    flexDirection: "column",
    gap: space[3],
  }),
  tableCellViewerDiv12: css({
    display: "flex",
    flexDirection: "column",
    gap: space[3],
  }),
  tableCellViewerSelectTrigger3: css({
    width: { "*": null, base: "100%" },
  }),
}

// New in v9: declare the features this table uses — anything you don't
// register is tree-shaken out of the bundle.
export const features = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
})

export const columnHelper = createColumnHelper<
  typeof features,
  z.infer<typeof schema>
>()

export const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
})

export type Item = z.infer<typeof schema>

export const chartData = [
  {
    month: "January",
    desktop: 186,
    mobile: 80,
  },
  {
    month: "February",
    desktop: 305,
    mobile: 200,
  },
  {
    month: "March",
    desktop: 237,
    mobile: 120,
  },
  {
    month: "April",
    desktop: 73,
    mobile: 190,
  },
  {
    month: "May",
    desktop: 209,
    mobile: 130,
  },
  {
    month: "June",
    desktop: 214,
    mobile: 140,
  },
]
export const chartConfig = {
  desktop: {
    label: "Desktop",
    color: theme.primary,
  },
  mobile: {
    label: "Mobile",
    color: theme.primary,
  },
} satisfies ChartConfig
const SERIES = ["mobile", "desktop"] as const

/** Each area's fill: its colour at Recharts' `fillOpacity`. */
const FILL = {
  mobile: "color-mix(in oklab, var(--color-mobile) 60%, transparent)",
  desktop: "color-mix(in oklab, var(--color-desktop) 40%, transparent)",
}

const layers = chartData.flatMap((row) => {
  let base = 0
  return SERIES.map((series) => {
    const y1 = base
    base += row[series]
    return { month: row.month, series, value: row[series], y1, y2: base }
  })
})

const curve = d3Curve(curveNatural)
const y = niceTicks(layers.map((layer) => layer.y2))

/**
 * The drawer's chart, on TanStack Charts (upstream's is Recharts): the six months' visitors
 * stacked, each layer filled and edged in its colour, the month axis hidden, the registry's
 * `chart-area-stacked` otherwise.
 */
export const chart = defineChart(
  {
    marks: [
      areaY(layers, {
        id: "visitors",
        x: "month",
        y: "value",
        y1: "y1",
        y2: "y2",
        z: "series",
        curve,
        fill: (layer) => FILL[layer.series],
        fillOpacity: 1,
      }),
      // Each layer's top edge, Recharts' area stroke; the tooltip reads the areas.
      decorative(
        lineY(layers, {
          x: "month",
          y: "y2",
          z: "series",
          curve,
          stroke: (layer) => `var(--color-${layer.series})`,
          strokeWidth: 1,
        })
      ),
      // Recharts' active dot on each layer at the focused month.
      whenFocused(
        dot(layers, {
          x: "month",
          y: "y2",
          r: 4,
          color: "series",
          stroke: theme.background,
          strokeWidth: 2,
        }),
        { match: "x" }
      ),
    ],
    scales: {
      x: { scale: () => scalePoint<string>(), axis: false },
      y: {
        scale: scaleLinear().domain(y.domain),
        grid: true,
        axis: hiddenAxis(y.ticks),
      },
    },
    margin: { left: 0, right: 10 },
    color: {
      domain: SERIES,
      range: SERIES.map((series) => `var(--color-${series})`),
    },
    theme: chartTheme,
  },
  {
    focus: "group-x",
    // Recharts lists the series in the order it draws them, bottom layer first.
    tooltip: {
      ...chartTooltip,
      sort: (left, right) =>
        SERIES.indexOf(left.datum.series) - SERIES.indexOf(right.datum.series),
    },
  }
)
