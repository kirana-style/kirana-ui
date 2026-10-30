/**
 * The registry's charts: each one's title, description (the chart file's own `description`) and
 * type, as upstream's charts are listed
 * (`registry/new-york-v4/charts/_registry.ts`, the site's `app/(app)/charts/charts.tsx`), and the
 * types the charts pages show, in upstream's order. The builder writes the registry's items from it
 * and the site's `/charts` pages read it: a chart ported into `bases/<base>/charts/<name>.tsx` is
 * added here once. Not an installed file.
 */
export type ChartType = {
  /** The page, `/charts/<slug>`. */
  slug: string
  /** The navigation's name, "Area Charts". */
  name: string
  /** The toolbar's name over each chart, "Area Chart". */
  label: string
}

/** Upstream's chart types (`components/charts-nav.tsx`), in its order. */
export const CHART_TYPES: readonly ChartType[] = [
  { slug: "area", name: "Area Charts", label: "Area Chart" },
  { slug: "bar", name: "Bar Charts", label: "Bar Chart" },
  { slug: "line", name: "Line Charts", label: "Line Chart" },
  { slug: "pie", name: "Pie Charts", label: "Pie Chart" },
  { slug: "radar", name: "Radar Charts", label: "Radar Chart" },
  { slug: "radial", name: "Radial Charts", label: "Radial Chart" },
  { slug: "tooltip", name: "Tooltips", label: "Tooltip" },
]

export type ChartItem = {
  name: string
  title: string
  description: string
  type: string
  /** Across the page's grid, as upstream's `fullWidth` charts are (the interactive ones). */
  fullWidth?: boolean
}

/** Every chart the registry has, in upstream's order within its type. */
export const CHARTS: readonly ChartItem[] = [
  {
    name: "chart-area-interactive",
    title: "Area Chart - Interactive",
    description: "An interactive area chart.",
    type: "area",
    fullWidth: true,
  },
  {
    name: "chart-area-default",
    title: "Area Chart",
    description: "A simple area chart.",
    type: "area",
  },
  {
    name: "chart-area-linear",
    title: "Area Chart - Linear",
    description: "A linear area chart.",
    type: "area",
  },
  {
    name: "chart-area-step",
    title: "Area Chart - Step",
    description: "A step area chart.",
    type: "area",
  },
  {
    name: "chart-area-legend",
    title: "Area Chart - Legend",
    description: "An area chart with a legend.",
    type: "area",
  },
  {
    name: "chart-area-stacked",
    title: "Area Chart - Stacked",
    description: "A stacked area chart.",
    type: "area",
  },
  {
    name: "chart-area-stacked-expand",
    title: "Area Chart - Stacked Expanded",
    description: "A stacked area chart with expand stacking.",
    type: "area",
  },
  {
    name: "chart-area-icons",
    title: "Area Chart - Icons",
    description: "An area chart with icons.",
    type: "area",
  },
  {
    name: "chart-area-gradient",
    title: "Area Chart - Gradient",
    description: "An area chart with gradient fill.",
    type: "area",
  },
  {
    name: "chart-area-axes",
    title: "Area Chart - Axes",
    description: "An area chart with axes.",
    type: "area",
  },
  {
    name: "chart-bar-interactive",
    title: "Bar Chart - Interactive",
    description: "An interactive bar chart.",
    type: "bar",
    fullWidth: true,
  },
  {
    name: "chart-bar-default",
    title: "Bar Chart",
    description: "A bar chart.",
    type: "bar",
  },
  {
    name: "chart-bar-horizontal",
    title: "Bar Chart - Horizontal",
    description: "A horizontal bar chart.",
    type: "bar",
  },
  {
    name: "chart-bar-multiple",
    title: "Bar Chart - Multiple",
    description: "A multiple bar chart.",
    type: "bar",
  },
  {
    name: "chart-bar-stacked",
    title: "Bar Chart - Stacked + Legend",
    description: "A stacked bar chart with a legend.",
    type: "bar",
  },
  {
    name: "chart-bar-label",
    title: "Bar Chart - Label",
    description: "A bar chart with a label.",
    type: "bar",
  },
  {
    name: "chart-bar-label-custom",
    title: "Bar Chart - Custom Label",
    description: "A bar chart with a custom label.",
    type: "bar",
  },
  {
    name: "chart-bar-mixed",
    title: "Bar Chart - Mixed",
    description: "A mixed bar chart.",
    type: "bar",
  },
  {
    name: "chart-bar-active",
    title: "Bar Chart - Active",
    description: "A bar chart with an active bar.",
    type: "bar",
  },
  {
    name: "chart-bar-negative",
    title: "Bar Chart - Negative",
    description: "A bar chart with negative values.",
    type: "bar",
  },
  {
    name: "chart-line-interactive",
    title: "Line Chart - Interactive",
    description: "An interactive line chart.",
    type: "line",
    fullWidth: true,
  },
  {
    name: "chart-line-default",
    title: "Line Chart",
    description: "A line chart.",
    type: "line",
  },
  {
    name: "chart-line-linear",
    title: "Line Chart - Linear",
    description: "A linear line chart.",
    type: "line",
  },
  {
    name: "chart-line-step",
    title: "Line Chart - Step",
    description: "A line chart with step.",
    type: "line",
  },
  {
    name: "chart-line-multiple",
    title: "Line Chart - Multiple",
    description: "A multiple line chart.",
    type: "line",
  },
  {
    name: "chart-line-dots",
    title: "Line Chart - Dots",
    description: "A line chart with dots.",
    type: "line",
  },
  {
    name: "chart-line-dots-custom",
    title: "Line Chart - Custom Dots",
    description: "A line chart with custom dots.",
    type: "line",
  },
  {
    name: "chart-line-dots-colors",
    title: "Line Chart - Dots Colors",
    description: "A line chart with dots and colors.",
    type: "line",
  },
  {
    name: "chart-line-label",
    title: "Line Chart - Label",
    description: "A line chart with a label.",
    type: "line",
  },
  {
    name: "chart-line-label-custom",
    title: "Line Chart - Custom Label",
    description: "A line chart with a custom label.",
    type: "line",
  },
  {
    name: "chart-pie-simple",
    title: "Pie Chart",
    description: "A simple pie chart.",
    type: "pie",
  },
  {
    name: "chart-radar-default",
    title: "Radar Chart",
    description: "A radar chart.",
    type: "radar",
  },
  {
    name: "chart-radial-simple",
    title: "Radial Chart",
    description: "A radial chart.",
    type: "radial",
  },
  {
    name: "chart-tooltip-default",
    title: "Tooltip - Default",
    description: "A stacked bar chart with a legend.",
    type: "tooltip",
  },
]

export function chartInfo(name: string): ChartItem {
  const chart = CHARTS.find((entry) => entry.name === name)
  if (!chart) throw new Error(`registry/charts.ts: no chart ${name}`)
  return chart
}
