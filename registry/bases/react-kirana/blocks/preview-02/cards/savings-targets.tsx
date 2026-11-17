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

export function SavingsTargets() {
  return (
    <div sx={styles.div}>
      <Card>
        <CardHeader>
          <CardTitle>Savings Targets</CardTitle>
          <CardDescription>Active milestones for 2024</CardDescription>
          <CardAction>
            <Button variant="outline" size="sm">
              New Goal
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <ItemGroup sx={styles.itemGroup}>
            <Item variant="muted" sx={styles.item}>
              <ItemContent sx={styles.itemContent}>
                <ItemDescription sx={styles.itemDescription}>
                  Retirement
                </ItemDescription>
                <span sx={styles.span}>$420,000</span>
                <Progress value={65} />
              </ItemContent>
              <ItemFooter>
                <span sx={styles.span2}>65% achieved</span>
                <span sx={styles.span3}>$273,000</span>
              </ItemFooter>
            </Item>
            <Item variant="muted" sx={styles.item2}>
              <ItemContent sx={styles.itemContent2}>
                <ItemDescription sx={styles.itemDescription2}>
                  Real Estate
                </ItemDescription>
                <span sx={styles.span4}>$85,000</span>
                <Progress value={32} />
              </ItemContent>
              <ItemFooter>
                <span sx={styles.span5}>32% achieved</span>
                <span sx={styles.span6}>$27,200</span>
              </ItemFooter>
            </Item>
          </ItemGroup>
        </CardContent>
        <CardFooter>
          <CardDescription sx={styles.cardDescription}>
            You have not met your targets for this year.
          </CardDescription>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Buy Investment</CardTitle>
        </CardHeader>
        <CardContent sx={styles.cardContent}>
          <FieldGroup sx={styles.fieldGroup}>
            <Field>
              <FieldLabel htmlFor="invest-amount">Amount to Invest</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>$</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput id="invest-amount" defaultValue="1,000.00" />
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="invest-type">Order Type</FieldLabel>
              <NativeSelect id="invest-type" defaultValue="market">
                <NativeSelectOption value="market">
                  Market Order
                </NativeSelectOption>
                <NativeSelectOption value="limit">
                  Limit Order
                </NativeSelectOption>
                <NativeSelectOption value="stop">Stop Order</NativeSelectOption>
              </NativeSelect>
              <FieldDescription>
                Market orders execute at the current price.
              </FieldDescription>
            </Field>
            <div sx={styles.div2}>
              <div sx={styles.div3}>
                <span sx={styles.span7}>Estimated Shares</span>
                <span sx={styles.span8}>1.95</span>
              </div>
              <div sx={styles.div4}>
                <span sx={styles.span9}>Buying Power</span>
                <span sx={styles.span10}>$12,450.00</span>
              </div>
            </div>
          </FieldGroup>
        </CardContent>
        <CardFooter sx={styles.cardFooter}>
          <Button sx={styles.button}>Review Order</Button>
          <CardDescription sx={styles.cardDescription2}>
            Trades are typically executed within minutes during market hours.
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  )
}
