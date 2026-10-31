import { Button } from "@workspace/registry/bases/react-base/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/registry/bases/react-base/ui/card"
import {
  Item,
  ItemContent,
  ItemDescription,
} from "@workspace/registry/bases/react-base/ui/item"
import { css } from "@kirana-style/core"
import { axes } from "@workspace/registry/core/axes"
import { font, radius, theme } from "@workspace/registry/core/tokens"
import {
  breakpoint,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"

const styles = {
  div: css({
    display: "flex",
    height: "200px",
    width: "100%",
    alignItems: "flex-end",
    gap: space[3],
  }),
  div2: css({
    display: "flex",
    height: "100%",
    flex: "1 1 0%",
    flexDirection: "column",
    justifyContent: "flex-end",
    gap: space[2],
  }),
  div3: css({
    // Upstream's sixth bar reads `bg-chart-6`, which its theme does not define: it draws no fill.
    minHeight: space[2],
    borderRadius: radius.lg,
    backgroundColor: {
      '[data-index="0"]': theme.chart1,
      '[data-index="1"]': theme.chart2,
      '[data-index="2"]': theme.chart3,
      '[data-index="3"]': theme.chart4,
      '[data-index="4"]': theme.chart5,
    },
  }),
  span: css({
    textAlign: "center",
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
  div4: css({
    display: "grid",
    width: "100%",
    gridTemplateColumns: {
      base: "repeat(1, minmax(0, 1fr))",
      [breakpoint.xl]: "repeat(2, minmax(0, 1fr))",
    },
    gap: space[3],
  }),
  item: css({
    flexDirection: { "*": null, base: "column" },
    alignItems: { "*": null, base: "stretch" },
  }),
  itemContent: css({
    gap: { "*": null, base: space[1] },
  }),
  itemDescription: css({
    fontSize: { "*": null, base: fontSize.xs },
    fontWeight: { "*": null, base: fontWeight.medium },
    letterSpacing: { "*": null, base: letterSpacing.wider },
    color: theme.mutedForeground,
    textTransform: { "*": null, base: "uppercase" },
    // The card's size sets the line height where the style's own comes with its size.
    lineHeight: {
      [axes.style.maia]: lineHeight.xs,
      [axes.style.lyra]: lineHeight.xs,
      [axes.style.mira]: lineHeight.xs,
      [axes.style.luma]: lineHeight.xs,
      [axes.style.rhea]: lineHeight.xs,
    },
  }),
  span2: css({
    fontFamily: font.heading,
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    fontWeight: fontWeight.semibold,
  }),
  span3: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  item2: css({
    display: { "*": null, base: "none", [breakpoint.xl]: "flex" },
    flexDirection: { "*": null, base: "column" },
    alignItems: { "*": null, base: "stretch" },
  }),
  itemContent2: css({
    gap: { "*": null, base: space[1] },
  }),
  itemDescription2: css({
    fontSize: { "*": null, base: fontSize.xs },
    fontWeight: { "*": null, base: fontWeight.medium },
    letterSpacing: { "*": null, base: letterSpacing.wider },
    color: theme.mutedForeground,
    textTransform: { "*": null, base: "uppercase" },
    // The card's size sets the line height where the style's own comes with its size.
    lineHeight: {
      [axes.style.maia]: lineHeight.xs,
      [axes.style.lyra]: lineHeight.xs,
      [axes.style.mira]: lineHeight.xs,
      [axes.style.luma]: lineHeight.xs,
      [axes.style.rhea]: lineHeight.xs,
    },
  }),
  span4: css({
    fontFamily: font.heading,
    fontSize: fontSize.base,
    lineHeight: lineHeight.base,
    fontWeight: fontWeight.semibold,
  }),
  span5: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  button: css({
    width: { "*": null, base: "100%" },
  }),
}

const chartData = [
  { month: "Dec", amount: 800 },
  { month: "Jan", amount: 1100 },
  { month: "Feb", amount: 900 },
  { month: "Mar", amount: 1300 },
  { month: "Apr", amount: 750 },
]

export function ContributionHistory() {
  const maxAmount = Math.max(...chartData.map((item) => item.amount))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contribution History</CardTitle>
        <CardDescription>Last 6 months of activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          sx={styles.div}
          role="img"
          aria-label="Last 6 months of contribution activity"
        >
          {chartData.map((item, index) => (
            <div key={item.month} sx={styles.div2}>
              <div
                data-index={index}
                sx={styles.div3}
                style={{ height: `${(item.amount / maxAmount) * 100}%` }}
              />
              <span sx={styles.span}>{item.month}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardContent>
        <div sx={styles.div4}>
          <Item variant="muted" sx={styles.item}>
            <ItemContent sx={styles.itemContent}>
              <ItemDescription sx={styles.itemDescription}>
                Upcoming
              </ItemDescription>
              <span sx={styles.span2}>May 2024</span>
              <span sx={styles.span3}>Scheduled</span>
            </ItemContent>
          </Item>
          <Item variant="muted" sx={styles.item2}>
            <ItemContent sx={styles.itemContent2}>
              <ItemDescription sx={styles.itemDescription2}>
                Savings Plan
              </ItemDescription>
              <span sx={styles.span4}>Accelerated</span>
              <span sx={styles.span5}>Recurring</span>
            </ItemContent>
          </Item>
        </div>
      </CardContent>
      <CardFooter>
        <Button sx={styles.button}>View Full Report</Button>
      </CardFooter>
    </Card>
  )
}
