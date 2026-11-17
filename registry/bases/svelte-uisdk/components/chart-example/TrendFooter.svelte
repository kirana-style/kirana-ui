<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { css } from "@kirana-style/core"
  import { fontWeight, space } from "../../../../core/scales"
  import { theme } from "../../../../core/tokens"
  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { CardFooter } from "../../ui/card"

  let {
    note,
    class: className,
    ...rest
  }: {
    note: string
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const styles = {
    // The area and line cards' footer: `flex w-full items-start gap-2` around a `grid gap-2`.
    footerRow: css({ display: "flex", alignItems: "flex-start", gap: space[2] }),
    lines: css({ display: "grid", gap: space[2] }),
    trendRow: css({
      display: "flex",
      alignItems: "center",
      gap: space[2],
      lineHeight: "1",
      fontWeight: fontWeight.medium,
    }),
    noteRow: css({
      display: "flex",
      alignItems: "center",
      gap: space[2],
      lineHeight: "1",
      color: theme.mutedForeground,
    }),
    icon: css({ width: space[4], height: space[4] }),
  }
</script>

<CardFooter {...rest} sx={className as Sx}>
  <div sx={styles.footerRow}>
    <div sx={styles.lines}>
      <div sx={styles.trendRow}>
        Trending up by 5.2% this month{" "}
        <IconPlaceholder lucide="TrendingUpIcon" tabler="IconTrendingUp" hugeicons="ChartUpIcon" phosphor="TrendUpIcon" remixicon="RiLineChartLine" sx={styles.icon} />
      </div>
      <div sx={styles.noteRow}>
        {note}
      </div>
    </div>
  </div>
</CardFooter>
