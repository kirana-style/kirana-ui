import { createFileRoute, notFound } from "@tanstack/react-router"

import { ChartGrid } from "@/components/charts/chart-grid"
import { CHART_TYPES, CHARTS } from "@workspace/registry/charts"

/** `/charts/<type>`: its charts, in upstream's order. */
export const Route = createFileRoute("/charts/$type")({
  loader: ({ params }) => {
    const type = CHART_TYPES.find((entry) => entry.slug === params.type)
    const charts = CHARTS.filter((chart) => chart.type === params.type)
    if (!type || charts.length === 0) throw notFound()
    return { type, charts }
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `${loaderData.type.name} · kirana/ui` }] : [],
  }),
  component: ChartType,
})

function ChartType() {
  const { charts } = Route.useLoaderData()
  return <ChartGrid charts={charts} />
}
