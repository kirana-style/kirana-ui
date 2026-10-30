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
    name: "chart-pie-separator-none",
    title: "Pie Chart - Separator None",
    description: "A pie chart with no separator.",
    type: "pie",
  },
  {
    name: "chart-pie-label",
    title: "Pie Chart - Label",
    description: "A pie chart with a label.",
    type: "pie",
  },
  {
    name: "chart-pie-label-custom",
    title: "Pie Chart - Custom Label",
    description: "A pie chart with a custom label.",
    type: "pie",
  },
  {
    name: "chart-pie-label-list",
    title: "Pie Chart - Label List",
    description: "A pie chart with a label list.",
    type: "pie",
  },
  {
    name: "chart-pie-legend",
    title: "Pie Chart - Legend",
    description: "A pie chart with a legend.",
    type: "pie",
  },
  {
    name: "chart-pie-donut",
    title: "Pie Chart - Donut",
    description: "A donut chart.",
    type: "pie",
  },
  {
    name: "chart-pie-donut-active",
    title: "Pie Chart - Donut Active",
    description: "A donut chart with an active sector.",
    type: "pie",
  },
  {
    name: "chart-pie-donut-text",
    title: "Pie Chart - Donut with Text",
    description: "A donut chart with text.",
    type: "pie",
  },
  {
    name: "chart-pie-stacked",
    title: "Pie Chart - Stacked",
    description: "A pie chart with stacked sections.",
    type: "pie",
  },
  {
    name: "chart-pie-interactive",
    title: "Pie Chart - Interactive",
    description: "An interactive pie chart.",
    type: "pie",
  },
  {
    name: "chart-radar-default",
    title: "Radar Chart",
    description: "A radar chart.",
    type: "radar",
  },
  {
    name: "chart-radar-dots",
    title: "Radar Chart - Dots",
    description: "A radar chart with dots.",
    type: "radar",
  },
  {
    name: "chart-radar-lines-only",
    title: "Radar Chart - Lines Only",
    description: "A radar chart with lines only.",
    type: "radar",
  },
  {
    name: "chart-radar-label-custom",
    title: "Radar Chart - Custom Label",
    description: "A radar chart with a custom label.",
    type: "radar",
  },
  {
    name: "chart-radar-grid-custom",
    title: "Radar Chart - Grid Custom",
    description: "A radar chart with a grid and circle fill.",
    type: "radar",
  },
  {
    name: "chart-radar-grid-none",
    title: "Radar Chart - Grid None",
    description: "A radar chart with no grid.",
    type: "radar",
  },
  {
    name: "chart-radar-grid-circle",
    title: "Radar Chart - Grid Circle",
    description: "A radar chart with a grid and circle.",
    type: "radar",
  },
  {
    name: "chart-radar-grid-circle-no-lines",
    title: "Radar Chart - Grid Circle - No lines",
    description: "A radar chart with a grid and circle fill.",
    type: "radar",
  },
  {
    name: "chart-radar-grid-circle-fill",
    title: "Radar Chart - Grid Circle Filled",
    description: "A radar chart with a grid and circle fill.",
    type: "radar",
  },
  {
    name: "chart-radar-grid-fill",
    title: "Radar Chart - Grid Filled",
    description: "A radar chart with a grid filled.",
    type: "radar",
  },
  {
    name: "chart-radar-multiple",
    title: "Radar Chart - Multiple",
    description: "A radar chart with multiple data.",
    type: "radar",
  },
  {
    name: "chart-radar-legend",
    title: "Radar Chart - Legend",
    description: "A radar chart with a legend.",
    type: "radar",
  },
  {
    name: "chart-radar-icons",
    title: "Radar Chart - Icons",
    description: "A radar chart with icons.",
    type: "radar",
  },
  {
    name: "chart-radar-radius",
    title: "Radar Chart - Radius Axis",
    description: "A radar chart with a radius axis.",
    type: "radar",
  },
  {
    name: "chart-radial-simple",
    title: "Radial Chart",
    description: "A radial chart.",
    type: "radial",
  },
  {
    name: "chart-radial-label",
    title: "Radial Chart - Label",
    description: "A radial chart with a label.",
    type: "radial",
  },
  {
    name: "chart-radial-grid",
    title: "Radial Chart - Grid",
    description: "A radial chart with a grid.",
    type: "radial",
  },
  {
    name: "chart-radial-text",
    title: "Radial Chart - Text",
    description: "A radial chart with text.",
    type: "radial",
  },
  {
    name: "chart-radial-shape",
    title: "Radial Chart - Shape",
    description: "A radial chart with a custom shape.",
    type: "radial",
  },
  {
    name: "chart-radial-stacked",
    title: "Radial Chart - Stacked",
    description: "A radial chart with stacked sections.",
    type: "radial",
  },
  {
    name: "chart-tooltip-default",
    title: "Tooltip - Default",
    description: "A stacked bar chart with a legend.",
    type: "tooltip",
  },
  {
    name: "chart-tooltip-indicator-line",
    title: "Tooltip - Line Indicator",
    description: "A stacked bar chart with a legend.",
    type: "tooltip",
  },
  {
    name: "chart-tooltip-indicator-none",
    title: "Tooltip - No Indicator",
    description: "A stacked bar chart with a legend.",
    type: "tooltip",
  },
  {
    name: "chart-tooltip-label-custom",
    title: "Tooltip - Custom label",
    description: "A stacked bar chart with a legend.",
    type: "tooltip",
  },
  {
    name: "chart-tooltip-label-formatter",
    title: "Tooltip - Label Formatter",
    description: "A stacked bar chart with a legend.",
    type: "tooltip",
  },
  {
    name: "chart-tooltip-label-none",
    title: "Tooltip - No Label",
    description: "A stacked bar chart with a legend.",
    type: "tooltip",
  },
  {
    name: "chart-tooltip-formatter",
    title: "Tooltip - Formatter",
    description: "A stacked bar chart with a legend.",
    type: "tooltip",
  },
  {
    name: "chart-tooltip-icons",
    title: "Tooltip - Icons",
    description: "A stacked bar chart with a legend.",
    type: "tooltip",
  },
  {
    name: "chart-tooltip-advanced",
    title: "Tooltip - Advanced",
    description: "A stacked bar chart with a legend.",
    type: "tooltip",
  },
]

export function chartInfo(name: string): ChartItem {
  const chart = CHARTS.find((entry) => entry.name === name)
  if (!chart) throw new Error(`registry/charts.ts: no chart ${name}`)
  return chart
}
