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
    name: "chart-area-default",
    title: "Area Chart",
    description: "A simple area chart.",
    type: "area",
  },
  {
    name: "chart-bar-default",
    title: "Bar Chart",
    description: "A bar chart.",
    type: "bar",
  },
  {
    name: "chart-line-default",
    title: "Line Chart",
    description: "A line chart.",
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
