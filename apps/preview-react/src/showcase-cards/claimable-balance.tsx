import { Badge } from "@workspace/registry/bases/react-base/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/registry/bases/react-base/ui/card"
import { Item, ItemContent } from "@workspace/registry/bases/react-base/ui/item"
import { Separator } from "@workspace/registry/bases/react-base/ui/separator"
import { css } from "@kirana-style/core"
import { axes } from "@workspace/registry/core/axes"
import { theme } from "@workspace/registry/core/tokens"
import {
  color,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"

const styles = {
  cardTitle: css({
    fontSize: { "*": null, base: fontSize["4xl"] },
    fontVariantNumeric: { "*": null, base: "tabular-nums" },
    // The card's size sets the line height where the style's own comes with its size.
    lineHeight: {
      [axes.style.maia]: lineHeight["4xl"],
      [axes.style.lyra]: lineHeight["4xl"],
      [axes.style.mira]: lineHeight["4xl"],
      [axes.style.luma]: lineHeight["4xl"],
      [axes.style.rhea]: lineHeight["4xl"],
      [axes.style.sera]: lineHeight["4xl"],
    },
  }),
  span: css({
    width: space[2],
    height: space[2],
    borderRadius: "calc(infinity * 1px)",
    backgroundColor: color.yellow[500],
  }),
  cardContent: css({
    display: { "*": null, base: "flex" },
    flex: "1 1 0%",
    flexDirection: { "*": null, base: "column" },
    justifyContent: { "*": null, base: "flex-end" },
  }),
  item: css({
    flexDirection: { "*": null, base: "column" },
    alignItems: { "*": null, base: "stretch" },
  }),
  itemContent: css({
    gap: { "*": null, base: space[3] },
  }),
  div: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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
  div2: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  span4: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  span5: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    fontVariantNumeric: "tabular-nums",
  }),
  div3: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  span6: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  span7: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  }),
}

const netRoyalties = 1248.75
const processingFee = 37.46
const totalClaimable = netRoyalties - processingFee

const formatCurrency = (amount: number) =>
  amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

export function ClaimableBalance() {
  return (
    <Card>
      <CardHeader>
        <CardDescription>Claimable Balance</CardDescription>
        <CardTitle sx={styles.cardTitle}>
          ${formatCurrency(totalClaimable)}
        </CardTitle>
        <Badge variant="outline">
          <span sx={styles.span} />
          Pending Setup
        </Badge>
      </CardHeader>
      <CardContent sx={styles.cardContent}>
        <Item variant="muted" sx={styles.item}>
          <ItemContent sx={styles.itemContent}>
            <div sx={styles.div}>
              <span sx={styles.span2}>Net Royalties</span>
              <span sx={styles.span3}>${formatCurrency(netRoyalties)}</span>
            </div>
            <div sx={styles.div2}>
              <span sx={styles.span4}>Processing Fee</span>
              <span sx={styles.span5}>-${formatCurrency(processingFee)}</span>
            </div>
            <Separator />
            <div sx={styles.div3}>
              <span sx={styles.span6}>Total Ready to Claim</span>
              <span sx={styles.span7}>
                ${formatCurrency(totalClaimable)} USD
              </span>
            </div>
          </ItemContent>
        </Item>
      </CardContent>
      <CardFooter>
        <CardDescription>
          Once your bank is connected, balances over $10.00 are automatically
          eligible for monthly distribution on the 15th of each month.
        </CardDescription>
      </CardFooter>
    </Card>
  )
}
