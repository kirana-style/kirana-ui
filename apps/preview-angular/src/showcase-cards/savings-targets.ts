import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { axes } from "@workspace/registry/core/axes"
import { font, theme } from "@workspace/registry/core/tokens"
import {
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/registry/bases/angular-ng/ui/card"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
} from "@workspace/registry/bases/angular-ng/ui/item"
import { Progress } from "@workspace/registry/bases/angular-ng/ui/progress"

const styles = {
  itemGroup: css({
    gap: { "*": null, base: space[3] },
  }),
  item: css({
    flexDirection: { "*": null, base: "column" },
    alignItems: { "*": null, base: "stretch" },
  }),
  itemContent: css({
    gap: { "*": null, base: space[3] },
  }),
  itemDescription: css({
    fontFamily: { "*": null, base: font.heading },
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
  span: css({
    fontSize: fontSize["3xl"],
    lineHeight: lineHeight["3xl"],
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  }),
  span2: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  span3: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
  }),
  item2: css({
    flexDirection: { "*": null, base: "column" },
    alignItems: { "*": null, base: "stretch" },
  }),
  itemContent2: css({
    gap: { "*": null, base: space[3] },
  }),
  itemDescription2: css({
    fontFamily: { "*": null, base: font.heading },
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
    fontSize: fontSize["3xl"],
    lineHeight: lineHeight["3xl"],
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  }),
  span5: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  span6: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
  }),
  cardDescription: css({
    textAlign: { "*": null, base: "center" },
  }),
}

@Component({
  selector: "kui-savings-targets",
  imports: [
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Item,
    ItemContent,
    ItemDescription,
    ItemFooter,
    ItemGroup,
    Progress,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Savings Targets</div>
        <div kuiCardDescription>
          Active milestones for 2024 across your portfolio. Monitor how close
          you are to each savings goal.
        </div>
      </div>
      <div kuiCardContent>
        <div kuiItemGroup [sx]="styles.itemGroup">
          <div kuiItem role="listitem" variant="muted" [sx]="styles.item">
            <div kuiItemContent [sx]="styles.itemContent">
              <p kuiItemDescription [sx]="styles.itemDescription">Retirement</p>
              <span [sx]="styles.span">$420,000</span>
              <div
                kuiProgress
                [value]="65"
                aria-label="Retirement savings progress"
              ></div>
            </div>
            <div kuiItemFooter>
              <span [sx]="styles.span2">65% achieved</span>
              <span [sx]="styles.span3">$273,000</span>
            </div>
          </div>
          <div kuiItem role="listitem" variant="muted" [sx]="styles.item2">
            <div kuiItemContent [sx]="styles.itemContent2">
              <p kuiItemDescription [sx]="styles.itemDescription2">
                Real Estate
              </p>
              <span [sx]="styles.span4">$85,000</span>
              <div
                kuiProgress
                [value]="32"
                aria-label="Real estate savings progress"
              ></div>
            </div>
            <div kuiItemFooter>
              <span [sx]="styles.span5">32% achieved</span>
              <span [sx]="styles.span6">$27,200</span>
            </div>
          </div>
        </div>
      </div>
      <div kuiCardFooter>
        <div kuiCardDescription [sx]="styles.cardDescription">
          You have not met your targets for this year.
        </div>
      </div>
    </div>
  `,
})
export class SavingsTargets {
  protected readonly styles = styles
}
