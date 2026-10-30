"use client"

import { Badge } from "../../../ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css, select, props as styleProps } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import {
  breakpoint,
  fontSize,
  fontWeight,
  lineHeight,
  shadow,
  space,
} from "../../../../../core/scales"

const styles = {
  sectionCardsDiv: css({
    display: "grid",
    gridTemplateColumns: {
      base: "repeat(1, minmax(0, 1fr))",
      "@container main (width >= 36rem)": "repeat(2, minmax(0, 1fr))",
      "@container main (width >= 64rem)": "repeat(4, minmax(0, 1fr))",
    },
    gap: space[4],
    paddingInline: { base: space[4], [breakpoint.lg]: space[6] },
    // `*:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card`.
    [select.child('[data-slot="card"]')]: {
      backgroundImage: `linear-gradient(to top, color-mix(in oklab, ${theme.primary} 5%, transparent), ${theme.card})`,

      boxShadow: `${shadow.xs}`,
      backgroundColor: `light-dark(transparent, ${theme.card})`,
    },
  }),
  sectionCardsCard: css({
    containerType: { "*": null, base: "inline-size" },
    containerName: { "*": null, base: "card" },
  }),
  cardTitle: css({
    fontSize: {
      "*": null,
      base: fontSize["2xl"],
      "@container card (width >= 250px)": fontSize["3xl"],
    },
    lineHeight: {
      base: lineHeight["2xl"],
      "@container card (width >= 250px)": lineHeight["3xl"],
    },
    fontWeight: { "*": null, base: fontWeight.semibold },
    fontVariantNumeric: { "*": null, base: "tabular-nums" },
  }),
  cardFooter: css({
    flexDirection: { "*": null, base: "column" },
    alignItems: { "*": null, base: "flex-start" },
    gap: { "*": null, base: space["1.5"] },
    fontSize: { "*": null, base: fontSize.sm },
    lineHeight: lineHeight.sm,
  }),
  div2: css({
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    display: "flex",
    overflow: "hidden",
    gap: space[2],
    fontWeight: fontWeight.medium,
  }),
  iconPlaceholder: css({
    width: space[4],
    height: space[4],
  }),
  div3: css({
    color: theme.mutedForeground,
  }),
  card2: css({
    containerType: { "*": null, base: "inline-size" },
    containerName: { "*": null, base: "card" },
  }),
  cardTitle2: css({
    fontSize: {
      "*": null,
      base: fontSize["2xl"],
      "@container card (width >= 250px)": fontSize["3xl"],
    },
    lineHeight: {
      base: lineHeight["2xl"],
      "@container card (width >= 250px)": lineHeight["3xl"],
    },
    fontWeight: { "*": null, base: fontWeight.semibold },
    fontVariantNumeric: { "*": null, base: "tabular-nums" },
  }),
  cardFooter2: css({
    flexDirection: { "*": null, base: "column" },
    alignItems: { "*": null, base: "flex-start" },
    gap: { "*": null, base: space["1.5"] },
    fontSize: { "*": null, base: fontSize.sm },
    lineHeight: lineHeight.sm,
  }),
  div4: css({
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    display: "flex",
    overflow: "hidden",
    gap: space[2],
    fontWeight: fontWeight.medium,
  }),
  iconPlaceholder2: css({
    width: space[4],
    height: space[4],
  }),
  div5: css({
    color: theme.mutedForeground,
  }),
  card3: css({
    containerType: { "*": null, base: "inline-size" },
    containerName: { "*": null, base: "card" },
  }),
  cardTitle3: css({
    fontSize: {
      "*": null,
      base: fontSize["2xl"],
      "@container card (width >= 250px)": fontSize["3xl"],
    },
    lineHeight: {
      base: lineHeight["2xl"],
      "@container card (width >= 250px)": lineHeight["3xl"],
    },
    fontWeight: { "*": null, base: fontWeight.semibold },
    fontVariantNumeric: { "*": null, base: "tabular-nums" },
  }),
  cardFooter3: css({
    flexDirection: { "*": null, base: "column" },
    alignItems: { "*": null, base: "flex-start" },
    gap: { "*": null, base: space["1.5"] },
    fontSize: { "*": null, base: fontSize.sm },
    lineHeight: lineHeight.sm,
  }),
  div6: css({
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    display: "flex",
    overflow: "hidden",
    gap: space[2],
    fontWeight: fontWeight.medium,
  }),
  iconPlaceholder3: css({
    width: space[4],
    height: space[4],
  }),
  div7: css({
    color: theme.mutedForeground,
  }),
  card4: css({
    containerType: { "*": null, base: "inline-size" },
    containerName: { "*": null, base: "card" },
  }),
  cardTitle4: css({
    fontSize: {
      "*": null,
      base: fontSize["2xl"],
      "@container card (width >= 250px)": fontSize["3xl"],
    },
    lineHeight: {
      base: lineHeight["2xl"],
      "@container card (width >= 250px)": lineHeight["3xl"],
    },
    fontWeight: { "*": null, base: fontWeight.semibold },
    fontVariantNumeric: { "*": null, base: "tabular-nums" },
  }),
  cardFooter4: css({
    flexDirection: { "*": null, base: "column" },
    alignItems: { "*": null, base: "flex-start" },
    gap: { "*": null, base: space["1.5"] },
    fontSize: { "*": null, base: fontSize.sm },
    lineHeight: lineHeight.sm,
  }),
  div8: css({
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    display: "flex",
    overflow: "hidden",
    gap: space[2],
    fontWeight: fontWeight.medium,
  }),
  iconPlaceholder4: css({
    width: space[4],
    height: space[4],
  }),
  div9: css({
    color: theme.mutedForeground,
  }),
}

