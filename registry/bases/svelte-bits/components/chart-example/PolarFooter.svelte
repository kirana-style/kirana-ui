<script lang="ts">
  import type { Sx } from "@kirana-style/core"
  import type { ClassValue } from "svelte/elements"

  import { css } from "@kirana-style/core"
  import { fontWeight, space } from "../../../../core/scales"
  import { theme } from "../../../../core/tokens"
  import IconPlaceholder from "../../../../icons/IconPlaceholder.svelte"
  import { CardFooter } from "../../ui/card"

  let {
    note, row,
    class: className,
    ...rest
  }: {
    note: string
    row?: boolean
    class?: ClassValue | null
    [attribute: string]: unknown
  } = $props()

  const styles = {
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
    note: css({ lineHeight: "1", color: theme.mutedForeground }),
    // `flex-col gap-2`, centred by the footer's own `items-center`.
    polarFooter: css({ flexDirection: "column", gap: space[2] }),
  }
</script>

<CardFooter sx={[styles.polarFooter, className as Sx]} {...rest}>
  <div sx={styles.trendRow}>
    Trending up by 5.2% this month{" "}
    <IconPlaceholder lucide="TrendingUpIcon" tabler="IconTrendingUp" hugeicons="ChartUpIcon" phosphor="TrendUpIcon" remixicon="RiLineChartLine" sx={styles.icon} />
  </div>
  <div sx={row ? styles.noteRow : styles.note}>
    {note}
  </div>
</CardFooter>
