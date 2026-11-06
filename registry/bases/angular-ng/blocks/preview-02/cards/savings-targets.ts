import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { font, theme } from "../../../../../core/tokens"
import {
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  space,
} from "../../../../../core/scales"
import { Button } from "../../../ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../../../ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "../../../ui/input-group"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
} from "../../../ui/item"
import { NativeSelect, NativeSelectOption } from "../../../ui/native-select"
import { Progress } from "../../../ui/progress"

const styles = {
  div: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    rowGap: "var(--gap)",
    columnGap: "var(--gap)",
  }),
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
  cardContent: css({
    display: { "*": null, base: "flex" },
    flex: "1 1 0%",
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[3] },
  }),
  fieldGroup: css({
    flex: "1 1 0%",
  }),
  div2: css({
    display: "flex",
    flexDirection: "column",
    gap: space[2],
  }),
  div3: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  span7: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  span8: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  }),
  div4: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  span9: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  span10: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  }),
  cardFooter: css({
    flexDirection: { "*": null, base: "column" },
    gap: { "*": null, base: space[3] },
  }),
  button: css({
    width: { "*": null, base: "100%" },
  }),
  cardDescription2: css({
    textAlign: { "*": null, base: "center" },
  }),
}

@Component({
  selector: "kui-savings-targets",
  imports: [
    Button,
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
    Item,
    ItemContent,
    ItemDescription,
    ItemFooter,
    ItemGroup,
    NativeSelect,
    NativeSelectOption,
    Progress,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div [sx]="styles.div">
      <div kuiCard>
        <div kuiCardHeader>
          <div kuiCardTitle>Savings Targets</div>
          <div kuiCardDescription>Active milestones for 2024</div>
          <div kuiCardAction>
            <button kuiButton variant="outline" size="sm">New Goal</button>
          </div>
        </div>
        <div kuiCardContent>
          <div kuiItemGroup [sx]="styles.itemGroup">
            <div kuiItem variant="muted" [sx]="styles.item">
              <div kuiItemContent [sx]="styles.itemContent">
                <p kuiItemDescription [sx]="styles.itemDescription">
                  Retirement
                </p>
                <span [sx]="styles.span">$420,000</span>
                <div kuiProgress [value]="65"></div>
              </div>
              <div kuiItemFooter>
                <span [sx]="styles.span2">65% achieved</span>
                <span [sx]="styles.span3">$273,000</span>
              </div>
            </div>
            <div kuiItem variant="muted" [sx]="styles.item2">
              <div kuiItemContent [sx]="styles.itemContent2">
                <p kuiItemDescription [sx]="styles.itemDescription2">
                  Real Estate
                </p>
                <span [sx]="styles.span4">$85,000</span>
                <div kuiProgress [value]="32"></div>
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
      <div kuiCard>
        <div kuiCardHeader>
          <div kuiCardTitle>Buy Investment</div>
        </div>
        <div kuiCardContent [sx]="styles.cardContent">
          <div kuiFieldGroup [sx]="styles.fieldGroup">
            <div kuiField>
              <label kuiFieldLabel for="invest-amount">Amount to Invest</label>
              <div kuiInputGroup>
                <div kuiInputGroupAddon>
                  <span kuiInputGroupText>$</span>
                </div>
                <input
                  kuiInputGroupInput
                  id="invest-amount"
                  default-value="1,000.00"
                />
              </div>
            </div>
            <div kuiField>
              <label kuiFieldLabel for="invest-type">Order Type</label>
              <div kuiNativeSelect id="invest-type" value="market">
                <option kuiNativeSelectOption value="market">
                  Market Order
                </option>
                <option kuiNativeSelectOption value="limit">Limit Order</option>
                <option kuiNativeSelectOption value="stop">Stop Order</option>
              </div>
              <p kuiFieldDescription>
                Market orders execute at the current price.
              </p>
            </div>
            <div [sx]="styles.div2">
              <div [sx]="styles.div3">
                <span [sx]="styles.span7">Estimated Shares</span>
                <span [sx]="styles.span8">1.95</span>
              </div>
              <div [sx]="styles.div4">
                <span [sx]="styles.span9">Buying Power</span>
                <span [sx]="styles.span10">$12,450.00</span>
              </div>
            </div>
          </div>
        </div>
        <div kuiCardFooter [sx]="styles.cardFooter">
          <button kuiButton [sx]="styles.button">Review Order</button>
          <div kuiCardDescription [sx]="styles.cardDescription2">
            Trades are typically executed within minutes during market hours.
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SavingsTargets {
  protected readonly styles = styles
}
