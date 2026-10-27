/** Upstream's home card: a bar per hour, in the second chart colour, and two readings. */
import { css } from "@kirana-style/core"

import { Separator } from "@workspace/registry/bases/react-base/ui/separator"
import { shared } from "./shared"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"
import { radius, theme } from "@workspace/registry/core/tokens"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/registry/bases/react-base/ui/card"

const styles = {
  bars: css({
    display: "flex",
    alignItems: "flex-end",
    gap: space[2],
    height: "140px",
    width: "100%",
  }),
  barColumn: css({
    display: "flex",
    flex: "1 1 0%",
    flexDirection: "column",
    justifyContent: "flex-end",
    gap: space["1.5"],
    height: "100%",
  }),
  bar: css({
    minHeight: space[2],
    borderStartStartRadius: radius.sm,
    borderStartEndRadius: radius.sm,
    backgroundColor: theme.chart2,
  }),
  hour: css({
    textAlign: "center",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  reading: css({ display: "flex", flexDirection: "column", gap: space["0.5"] }),
  readingLabel: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  readingValue: css({
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  }),
}

const USAGE = [
  { hour: "6a", usage: 1.2 },
  { hour: "8a", usage: 2.8 },
  { hour: "10a", usage: 3.1 },
  { hour: "12p", usage: 2.4 },
  { hour: "2p", usage: 3.4 },
  { hour: "4p", usage: 2.9 },
  { hour: "6p", usage: 3.8 },
  { hour: "8p", usage: 3.2 },
]
const PEAK = Math.max(...USAGE.map((item) => item.usage))

export function PowerUsage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Power Usage</CardTitle>
        <CardDescription>Whole Home</CardDescription>
      </CardHeader>
      <CardContent sx={shared.stack}>
        <div sx={styles.bars} role="img" aria-label="Power usage by hour">
          {USAGE.map((item) => (
            <div key={item.hour} sx={styles.barColumn}>
              <div
                sx={styles.bar}
                style={{ height: `${(item.usage / PEAK) * 100}%` }}
              />
              <span sx={styles.hour}>{item.hour}</span>
            </div>
          ))}
        </div>
        <Separator />
        <div sx={shared.pair}>
          <div sx={styles.reading}>
            <span sx={styles.readingLabel}>Currently Using</span>
            <span sx={styles.readingValue}>3.4 kW</span>
          </div>
          <div sx={styles.reading}>
            <span sx={styles.readingLabel}>Solar Gen</span>
            <span sx={styles.readingValue}>+1.2 kW</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
