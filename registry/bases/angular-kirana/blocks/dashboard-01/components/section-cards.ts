import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, select } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { alpha, surface, theme } from "../../../../../core/tokens"
import {
  breakpoint,
  fontSize,
  fontWeight,
  leading,
  lineHeight,
  shadow,
  space,
} from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
import { Badge } from "../../../ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"

const TITLE_LEADING = {
  "*": null,
  base: lineHeight["2xl"],
  "@container card (width >= 250px)": lineHeight["3xl"],
  [axes.style.nova]: leading.snug,
  [axes.style.vega]: leading.normal,
}

const CARD_SHADOW = {
  "*": null,
  base: `0 0 0 1px ${alpha.foreground10}, ${shadow.xs}`,
  [axes.style.luma]: `0 0 0 1px ${surface.ringSoft}, ${shadow.xs}`,
  [axes.style.rhea]: `0 0 0 1px ${surface.ringSoft}, ${shadow.xs}`,
  [axes.style.sera]: `0 0 0 1px ${alpha.foreground5}, ${shadow.xs}`,
}

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
      backgroundImage: `linear-gradient(to top, color-mix(in oklab, ${theme.primary} 5%, transparent) 0%, ${theme.card} 100%)`,
      backgroundColor: `light-dark(transparent, ${theme.card})`,
    },
  }),
  sectionCardsCard: css({
    containerType: { "*": null, base: "inline-size" },
    containerName: { "*": null, base: "card" },
    boxShadow: CARD_SHADOW,
  }),
  cardTitle: css({
    fontSize: {
      "*": null,
      base: fontSize["2xl"],
      "@container card (width >= 250px)": fontSize["3xl"],
    },
    lineHeight: TITLE_LEADING,
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
    boxShadow: CARD_SHADOW,
  }),
  cardTitle2: css({
    fontSize: {
      "*": null,
      base: fontSize["2xl"],
      "@container card (width >= 250px)": fontSize["3xl"],
    },
    lineHeight: TITLE_LEADING,
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
    boxShadow: CARD_SHADOW,
  }),
  cardTitle3: css({
    fontSize: {
      "*": null,
      base: fontSize["2xl"],
      "@container card (width >= 250px)": fontSize["3xl"],
    },
    lineHeight: TITLE_LEADING,
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
    boxShadow: CARD_SHADOW,
  }),
  cardTitle4: css({
    fontSize: {
      "*": null,
      base: fontSize["2xl"],
      "@container card (width >= 250px)": fontSize["3xl"],
    },
    lineHeight: TITLE_LEADING,
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

@Component({
  selector: "kui-section-cards",
  imports: [
    Badge,
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div [sx]="styles.sectionCardsDiv">
      <div kuiCard [sx]="styles.sectionCardsCard">
        <div kuiCardHeader>
          <div kuiCardDescription>Total Revenue</div>
          <div kuiCardTitle [sx]="styles.cardTitle">$1,250.00</div>
          <div kuiCardAction>
            <span kuiBadge variant="outline">
              <svg
                iconPlaceholder
                lucide="TrendingUpIcon"
                tabler="IconTrendingUp"
                hugeicons="ChartUpIcon"
                phosphor="TrendUpIcon"
                remixicon="RiArrowUpLine"
              ></svg>
              +12.5%
            </span>
          </div>
        </div>
        <div kuiCardFooter [sx]="styles.cardFooter">
          <div [sx]="styles.div2">
            Trending up this month{{ " " }}
            <svg
              iconPlaceholder
              lucide="TrendingUpIcon"
              tabler="IconTrendingUp"
              hugeicons="ChartUpIcon"
              phosphor="TrendUpIcon"
              remixicon="RiArrowUpLine"
              [sx]="styles.iconPlaceholder"
            ></svg>
          </div>
          <div [sx]="styles.div3">Visitors for the last 6 months</div>
        </div>
      </div>
      <div kuiCard [sx]="styles.card2">
        <div kuiCardHeader>
          <div kuiCardDescription>New Customers</div>
          <div kuiCardTitle [sx]="styles.cardTitle2">1,234</div>
          <div kuiCardAction>
            <span kuiBadge variant="outline">
              <svg
                iconPlaceholder
                lucide="TrendingDownIcon"
                tabler="IconTrendingDown"
                hugeicons="ChartDownIcon"
                phosphor="TrendDownIcon"
                remixicon="RiArrowDownLine"
              ></svg>
              -20%
            </span>
          </div>
        </div>
        <div kuiCardFooter [sx]="styles.cardFooter2">
          <div [sx]="styles.div4">
            Down 20% this period{{ " " }}
            <svg
              iconPlaceholder
              lucide="TrendingDownIcon"
              tabler="IconTrendingDown"
              hugeicons="ChartDownIcon"
              phosphor="TrendDownIcon"
              remixicon="RiArrowDownLine"
              [sx]="styles.iconPlaceholder2"
            ></svg>
          </div>
          <div [sx]="styles.div5">Acquisition needs attention</div>
        </div>
      </div>
      <div kuiCard [sx]="styles.card3">
        <div kuiCardHeader>
          <div kuiCardDescription>Active Accounts</div>
          <div kuiCardTitle [sx]="styles.cardTitle3">45,678</div>
          <div kuiCardAction>
            <span kuiBadge variant="outline">
              <svg
                iconPlaceholder
                lucide="TrendingUpIcon"
                tabler="IconTrendingUp"
                hugeicons="ChartUpIcon"
                phosphor="TrendUpIcon"
                remixicon="RiArrowUpLine"
              ></svg>
              +12.5%
            </span>
          </div>
        </div>
        <div kuiCardFooter [sx]="styles.cardFooter3">
          <div [sx]="styles.div6">
            Strong user retention{{ " " }}
            <svg
              iconPlaceholder
              lucide="TrendingUpIcon"
              tabler="IconTrendingUp"
              hugeicons="ChartUpIcon"
              phosphor="TrendUpIcon"
              remixicon="RiArrowUpLine"
              [sx]="styles.iconPlaceholder3"
            ></svg>
          </div>
          <div [sx]="styles.div7">Engagement exceed targets</div>
        </div>
      </div>
      <div kuiCard [sx]="styles.card4">
        <div kuiCardHeader>
          <div kuiCardDescription>Growth Rate</div>
          <div kuiCardTitle [sx]="styles.cardTitle4">4.5%</div>
          <div kuiCardAction>
            <span kuiBadge variant="outline">
              <svg
                iconPlaceholder
                lucide="TrendingUpIcon"
                tabler="IconTrendingUp"
                hugeicons="ChartUpIcon"
                phosphor="TrendUpIcon"
                remixicon="RiArrowUpLine"
              ></svg>
              +4.5%
            </span>
          </div>
        </div>
        <div kuiCardFooter [sx]="styles.cardFooter4">
          <div [sx]="styles.div8">
            Steady performance increase{{ " " }}
            <svg
              iconPlaceholder
              lucide="TrendingUpIcon"
              tabler="IconTrendingUp"
              hugeicons="ChartUpIcon"
              phosphor="TrendUpIcon"
              remixicon="RiArrowUpLine"
              [sx]="styles.iconPlaceholder4"
            ></svg>
          </div>
          <div [sx]="styles.div9">Meets growth projections</div>
        </div>
      </div>
    </div>
  `,
})
export class SectionCards {
  protected readonly styles = styles
}
