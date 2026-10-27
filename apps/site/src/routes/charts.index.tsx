import { createFileRoute } from "@tanstack/react-router"

import { ChartGrid } from "@/components/charts/chart-grid"
import { LISTED_TYPES } from "@/components/charts/charts-nav"
import { CHARTS } from "@workspace/registry/charts"

/** `/charts`: the first type's charts, as upstream's charts open on its area charts. */
export const Route = createFileRoute("/charts/")({ component: First })

function First() {
  const type = LISTED_TYPES[0]
  return (
    <ChartGrid charts={CHARTS.filter((chart) => chart.type === type?.slug)} />
  )
}
