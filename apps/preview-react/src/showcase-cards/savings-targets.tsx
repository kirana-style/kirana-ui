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
  ItemFooter,
  ItemGroup,
} from "@workspace/registry/bases/react-base/ui/item"
import { Progress } from "@workspace/registry/bases/react-base/ui/progress"
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

export function SavingsTargets() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Targets</CardTitle>
        <CardDescription>
          Active milestones for 2024 across your portfolio. Monitor how close
          you are to each savings goal.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ItemGroup sx={styles.itemGroup}>
          <Item role="listitem" variant="muted" sx={styles.item}>
            <ItemContent sx={styles.itemContent}>
              <ItemDescription sx={styles.itemDescription}>
                Retirement
              </ItemDescription>
              <span sx={styles.span}>$420,000</span>
              <Progress value={65} aria-label="Retirement savings progress" />
            </ItemContent>
            <ItemFooter>
              <span sx={styles.span2}>65% achieved</span>
              <span sx={styles.span3}>$273,000</span>
            </ItemFooter>
          </Item>
          <Item role="listitem" variant="muted" sx={styles.item2}>
            <ItemContent sx={styles.itemContent2}>
              <ItemDescription sx={styles.itemDescription2}>
                Real Estate
              </ItemDescription>
              <span sx={styles.span4}>$85,000</span>
              <Progress value={32} aria-label="Real estate savings progress" />
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
  )
}
