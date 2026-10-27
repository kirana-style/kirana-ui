/**
 * A type's charts, as upstream's `/charts/<type>` lays them out: a grid of one, two or three
 * columns, a full-width chart across it, at the framework and base the docs' shared choice names
 * (`ChartsCombination`, at the end of the types' row).
 */
import { css } from "@kirana-style/core"

import { ChartDisplay } from "@/components/charts/chart-display"
import { useCombination } from "@workspace/docs-ui/combination.ts"
import { CombinationPicker } from "@workspace/docs-ui/markdown/preview.tsx"
import type { ChartItem } from "@workspace/registry/charts"
import { breakpoint, space } from "@workspace/registry/core/scales"

/** The bases a chart has: React's, as Ark UI has no Chart yet. */
const COMBINATIONS = ["react/base", "react/aria"]

const styles = {
  root: css({ display: "flex", flexDirection: "column", gap: space[6] }),
  // At the row's end, its margin dropped so it centres on the types' links, which scroll beside it.
  picker: css({
    display: "flex",
    flexShrink: 0,
    marginInlineStart: "auto",
    marginBlockEnd: { "*": null, base: 0 },
  }),
  // `grid items-stretch gap-10 md:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:gap-10`.
  grid: css({
    display: "grid",
    alignItems: "stretch",
    gap: {
      base: space[10],
      [breakpoint.md]: space[6],
      [breakpoint.xl]: space[10],
    },
    gridTemplateColumns: {
      base: "minmax(0, 1fr)",
      [breakpoint.md]: "repeat(2, minmax(0, 1fr))",
      [breakpoint.lg]: "repeat(3, minmax(0, 1fr))",
    },
  }),
  full: css({
    gridColumn: {
      [breakpoint.md]: "span 2 / span 2",
      [breakpoint.lg]: "span 3 / span 3",
    },
  }),
}

/** The framework and base, in the types' row, as the blocks page has its link there. */
export function ChartsCombination() {
  const { available, current } = useCombination(COMBINATIONS)
  return (
    <CombinationPicker
      available={available}
      current={current}
      sx={styles.picker}
    />
  )
}

export function ChartGrid({ charts }: { charts: readonly ChartItem[] }) {
  const { current } = useCombination(COMBINATIONS)
  const combination = current?.id ?? COMBINATIONS[0]!
  return (
    <div sx={styles.root}>
      <div sx={styles.grid}>
        {charts.map((chart) => (
          <div key={chart.name} sx={chart.fullWidth && styles.full}>
            <ChartDisplay chart={chart} combination={combination} />
          </div>
        ))}
      </div>
    </div>
  )
}
