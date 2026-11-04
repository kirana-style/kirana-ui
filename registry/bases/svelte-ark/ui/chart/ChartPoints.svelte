<script lang="ts">
  /** Hands the tooltip body the focused points, as React's `PointsContext`. */
  import type { ChartPoint } from "@tanstack/charts"
  import { setContext } from "svelte"
  import type { Snippet } from "svelte"

  import { POINTS } from "./chart"
  import type { PointsContext } from "./chart"

  let { points, children }: { points: readonly ChartPoint[]; children?: Snippet } = $props()

  setContext<PointsContext>(POINTS, {
    get points() {
      return points
    },
  })
</script>

{@render children?.()}