export function SectionCards() {
  return (
    <div sx={styles.sectionCardsDiv}>
      <Card sx={styles.sectionCardsCard}>
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle sx={styles.cardTitle}>$1,250.00</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconPlaceholder
                lucide="TrendingUpIcon"
                tabler="IconTrendingUp"
                hugeicons="ChartUpIcon"
                phosphor="TrendUpIcon"
                remixicon="RiArrowUpLine"
              />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter sx={styles.cardFooter}>
          <div sx={styles.div2}>
            Trending up this month{" "}
            <IconPlaceholder
              lucide="TrendingUpIcon"
              tabler="IconTrendingUp"
              hugeicons="ChartUpIcon"
              phosphor="TrendUpIcon"
              remixicon="RiArrowUpLine"
              {...styleProps(styles.iconPlaceholder)}
            />
          </div>
          <div sx={styles.div3}>Visitors for the last 6 months</div>
        </CardFooter>
      </Card>
      <Card sx={styles.card2}>
        <CardHeader>
          <CardDescription>New Customers</CardDescription>
          <CardTitle sx={styles.cardTitle2}>1,234</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconPlaceholder
                lucide="TrendingDownIcon"
                tabler="IconTrendingDown"
                hugeicons="ChartDownIcon"
                phosphor="TrendDownIcon"
                remixicon="RiArrowDownLine"
              />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter sx={styles.cardFooter2}>
          <div sx={styles.div4}>
            Down 20% this period{" "}
            <IconPlaceholder
              lucide="TrendingDownIcon"
              tabler="IconTrendingDown"
              hugeicons="ChartDownIcon"
              phosphor="TrendDownIcon"
              remixicon="RiArrowDownLine"
              {...styleProps(styles.iconPlaceholder2)}
            />
          </div>
          <div sx={styles.div5}>Acquisition needs attention</div>
        </CardFooter>
      </Card>
      <Card sx={styles.card3}>
        <CardHeader>
          <CardDescription>Active Accounts</CardDescription>
          <CardTitle sx={styles.cardTitle3}>45,678</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconPlaceholder
                lucide="TrendingUpIcon"
                tabler="IconTrendingUp"
                hugeicons="ChartUpIcon"
                phosphor="TrendUpIcon"
                remixicon="RiArrowUpLine"
              />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter sx={styles.cardFooter3}>
          <div sx={styles.div6}>
            Strong user retention{" "}
            <IconPlaceholder
              lucide="TrendingUpIcon"
              tabler="IconTrendingUp"
              hugeicons="ChartUpIcon"
              phosphor="TrendUpIcon"
              remixicon="RiArrowUpLine"
              {...styleProps(styles.iconPlaceholder3)}
            />
          </div>
          <div sx={styles.div7}>Engagement exceed targets</div>
        </CardFooter>
      </Card>
      <Card sx={styles.card4}>
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle sx={styles.cardTitle4}>4.5%</CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconPlaceholder
                lucide="TrendingUpIcon"
                tabler="IconTrendingUp"
                hugeicons="ChartUpIcon"
                phosphor="TrendUpIcon"
                remixicon="RiArrowUpLine"
              />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter sx={styles.cardFooter4}>
          <div sx={styles.div8}>
            Steady performance increase{" "}
            <IconPlaceholder
              lucide="TrendingUpIcon"
              tabler="IconTrendingUp"
              hugeicons="ChartUpIcon"
              phosphor="TrendUpIcon"
              remixicon="RiArrowUpLine"
              {...styleProps(styles.iconPlaceholder4)}
            />
          </div>
          <div sx={styles.div9}>Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  )
}
