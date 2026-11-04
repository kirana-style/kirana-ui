import { splitProps } from "solid-js"
import { css, props as styleProps } from "@kirana-style/core"
import { fontWeight, space } from "../../../../core/scales"
import { theme } from "../../../../core/tokens"
import { IconPlaceholder } from "../../ui/icon-placeholder"
import { CardFooter } from "../../ui/card"
import type { Sx } from "@kirana-style/core"

export function TrendFooter(props: {
  note: string
  class?: string
  sx?: Sx
  [attribute: string]: unknown
}) {
  const [local, rest] = splitProps(props, ["note", "class", "sx"])
  const styles = {
    // The area and line cards' footer: `flex w-full items-start gap-2` around a `grid gap-2`.
    footerRow: css({
      display: "flex",
      alignItems: "flex-start",
      gap: space[2],
    }),
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

  return (
    <CardFooter {...rest} class={local.class} sx={[local.sx]}>
      <div sx={styles.footerRow}>
        <div sx={styles.lines}>
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
          <div sx={styles.noteRow}>{local.note}</div>
        </div>
      </div>
    </CardFooter>
  )
}
