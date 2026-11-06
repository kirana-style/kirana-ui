import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css, relation } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { theme } from "../../../../../core/tokens"
import {
  containerSize,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../../core/scales"
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "../../../ui/item"
import { CircularGauge } from "./circular-gauge"

const itemGroupGroup = relation("usage-item-group-angular")

const styles = {
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

@Component({
  selector: "kui-usage-card",
  imports: [
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CircularGauge,
    Item,
    ItemActions,
    ItemContent,
    ItemGroup,
    ItemMedia,
    ItemTitle,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard [sx]="styles.card">
      <div kuiCardHeader>
        <div kuiCardTitle [sx]="styles.cardTitle">
          5 days remaining in cycle
        </div>
      </div>
      <div kuiCardContent>
        <div kuiItemGroup [sx]="styles.itemGroup">
          @for (item of items; track item.name) {
            <a kuiItem size="xs" [sx]="styles.item" href="#">
              <div kuiItemMedia variant="icon" [sx]="styles.itemMedia">
                <kui-circular-gauge [percentage]="item.percentage" />
              </div>
              <div kuiItemContent [sx]="styles.itemContent">
                <div kuiItemTitle [sx]="styles.itemTitle">{{ item.name }}</div>
              </div>
              <div kuiItemActions>
                <span [sx]="styles.span">{{ item.value }}</span>
              </div>
            </a>
          }
        </div>
      </div>
    </div>
  `,
})
export class UsageCard {
  protected readonly styles = styles
  protected readonly items = items
}
