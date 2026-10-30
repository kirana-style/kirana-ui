/**
 * Upstream's `chart-rtl` (the Chart page's right-to-left demo) on TanStack Charts: the legend's
 * chart in the language the selector picks, its months and series translated, the months running
 * from the right in Arabic and Hebrew (the x scale's `reverse`, Recharts' `reversed`).
 */
import * as React from "react"
import { css } from "@kirana-style/core"
import { barY, defineChart, group, whenFocused } from "@tanstack/charts"
import { bandX } from "@tanstack/charts/band"
import { scaleBand } from "@tanstack/charts/scales/band"
import { scaleLinear } from "@tanstack/charts/scales/linear"

import { space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import type { ChartConfig } from "../ui/chart"
import {
  ChartContainer,
  ChartLegendContent,
  ChartTooltipContent,
  chartTheme,
  chartTooltip,
  hiddenAxis,
  niceTicks,
} from "../ui/chart"

const styles = {
  // `min-h-[200px] w-full`.
  chart: css({ minHeight: "200px", width: "100%" }),
  // The tooltip's `labelClassName="w-32"`.
  label: css({ width: space[32] }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      january: "January",
      february: "February",
      march: "March",
      april: "April",
      may: "May",
      june: "June",
      desktop: "Desktop",
      mobile: "Mobile",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      january: "يناير",
      february: "فبراير",
      march: "مارس",
      april: "أبريل",
      may: "مايو",
      june: "يونيو",
      desktop: "سطح المكتب",
      mobile: "الجوال",
    },
  },
  he: {
    dir: "rtl",
    values: {
      january: "ינואר",
      february: "פברואר",
      march: "מרץ",
      april: "אפריל",
      may: "מאי",
      june: "יוני",
      desktop: "מחשב",
      mobile: "נייד",
    },
  },
}

const chartData = [
  { month: "january", desktop: 186, mobile: 80 },
  { month: "february", desktop: 305, mobile: 200 },
  { month: "march", desktop: 237, mobile: 120 },
  { month: "april", desktop: 73, mobile: 190 },
  { month: "may", desktop: 209, mobile: 130 },
  { month: "june", desktop: 214, mobile: 140 },
]

const SERIES = ["desktop", "mobile"] as const
const rows = chartData.flatMap((row) =>
  SERIES.map((series) => ({ month: row.month, series, value: row[series] }))
)
const y = niceTicks(rows.map((row) => row.value))

/** The chart in a language: its months' names, and their direction. */
function chartIn(t: Record<string, string>, rtl: boolean) {
  return defineChart(
    {
      marks: [
        // Recharts' tooltip cursor: the focused month's band, muted.
        whenFocused(bandX(chartData, { x: "month", fill: theme.muted }), {
          match: "x",
        }),
        barY(rows, {
          id: "visitors",
          x: "month",
          y: "value",
          color: "series",
          // Recharts' `barGap` of 4px between a month's bars.
          layout: group({ padding: 0.1 }),
          radius: 4,
        }),
      ],
      scales: {
        x: {
          // Recharts' `barCategoryGap` of 10% each side, as band padding.
          scale: () => scaleBand<string>().paddingInner(0.2).paddingOuter(0.1),
          reverse: rtl,
          axis: {
            line: false,
            ticks: {
              size: 0,
              padding: 10,
              format: (month: string) => (t[month] ?? month).slice(0, 3),
            },
            tickLabels: { fontSize: 12 },
          },
        },
        y: {
          scale: scaleLinear().domain(y.domain),
          grid: true,
          axis: hiddenAxis(y.ticks),
        },
      },
      color: {
        domain: SERIES,
        range: SERIES.map((series) => `var(--color-${series})`),
      },
      theme: chartTheme,
    },
    { focus: "group-x", tooltip: chartTooltip }
  )
}

export default function ChartRtl() {
  const { t, dir } = useTranslation(translations, "ar")
  const chart = React.useMemo(() => chartIn(t, dir === "rtl"), [t, dir])

  const chartConfig = {
    desktop: {
      label: t.desktop,
      color: theme.chart2,
    },
    mobile: {
      label: t.mobile,
      color: theme.chart1,
    },
  } satisfies ChartConfig

  return (
    <div sx={page.example} dir={dir}>
      <ChartContainer
        config={chartConfig}
        definition={chart}
        ariaLabel="Desktop and mobile visitors, January to June"
        initialWidth={480}
        sx={styles.chart}
        tooltip={
          <ChartTooltipContent
            labelFormatter={(value) => t[String(value)] ?? value}
            labelSx={styles.label}
          />
        }
        legend={<ChartLegendContent />}
      />
    </div>
  )
}
