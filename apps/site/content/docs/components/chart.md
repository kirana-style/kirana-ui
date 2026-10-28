---
title: Chart
description: Charts on TanStack Charts, each series in one of the design's chart colours.
section: components
variants: [react/base, react/aria]
keywords: [chart, component, base, aria]
---

# Chart

<!-- ::preview item="chart-demo" height="440" combinations="react/base,react/aria" -->

Charts are drawn with [TanStack Charts](https://tanstack.com/charts), where shadcn/ui's use Recharts. A chart's config names each series' colour by its token, `theme.chart1`, where shadcn/ui writes `var(--chart-1)`; the chart colour axis sets them. The container, its tooltip and legend are the files the Manual installation lists. Ready-made charts, each a registry item of its own (`kirana-style ui add chart-area-default`), are on [the charts pages](/charts): an area, bar, line, pie, radar and radial chart and a tooltip so far, ported from shadcn/ui's.

## Installation

<!-- ::installation name="chart" combinations="react/base,react/aria" -->

## Usage

```tsx
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { theme } from "@/lib/kirana/tokens"

const chartConfig = {
  desktop: { label: "Desktop", color: theme.chart1 },
  mobile: { label: "Mobile", color: theme.chart2 },
} satisfies ChartConfig
```
