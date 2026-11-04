import { splitProps } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
import { fontWeight, space } from "../../../../core/scales"
import { theme } from "../../../../core/tokens"
import { IconPlaceholder } from "../../ui/icon-placeholder"
import { CardFooter } from "../../ui/card"
import type { Sx } from "@kirana-style/core"

export function PolarFooter(props: {
  note: string
  row?: boolean
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["note", "row", "class", "sx"])
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

  return (
    <CardFooter
      class={local.class}
      sx={[styles.polarFooter, local.sx]}
      {...rest}
    >
      <div sx={styles.trendRow}>
        Trending up by 5.2% this month{" "}
        <IconPlaceholder
          lucide="TrendingUpIcon"
          tabler="IconTrendingUp"
          hugeicons="ChartUpIcon"
          phosphor="TrendUpIcon"
          remixicon="RiLineChartLine"
          {...styleProps(styles.icon)}
        />
      </div>
      <div sx={local.row ? styles.noteRow : styles.note}>{local.note}</div>
    </CardFooter>
  )
}
