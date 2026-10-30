"use client"

import { Button } from "../../../ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table"
import { IconPlaceholder } from "../../../../../icons/icon-placeholder"
import { css, props as styleProps } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import {
  color,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../../core/scales"

const styles = {
  tableCell: css({
    width: { "*": null, base: space[10] },
  }),
  div: css({
    display: "flex",
    width: space[10],
    height: space[10],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,
    backgroundColor: theme.muted,
  }),
  iconPlaceholder: css({
    width: space[4],
    height: space[4],
    flexShrink: "0",
  }),
  div2: css({
    display: "flex",
    flexDirection: "column",
  }),
  span: css({
    fontWeight: fontWeight.medium,
  }),
  span2: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  tableCell2: css({
    fontSize: { "*": null, base: fontSize.sm },
    lineHeight: { "*": null, base: lineHeight.sm },
    color: theme.mutedForeground,
  }),
  tableCell3: css({
    textAlign: { "*": null, base: "right" },
  }),
  span3: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  }),
  tableCell4: css({
    width: { "*": null, base: space[8] },
  }),
  tableCell5: css({
    width: { "*": null, base: space[10] },
  }),
  div3: css({
    display: "flex",
    width: space[10],
    height: space[10],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,
    backgroundColor: theme.muted,
  }),
  iconPlaceholder2: css({
    width: space[4],
    height: space[4],
    flexShrink: "0",
  }),
  div4: css({
    display: "flex",
    flexDirection: "column",
  }),
  span4: css({
    fontWeight: fontWeight.medium,
  }),
  span5: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  tableCell6: css({
    fontSize: { "*": null, base: fontSize.sm },
    lineHeight: { "*": null, base: lineHeight.sm },
    color: theme.mutedForeground,
  }),
  tableCell7: css({
    textAlign: { "*": null, base: "right" },
  }),
  span6: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  }),
  tableCell8: css({
    width: { "*": null, base: space[8] },
  }),
  tableCell9: css({
    width: { "*": null, base: space[10] },
  }),
  div5: css({
    display: "flex",
    width: space[10],
    height: space[10],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,
    backgroundColor: theme.muted,
  }),
  iconPlaceholder3: css({
    width: space[4],
    height: space[4],
    flexShrink: "0",
  }),
  div6: css({
    display: "flex",
    flexDirection: "column",
  }),
  span7: css({
    fontWeight: fontWeight.medium,
  }),
  span8: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  tableCell10: css({
    fontSize: { "*": null, base: fontSize.sm },
    lineHeight: { "*": null, base: lineHeight.sm },
    color: theme.mutedForeground,
  }),
  tableCell11: css({
    textAlign: { "*": null, base: "right" },
  }),
  span9: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
    color: color.emerald[500],
    fontVariantNumeric: "tabular-nums",
  }),
  tableCell12: css({
    width: { "*": null, base: space[8] },
  }),
  tableCell13: css({
    width: { "*": null, base: space[10] },
  }),
  div7: css({
    display: "flex",
    width: space[10],
    height: space[10],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,
    backgroundColor: theme.muted,
  }),
  iconPlaceholder4: css({
    width: space[4],
    height: space[4],
    flexShrink: "0",
  }),
  div8: css({
    display: "flex",
    flexDirection: "column",
  }),
  span10: css({
    fontWeight: fontWeight.medium,
  }),
  span11: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  tableCell14: css({
    fontSize: { "*": null, base: fontSize.sm },
    lineHeight: { "*": null, base: lineHeight.sm },
    color: theme.mutedForeground,
  }),
  tableCell15: css({
    textAlign: { "*": null, base: "right" },
  }),
  span12: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  }),
  tableCell16: css({
    width: { "*": null, base: space[8] },
  }),
  tableCell17: css({
    width: { "*": null, base: space[10] },
  }),
  div9: css({
    display: "flex",
    width: space[10],
    height: space[10],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,
    backgroundColor: theme.muted,
  }),
  iconPlaceholder5: css({
    width: space[4],
    height: space[4],
    flexShrink: "0",
  }),
  div10: css({
    display: "flex",
    flexDirection: "column",
  }),
  span13: css({
    fontWeight: fontWeight.medium,
  }),
  span14: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  tableCell18: css({
    fontSize: { "*": null, base: fontSize.sm },
    lineHeight: { "*": null, base: lineHeight.sm },
    color: theme.mutedForeground,
  }),
  tableCell19: css({
    textAlign: { "*": null, base: "right" },
  }),
  span15: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  }),
  tableCell20: css({
    width: { "*": null, base: space[8] },
  }),
}

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest account activity.</CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableHead />
            <TableHead isRowHeader>Merchant</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead />
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell sx={styles.tableCell}>
                <div sx={styles.div}>
                  <IconPlaceholder
                    {...styleProps(styles.iconPlaceholder)}
                    lucide="CoffeeIcon"
                    tabler="IconCoffee"
                    hugeicons="CoffeeIcon"
                    phosphor="CoffeeIcon"
                    remixicon="RiCupLine"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div sx={styles.div2}>
                  <span sx={styles.span}>Blue Bottle Coffee</span>
                  <span sx={styles.span2}>Food & Drink</span>
                </div>
              </TableCell>
              <TableCell sx={styles.tableCell2}>Today, 10:24 AM</TableCell>
              <TableCell sx={styles.tableCell3}>
                <span sx={styles.span3}>-$6.50</span>
              </TableCell>
              <TableCell sx={styles.tableCell4}>
                <DropdownMenuTrigger>
                  <Button variant="ghost" size="icon-sm">
                    <IconPlaceholder
                      lucide="MoreHorizontalIcon"
                      tabler="IconDotsVertical"
                      hugeicons="MoreVerticalCircle01Icon"
                      phosphor="DotsThreeIcon"
                      remixicon="RiMore2Line"
                    />
                  </Button>
                  <DropdownMenu placement="bottom end">
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Add note</DropdownMenuItem>
                    <DropdownMenuItem>Categorize</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Dispute</DropdownMenuItem>
                  </DropdownMenu>
                </DropdownMenuTrigger>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={styles.tableCell5}>
                <div sx={styles.div3}>
                  <IconPlaceholder
                    {...styleProps(styles.iconPlaceholder2)}
                    lucide="ShoppingCartIcon"
                    tabler="IconShoppingCart"
                    hugeicons="ShoppingCart01Icon"
                    phosphor="ShoppingCartIcon"
                    remixicon="RiShoppingCartLine"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div sx={styles.div4}>
                  <span sx={styles.span4}>Whole Foods Market</span>
                  <span sx={styles.span5}>Groceries</span>
                </div>
              </TableCell>
              <TableCell sx={styles.tableCell6}>Yesterday</TableCell>
              <TableCell sx={styles.tableCell7}>
                <span sx={styles.span6}>-$142.30</span>
              </TableCell>
              <TableCell sx={styles.tableCell8}>
                <DropdownMenuTrigger>
                  <Button variant="ghost" size="icon-sm">
                    <IconPlaceholder
                      lucide="MoreHorizontalIcon"
                      tabler="IconDotsVertical"
                      hugeicons="MoreVerticalCircle01Icon"
                      phosphor="DotsThreeIcon"
                      remixicon="RiMore2Line"
                    />
                  </Button>
                  <DropdownMenu placement="bottom end">
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Add note</DropdownMenuItem>
                    <DropdownMenuItem>Categorize</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Dispute</DropdownMenuItem>
                  </DropdownMenu>
                </DropdownMenuTrigger>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={styles.tableCell9}>
                <div sx={styles.div5}>
                  <IconPlaceholder
                    {...styleProps(styles.iconPlaceholder3)}
                    lucide="WalletIcon"
                    tabler="IconWallet"
                    hugeicons="Wallet01Icon"
                    phosphor="WalletIcon"
                    remixicon="RiWalletLine"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div sx={styles.div6}>
                  <span sx={styles.span7}>Stripe Payout</span>
                  <span sx={styles.span8}>Income</span>
                </div>
              </TableCell>
              <TableCell sx={styles.tableCell10}>Oct 12</TableCell>
              <TableCell sx={styles.tableCell11}>
                <span sx={styles.span9}>+$4,200.00</span>
              </TableCell>
              <TableCell sx={styles.tableCell12}>
                <DropdownMenuTrigger>
                  <Button variant="ghost" size="icon-sm">
                    <IconPlaceholder
                      lucide="MoreHorizontalIcon"
                      tabler="IconDotsVertical"
                      hugeicons="MoreVerticalCircle01Icon"
                      phosphor="DotsThreeIcon"
                      remixicon="RiMore2Line"
                    />
                  </Button>
                  <DropdownMenu placement="bottom end">
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Add note</DropdownMenuItem>
                    <DropdownMenuItem>Categorize</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Dispute</DropdownMenuItem>
                  </DropdownMenu>
                </DropdownMenuTrigger>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={styles.tableCell13}>
                <div sx={styles.div7}>
                  <IconPlaceholder
                    {...styleProps(styles.iconPlaceholder4)}
                    lucide="CarIcon"
                    tabler="IconCar"
                    hugeicons="Car01Icon"
                    phosphor="CarIcon"
                    remixicon="RiCarLine"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div sx={styles.div8}>
                  <span sx={styles.span10}>Uber Technologies</span>
                  <span sx={styles.span11}>Transport</span>
                </div>
              </TableCell>
              <TableCell sx={styles.tableCell14}>Oct 11</TableCell>
              <TableCell sx={styles.tableCell15}>
                <span sx={styles.span12}>-$24.10</span>
              </TableCell>
              <TableCell sx={styles.tableCell16}>
                <DropdownMenuTrigger>
                  <Button variant="ghost" size="icon-sm">
                    <IconPlaceholder
                      lucide="MoreHorizontalIcon"
                      tabler="IconDotsVertical"
                      hugeicons="MoreVerticalCircle01Icon"
                      phosphor="DotsThreeIcon"
                      remixicon="RiMore2Line"
                    />
                  </Button>
                  <DropdownMenu placement="bottom end">
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Add note</DropdownMenuItem>
                    <DropdownMenuItem>Categorize</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Dispute</DropdownMenuItem>
                  </DropdownMenu>
                </DropdownMenuTrigger>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={styles.tableCell17}>
                <div sx={styles.div9}>
                  <IconPlaceholder
                    {...styleProps(styles.iconPlaceholder5)}
                    lucide="TvIcon"
                    tabler="IconDeviceTv"
                    hugeicons="Tv01Icon"
                    phosphor="TelevisionIcon"
                    remixicon="RiTvLine"
                  />
                </div>
              </TableCell>
              <TableCell>
                <div sx={styles.div10}>
                  <span sx={styles.span13}>Netflix Subscription</span>
                  <span sx={styles.span14}>Entertainment</span>
                </div>
              </TableCell>
              <TableCell sx={styles.tableCell18}>Oct 10</TableCell>
              <TableCell sx={styles.tableCell19}>
                <span sx={styles.span15}>-$19.99</span>
              </TableCell>
              <TableCell sx={styles.tableCell20}>
                <DropdownMenuTrigger>
                  <Button variant="ghost" size="icon-sm">
                    <IconPlaceholder
                      lucide="MoreHorizontalIcon"
                      tabler="IconDotsVertical"
                      hugeicons="MoreVerticalCircle01Icon"
                      phosphor="DotsThreeIcon"
                      remixicon="RiMore2Line"
                    />
                  </Button>
                  <DropdownMenu placement="bottom end">
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Add note</DropdownMenuItem>
                    <DropdownMenuItem>Categorize</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Dispute</DropdownMenuItem>
                  </DropdownMenu>
                </DropdownMenuTrigger>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
