---
title: Chart
description: Beautiful charts. Built using TanStack Charts. Copy and paste into your apps.
section: components
variants: [react/base, react/aria]
keywords: [chart, tanstack charts, recharts, component, base, aria]
---

# Chart

<!-- ::preview item="chart-demo" height="440" combinations="react/base,react/aria" -->

Introducing **Charts**. A collection of chart components that you can copy and paste into your apps.

Charts are designed to look great out of the box. They work well with the other components and are fully customizable to fit your project.

[Browse the Charts Library](/charts).

## Component

We use [TanStack Charts](https://tanstack.com/charts) under the hood, where shadcn/ui's charts use Recharts.

We designed the `chart` component with composition in mind. **You describe your chart with TanStack Charts' `defineChart` and its marks, and only bring in the custom parts, such as `ChartTooltipContent`, when and where you need them**.

```tsx showLineNumbers
import { barY, defineChart } from "@tanstack/charts"

import {
  ChartContainer,
  ChartTooltipContent,
  chartTheme,
  chartTooltip,
} from "@/components/ui/chart"

const chart = defineChart(
  {
    marks: [barY(data, { x: "month", y: "value" })],
    theme: chartTheme,
  },
  { tooltip: chartTooltip }
)

export function MyChart() {
  return (
    <ChartContainer
      config={chartConfig}
      definition={chart}
      ariaLabel="Visitors by month"
      tooltip={<ChartTooltipContent />}
    />
  )
}
```

We do not wrap TanStack Charts. A definition is TanStack Charts' own, so you are not locked into an abstraction: its documentation covers every mark, scale and interaction, and when a new version is released you can follow its upgrade path.

**The components are yours**.

## Coming from Recharts

If you are porting a shadcn/ui chart written with Recharts, as every chart in [the library](/charts) was:

- A chart is a definition, not JSX children. Each `<Bar>`, `<Area>` or `<Line>` is a mark (`barY`, `areaY`, `lineY`), and `<XAxis>`, `<YAxis>` and `<CartesianGrid>` are the `x` and `y` scales' `axis` and `grid`. Make the definition once, outside the component; when state changes it, as an interactive chart's series does, make it again in `useMemo`.
- A series still paints itself `var(--color-KEY)`. Its config names the design's token, `theme.chart1`, where shadcn/ui writes `var(--chart-1)`.
- Recharts rounds a value axis by itself. `niceTicks` rounds it the same way, and `hiddenAxis` puts the grid on those ticks without drawing the axis, as upstream's hidden `YAxis` does, so the grid falls where upstream's does.
- Recharts draws the tooltip's cursor. Here it is a mark shown on focus: `whenFocused(bandX(data, { x: "month", fill: theme.muted }), { match: "x" })` behind bars, a `ruleX` over lines.
- `ChartTooltip` is gone: give the definition `{ tooltip: chartTooltip }` and the container `tooltip={<ChartTooltipContent />}`. `focus: "group-x"` lists every series at the focused category, as Recharts' tooltip does.
- `ChartLegend` is gone too: give the container `legend={<ChartLegendContent />}`, and the chart takes what the legend leaves of its box.
- Pie, radar and radial charts come from `@tanstack/charts/polar`. Its angles start at 12 o'clock and turn clockwise, where Recharts' start at 3 o'clock and turn anticlockwise: Recharts' 0° is `Math.PI / 2`, and a full turn from it ends at `Math.PI / 2 - Math.PI * 2`. Recharts takes a 5px margin off before its 80% radius (`inset: 5, radiusRatio: 0.8`), and lays a radial chart's bars out in bands (`radialBands`).
- Labels, the text in a donut and anything else the tooltip should not reach go inside `decorative(...)`, from `@tanstack/charts/mark/decorative`.
- Recharts' `defaultIndex`, a tooltip open before any pointer, has no counterpart: the tooltip opens on hover and on keyboard focus.

## Installation

<!-- ::installation name="chart" combinations="react/base,react/aria" -->

The chart colours are the design's tokens, `theme.chart1` to `theme.chart5`, which the chart colours axis sets ([Colours and theming](/docs/design-system/theming)): there is nothing to add to your CSS.

## Your First Chart

Let's build your first chart. We'll build a bar chart, add a grid, axis, tooltip and legend.

<!-- ::start:steps -->

### Start by defining your data

The following data represents the number of desktop and mobile users for each month.

> [!NOTE]
> Your data can be in any shape. You are not limited to the shape of the data below. Name a mark's channels after your data's fields (`x: "month"`), or give them a function.

```tsx showLineNumbers title="components/example-chart.tsx"
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]
```

### Define your chart config

The chart config holds configuration for the chart. This is where you place human-readable strings, such as labels, icons and color tokens for theming.

```tsx showLineNumbers title="components/example-chart.tsx"
import { type ChartConfig } from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig
```

### Build your chart

You can now build your chart with TanStack Charts' marks: a row per bar, and `group` to put a month's bars side by side, each in its series' colour.

> [!WARNING] Important
> The container keeps its box's shape, 16 / 9 unless you give it an `aspectRatio` or a `height`, and `initialWidth` is the width a server draws the chart at, before the browser measures its box.

<!-- ::preview item="chart-example-bar" height="400" combinations="react/base,react/aria" -->

<!-- ::end:steps -->

### Add a Grid

Let's add a grid to the chart.

<!-- ::start:steps -->

### Round the value axis as Recharts does, and import `hiddenAxis`.

```tsx
import { hiddenAxis, niceTicks } from "@/components/ui/chart"

const y = niceTicks(rows.map((row) => row.value))
```

### Give the `y` scale its grid, on those ticks.

```tsx showLineNumbers {6-10}
scales: {
  x: {
    scale: () => scaleBand<string>().paddingInner(0.2).paddingOuter(0.1),
    axis: false,
  },
  y: {
    scale: scaleLinear().domain(y.domain),
    grid: true,
    axis: hiddenAxis(y.ticks),
  },
},
```

<!-- ::preview item="chart-example-grid" height="400" combinations="react/base,react/aria" -->

<!-- ::end:steps -->

### Add an Axis

To add an x-axis to the chart, we'll give the `x` scale its `axis`.

<!-- ::start:steps -->

### Draw its labels and nothing else: no line, no ticks, each month's first three letters.

```tsx showLineNumbers {3-11}
x: {
  scale: () => scaleBand<string>().paddingInner(0.2).paddingOuter(0.1),
  axis: {
    line: false,
    ticks: {
      size: 0,
      padding: 10,
      format: (month: string) => month.slice(0, 3),
    },
    tickLabels: { fontSize: 12 },
  },
},
```

<!-- ::preview item="chart-example-axis" height="400" combinations="react/base,react/aria" -->

<!-- ::end:steps -->

### Add Tooltip

So far we've only used TanStack Charts. They look great out of the box thanks to `chartTheme`, the design's colours for the chart's text, grid and series.

To add a tooltip, we'll use `chartTooltip` and the custom `ChartTooltipContent` component from `chart`.

<!-- ::start:steps -->

### Import `chartTooltip` and `ChartTooltipContent`.

```tsx
import { ChartTooltipContent, chartTooltip } from "@/components/ui/chart"
```

### Give the definition the tooltip, and the container its content.

```tsx showLineNumbers {3,10}
const chart = defineChart(
  { marks, scales, color, theme: chartTheme },
  { focus: "group-x", tooltip: chartTooltip }
)

<ChartContainer
  config={chartConfig}
  definition={chart}
  ariaLabel="Desktop and mobile visitors, January to June"
  tooltip={<ChartTooltipContent />}
/>
```

<!-- ::preview item="chart-example-tooltip" height="400" combinations="react/base,react/aria" -->

Hover to see the tooltips. Easy, right? Two parts, and we've got a beautiful tooltip. The muted band behind the month is a mark too, shown while the month has the focus: `whenFocused(bandX(chartData, { x: "month", fill: theme.muted }), { match: "x" })`.

<!-- ::end:steps -->

### Add Legend

We'll do the same for the legend. We'll use the `ChartLegendContent` component from `chart`.

<!-- ::start:steps -->

### Import the `ChartLegendContent` component.

```tsx
import { ChartLegendContent } from "@/components/ui/chart"
```

### Give it to the container.

```tsx showLineNumbers {6}
<ChartContainer
  config={chartConfig}
  definition={chart}
  ariaLabel="Desktop and mobile visitors, January to June"
  tooltip={<ChartTooltipContent />}
  legend={<ChartLegendContent />}
/>
```

<!-- ::preview item="chart-example-legend" height="400" combinations="react/base,react/aria" -->

<!-- ::end:steps -->

Done. You've built your first chart! What's next?

- [Themes and Colors](/docs/components/chart#theming)
- [Tooltip](/docs/components/chart#tooltip)
- [Legend](/docs/components/chart#legend)

## Chart Config

The chart config is where you define the labels, icons and colors for a chart.

It is intentionally decoupled from chart data.

This allows you to share config and color tokens between charts. It can also work independently for cases where your data or color tokens live remotely or in a different format.

```tsx showLineNumbers
import { Monitor } from "lucide-react"

import { type ChartConfig } from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    icon: Monitor,
    // A colour like 'hsl(220, 98%, 61%)', 'var(--color-name)' or a token, theme.chart1
    color: "#2563eb",
    // OR a theme object with 'light' and 'dark' keys
    theme: {
      light: "#2563eb",
      dark: "#dc2626",
    },
  },
} satisfies ChartConfig
```

A `theme` object becomes a `light-dark()` pair, so the colour follows the page's mode as every token does.

## Theming

Charts have built-in support for theming. You can use the design's tokens (recommended) or color values in any color format, such as hex, hsl or oklch.

### Tokens

1. **Pick the chart colours.** The five series colours are the design's chart colours axis, chosen with the rest of the design ([Colours and theming](/docs/design-system/theming)). Each is a `light-dark()` pair, so it serves both modes.

2. **Add the token to your `chartConfig`.**

```tsx showLineNumbers title="components/example-chart.tsx"
import { theme } from "@/lib/kirana/tokens"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: theme.chart1,
  },
  mobile: {
    label: "Mobile",
    color: theme.chart2,
  },
} satisfies ChartConfig
```

### hex, hsl or oklch

You can also define your colors directly in the chart config. Use the color format you prefer.

```tsx showLineNumbers title="components/example-chart.tsx"
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(220, 98%, 61%)",
  },
  tablet: {
    label: "Tablet",
    color: "oklch(0.5 0.2 240)",
  },
  laptop: {
    label: "Laptop",
    color: theme.chart2,
  },
} satisfies ChartConfig
```

### Using Colors

To use the theme colors in your chart, reference the colors using the format `var(--color-KEY)`.

#### Marks

```tsx
barY(chartData, { x: "month", y: "desktop", fill: "var(--color-desktop)" })
```

Or give every series its colour at once, through the definition's `color` scale:

```tsx
color: {
  domain: SERIES,
  range: SERIES.map((series) => `var(--color-${series})`),
},
```

#### Chart Data

```tsx showLineNumbers title="components/example-chart.tsx"
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
]
```

A row's `fill` is also the colour its tooltip row shows.

## Tooltip

A chart tooltip contains a label, name, indicator and value. You can use a combination of these to customize your tooltip.

<!-- ::preview item="chart-tooltip" height="400" combinations="react/base,react/aria" -->

You can turn on/off any of these using the `hideLabel`, `hideIndicator` props and customize the indicator style using the `indicator` prop.

Use `labelKey` and `nameKey` to use a custom key for the tooltip label and name.

Chart comes with `chartTooltip`, TanStack Charts' tooltip for the definition, and the `<ChartTooltipContent>` component, what the tooltip shows.

```tsx title="components/example-chart.tsx"
import { ChartTooltipContent, chartTooltip } from "@/components/ui/chart"
```

```tsx title="components/example-chart.tsx"
const chart = defineChart(spec, { tooltip: chartTooltip })

<ChartContainer definition={chart} tooltip={<ChartTooltipContent />} />
```

### Props

Use the following props to customize the tooltip.

| Prop             | Type                                              | Description                                             |
| :--------------- | :------------------------------------------------ | :------------------------------------------------------ |
| `labelKey`       | string                                            | The config key to use for the label.                    |
| `nameKey`        | string                                            | The data or config key to use for the name.             |
| `indicator`      | `dot` `line` or `dashed`                          | The indicator style for the tooltip.                    |
| `hideLabel`      | boolean                                           | Whether to hide the label.                              |
| `hideIndicator`  | boolean                                           | Whether to hide the indicator.                          |
| `label`          | ReactNode                                         | The label, in place of the focused category's.          |
| `labelFormatter` | `(label, points) => ReactNode`                    | Writes the label, given it and the focused points.      |
| `formatter`      | `(value, name, point, index, datum) => ReactNode` | Writes a row in place of its indicator, name and value. |
| `color`          | string                                            | One indicator colour for every row.                     |
| `sx`, `labelSx`  | `Sx`                                              | Styles for the tooltip and its label.                   |

Which points the tooltip lists is the definition's `focus`: `"group-x"` lists every series at the focused category, as Recharts does; a tooltip's `sort` puts them in order.

### Colors

Colors are automatically referenced from the chart config.

### Custom

To use a custom key for tooltip label and names, use the `labelKey` and `nameKey` props.

```tsx showLineNumbers
const chartData = [
  { browser: "chrome", visitors: 187, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
]

const chartConfig = {
  visitors: {
    label: "Total Visitors",
  },
  chrome: {
    label: "Chrome",
    color: theme.chart1,
  },
  safari: {
    label: "Safari",
    color: theme.chart2,
  },
} satisfies ChartConfig
```

```tsx title="components/example-chart.tsx"
<ChartContainer
  tooltip={<ChartTooltipContent labelKey="visitors" nameKey="browser" />}
/>
```

This will use `Total Visitors` for label and `Chrome` and `Safari` for the tooltip names.

## Legend

You can use the custom `<ChartLegendContent>` component to add a legend to your chart.

```tsx title="components/example-chart.tsx"
import { ChartLegendContent } from "@/components/ui/chart"
```

```tsx title="components/example-chart.tsx"
<ChartContainer legend={<ChartLegendContent />} />
```

### Colors

Colors are automatically referenced from the chart config.

### Custom

The legend lists every config entry with a colour, its icon or a swatch beside its label. Use `keys` to choose the entries and their order, `hideIcon` to show swatches where the config has icons, and `verticalAlign="top"` to put the legend over the chart.

```tsx title="components/example-chart.tsx"
<ChartContainer legend={<ChartLegendContent keys={["safari", "chrome"]} />} />
```

## Accessibility

Every chart takes an `ariaLabel`, the name a screen reader reads for it, and an optional `ariaDescription`.

TanStack Charts makes the chart focusable: the arrow keys move between its points, Home and End go to the first and the last, and the tooltip follows the focus.

```tsx title="components/example-chart.tsx"
<ChartContainer
  definition={chart}
  ariaLabel="Desktop and mobile visitors, January to June"
  ariaDescription="Desktop visitors peak in February."
/>
```

## RTL

To set the direction, see [Right to left](/docs/design-system/rtl). A chart's x scale runs from the right with `reverse: true`.

<!-- ::preview item="chart-rtl" height="400" combinations="react/base,react/aria" direction="rtl" -->
