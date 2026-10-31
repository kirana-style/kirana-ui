import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/registry/bases/react-base/ui/card"
import { Separator } from "@workspace/registry/bases/react-base/ui/separator"
import { css } from "@kirana-style/core"
import { theme } from "@workspace/registry/core/tokens"
import {
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"

const styles = {
  cardContent: css({
    display: { "*": null, base: "flex" },
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[4] },
  }),
  div: css({
    display: "flex",
    height: "140px",
    width: "100%",
    alignItems: "flex-end",
    gap: space[2],
  }),
  div2: css({
    display: "flex",
    height: "100%",
    flex: "1 1 0%",
    flexDirection: "column",
    justifyContent: "flex-end",
    gap: space["1.5"],
  }),
  div3: css({
    minHeight: space[2],
    borderTopLeftRadius: "0.25rem",
    borderTopRightRadius: "0.25rem",
    backgroundColor: theme.chart2,
  }),
  span: css({
    textAlign: "center",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  div4: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: space[4],
  }),
  div5: css({
    display: "flex",
    flexDirection: "column",
    gap: space["0.5"],
  }),
  span2: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  span3: css({
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  }),
  div6: css({
    display: "flex",
    flexDirection: "column",
    gap: space["0.5"],
  }),
  span4: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  span5: css({
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  }),
}

const chartData = [
  { hour: "6a", usage: 1.2 },
  { hour: "8a", usage: 2.8 },
  { hour: "10a", usage: 3.1 },
  { hour: "12p", usage: 2.4 },
  { hour: "2p", usage: 3.4 },
  { hour: "4p", usage: 2.9 },
  { hour: "6p", usage: 3.8 },
  { hour: "8p", usage: 3.2 },
]

export function PowerUsage() {
  const maxUsage = Math.max(...chartData.map((item) => item.usage))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Power Usage</CardTitle>
        <CardDescription>Whole Home</CardDescription>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <div sx={styles.div} role="img" aria-label="Power usage by hour">
          {chartData.map((item) => (
            <div key={item.hour} sx={styles.div2}>
              <div
                sx={styles.div3}
                style={{ height: `${(item.usage / maxUsage) * 100}%` }}
              />
              <span sx={styles.span}>{item.hour}</span>
            </div>
          ))}
        </div>
        <Separator />
        <div sx={styles.div4}>
          <div sx={styles.div5}>
            <span sx={styles.span2}>Currently Using</span>
            <span sx={styles.span3}>3.4 kW</span>
          </div>
          <div sx={styles.div6}>
            <span sx={styles.span4}>Solar Gen</span>
            <span sx={styles.span5}>+1.2 kW</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
