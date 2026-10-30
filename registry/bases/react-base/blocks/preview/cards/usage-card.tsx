"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "../../../ui/item"
import { css, relation } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { theme } from "../../../../../core/tokens"
import {
  containerSize,
  duration,
  easing,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../../core/scales"

const itemGroupGroup = relation("usage-item-group-base")

const styles = {
  circularGaugeSvg: css({
    rotate: "calc(90deg * -1)",
  }),
  circularGaugeCircle: css({
    opacity: "20%",
  }),
  circularGaugeCircle2: css({
    transitionDuration: duration[300],
    transitionProperty: "all",
    transitionTimingFunction: easing.inOut,
  }),
  card: css({
    width: { "*": null, base: "100%" },
    maxWidth: { "*": null, base: containerSize.sm },
    gap: { "*": null, base: space[4] },
  }),
  cardTitle: css({
    paddingInline: { "*": null, base: space[1] },
    fontSize: { "*": null, base: fontSize.sm },
    // The card's size sets the line height where the style's own comes with its size.
    lineHeight: {
      [axes.style.maia]: lineHeight.sm,
      [axes.style.lyra]: lineHeight.sm,
      [axes.style.mira]: lineHeight.sm,
      [axes.style.luma]: lineHeight.sm,
      [axes.style.rhea]: lineHeight.sm,
      [axes.style.sera]: lineHeight.sm,
    },
  }),
  // The group hovered is the one this card's items read (upstream's `group/item-group`).
  itemGroup: css(itemGroupGroup.anchor, {
    gap: { "*": null, base: space["0"] },
  }),
  item: css({
    paddingInline: { "*": null, base: space["0"] },
    backgroundColor: { [itemGroupGroup.within(":hover")]: "transparent" },
  }),
  itemMedia: css({
    color: theme.primary,
  }),
  itemContent: css({
    display: { "*": null, base: "inline-block" },
    overflow: { "*": null, base: "hidden" },
    textOverflow: { "*": null, base: "ellipsis" },
    whiteSpace: { "*": null, base: "nowrap" },
  }),
  itemTitle: css({
    display: { "*": null, base: "inline" },
  }),
  span: css({
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
    fontVariantNumeric: "tabular-nums",
  }),
}

// Usage items with percentage and value.
const items = [
  {
    name: "Edge Requests",
    value: "$1.83K",
    percentage: 67.34,
  },
  {
    name: "Fast Data Transfer",
    percentage: 52.18,
    value: "$952.51",
  },
  {
    name: "Monitoring data points",
    percentage: 89.42,
    value: "$901.20",
  },
  {
    name: "Web Analytics Events",
    percentage: 45.67,
    value: "$603.71",
  },
  {
    name: "ISR Writes",
    percentage: 26.23,
    value: "524.52K / 2M",
  },
  {
    name: "Function Duration",
    percentage: 5.11,
    value: "5.11 GB Hrs / 1K GB Hrs",
  },
]

// Circular gauge SVG component for displaying a percentage.
function CircularGauge({ percentage }: { percentage: number }) {
  const normalizedPercentage = Math.min(Math.max(percentage, 0), 100)
  const circumference = 2 * Math.PI * 42.5
  const strokePercent = (normalizedPercentage / 100) * circumference

  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="16"
      width="16"
      strokeWidth="2"
      viewBox="0 0 100 100"
      sx={styles.circularGaugeSvg}
    >
      <circle
        cx="50"
        cy="50"
        r="42.5"
        strokeWidth="12"
        strokeDashoffset="0"
        strokeLinecap="round"
        strokeLinejoin="round"
        sx={styles.circularGaugeCircle}
        stroke="currentColor"
        style={{
          strokeDasharray: `${circumference} ${circumference}`,
        }}
      />
      <circle
        cx="50"
        cy="50"
        r="42.5"
        strokeWidth="12"
        strokeDashoffset="0"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
        sx={styles.circularGaugeCircle2}
        style={{
          strokeDasharray: `${strokePercent} ${circumference}`,
        }}
      />
    </svg>
  )
}

export function UsageCard() {
  return (
    <Card sx={styles.card}>
      <CardHeader>
        <CardTitle sx={styles.cardTitle}>5 days remaining in cycle</CardTitle>
      </CardHeader>
      <CardContent>
        <ItemGroup sx={styles.itemGroup}>
          {items.map((item) => (
            <Item
              key={item.name}
              size="xs"
              sx={styles.item}
              render={<a href="#" />}
            >
              <ItemMedia variant="icon" sx={styles.itemMedia}>
                <CircularGauge percentage={item.percentage} />
              </ItemMedia>
              <ItemContent sx={styles.itemContent}>
                <ItemTitle sx={styles.itemTitle}>{item.name}</ItemTitle>
              </ItemContent>
              <ItemActions>
                <span sx={styles.span}>{item.value}</span>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  )
}
