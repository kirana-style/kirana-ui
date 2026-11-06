import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radius, theme } from "../../../../../core/tokens"
import {
  color,
  fontSize,
  fontWeight,
  lineHeight,
  space,
} from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu"
import { Table, TableBody, TableCell, TableRow } from "../../../ui/table"

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

@Component({
  selector: "kui-recent-transactions",
  imports: [
    Button,
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Table,
    TableBody,
    TableCell,
    TableRow,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Recent Transactions</div>
        <div kuiCardDescription>Your latest account activity.</div>
        <div kuiCardAction>
          <button kuiButton variant="outline" size="sm">View All</button>
        </div>
      </div>
      <div kuiCardContent>
        <div kuiTable>
          <tbody kuiTableBody>
            <tr kuiTableRow>
              <td kuiTableCell [sx]="styles.tableCell">
                <div [sx]="styles.div">
                  <svg
                    iconPlaceholder
                    [sx]="styles.iconPlaceholder"
                    lucide="CoffeeIcon"
                    tabler="IconCoffee"
                    hugeicons="CoffeeIcon"
                    phosphor="CoffeeIcon"
                    remixicon="RiCupLine"
                  ></svg>
                </div>
              </td>
              <td kuiTableCell>
                <div [sx]="styles.div2">
                  <span [sx]="styles.span">Blue Bottle Coffee</span>
                  <span [sx]="styles.span2">Food & Drink</span>
                </div>
              </td>
              <td kuiTableCell [sx]="styles.tableCell2">Today, 10:24 AM</td>
              <td kuiTableCell [sx]="styles.tableCell3">
                <span [sx]="styles.span3">-$6.50</span>
              </td>
              <td kuiTableCell [sx]="styles.tableCell4">
                <ng-container kuiDropdownMenu>
                  <button
                    kuiButton
                    kuiDropdownMenuTrigger
                    variant="ghost"
                    size="icon-sm"
                  >
                    <svg
                      iconPlaceholder
                      lucide="MoreHorizontalIcon"
                      tabler="IconDotsVertical"
                      hugeicons="MoreVerticalCircle01Icon"
                      phosphor="DotsThreeIcon"
                      remixicon="RiMore2Line"
                    ></svg>
                  </button>
                  <div kuiDropdownMenuContent align="end">
                    <div kuiDropdownMenuItem>View details</div>
                    <div kuiDropdownMenuItem>Add note</div>
                    <div kuiDropdownMenuItem>Categorize</div>
                    <div kuiDropdownMenuSeparator></div>
                    <div kuiDropdownMenuItem>Dispute</div>
                  </div>
                </ng-container>
              </td>
            </tr>
            <tr kuiTableRow>
              <td kuiTableCell [sx]="styles.tableCell5">
                <div [sx]="styles.div3">
                  <svg
                    iconPlaceholder
                    [sx]="styles.iconPlaceholder2"
                    lucide="ShoppingCartIcon"
                    tabler="IconShoppingCart"
                    hugeicons="ShoppingCart01Icon"
                    phosphor="ShoppingCartIcon"
                    remixicon="RiShoppingCartLine"
                  ></svg>
                </div>
              </td>
              <td kuiTableCell>
                <div [sx]="styles.div4">
                  <span [sx]="styles.span4">Whole Foods Market</span>
                  <span [sx]="styles.span5">Groceries</span>
                </div>
              </td>
              <td kuiTableCell [sx]="styles.tableCell6">Yesterday</td>
              <td kuiTableCell [sx]="styles.tableCell7">
                <span [sx]="styles.span6">-$142.30</span>
              </td>
              <td kuiTableCell [sx]="styles.tableCell8">
                <ng-container kuiDropdownMenu>
                  <button
                    kuiButton
                    kuiDropdownMenuTrigger
                    variant="ghost"
                    size="icon-sm"
                  >
                    <svg
                      iconPlaceholder
                      lucide="MoreHorizontalIcon"
                      tabler="IconDotsVertical"
                      hugeicons="MoreVerticalCircle01Icon"
                      phosphor="DotsThreeIcon"
                      remixicon="RiMore2Line"
                    ></svg>
                  </button>
                  <div kuiDropdownMenuContent align="end">
                    <div kuiDropdownMenuItem>View details</div>
                    <div kuiDropdownMenuItem>Add note</div>
                    <div kuiDropdownMenuItem>Categorize</div>
                    <div kuiDropdownMenuSeparator></div>
                    <div kuiDropdownMenuItem>Dispute</div>
                  </div>
                </ng-container>
              </td>
            </tr>
            <tr kuiTableRow>
              <td kuiTableCell [sx]="styles.tableCell9">
                <div [sx]="styles.div5">
                  <svg
                    iconPlaceholder
                    [sx]="styles.iconPlaceholder3"
                    lucide="WalletIcon"
                    tabler="IconWallet"
                    hugeicons="Wallet01Icon"
                    phosphor="WalletIcon"
                    remixicon="RiWalletLine"
                  ></svg>
                </div>
              </td>
              <td kuiTableCell>
                <div [sx]="styles.div6">
                  <span [sx]="styles.span7">Stripe Payout</span>
                  <span [sx]="styles.span8">Income</span>
                </div>
              </td>
              <td kuiTableCell [sx]="styles.tableCell10">Oct 12</td>
              <td kuiTableCell [sx]="styles.tableCell11">
                <span [sx]="styles.span9">+$4,200.00</span>
              </td>
              <td kuiTableCell [sx]="styles.tableCell12">
                <ng-container kuiDropdownMenu>
                  <button
                    kuiButton
                    kuiDropdownMenuTrigger
                    variant="ghost"
                    size="icon-sm"
                  >
                    <svg
                      iconPlaceholder
                      lucide="MoreHorizontalIcon"
                      tabler="IconDotsVertical"
                      hugeicons="MoreVerticalCircle01Icon"
                      phosphor="DotsThreeIcon"
                      remixicon="RiMore2Line"
                    ></svg>
                  </button>
                  <div kuiDropdownMenuContent align="end">
                    <div kuiDropdownMenuItem>View details</div>
                    <div kuiDropdownMenuItem>Add note</div>
                    <div kuiDropdownMenuItem>Categorize</div>
                    <div kuiDropdownMenuSeparator></div>
                    <div kuiDropdownMenuItem>Dispute</div>
                  </div>
                </ng-container>
              </td>
            </tr>
            <tr kuiTableRow>
              <td kuiTableCell [sx]="styles.tableCell13">
                <div [sx]="styles.div7">
                  <svg
                    iconPlaceholder
                    [sx]="styles.iconPlaceholder4"
                    lucide="CarIcon"
                    tabler="IconCar"
                    hugeicons="Car01Icon"
                    phosphor="CarIcon"
                    remixicon="RiCarLine"
                  ></svg>
                </div>
              </td>
              <td kuiTableCell>
                <div [sx]="styles.div8">
                  <span [sx]="styles.span10">Uber Technologies</span>
                  <span [sx]="styles.span11">Transport</span>
                </div>
              </td>
              <td kuiTableCell [sx]="styles.tableCell14">Oct 11</td>
              <td kuiTableCell [sx]="styles.tableCell15">
                <span [sx]="styles.span12">-$24.10</span>
              </td>
              <td kuiTableCell [sx]="styles.tableCell16">
                <ng-container kuiDropdownMenu>
                  <button
                    kuiButton
                    kuiDropdownMenuTrigger
                    variant="ghost"
                    size="icon-sm"
                  >
                    <svg
                      iconPlaceholder
                      lucide="MoreHorizontalIcon"
                      tabler="IconDotsVertical"
                      hugeicons="MoreVerticalCircle01Icon"
                      phosphor="DotsThreeIcon"
                      remixicon="RiMore2Line"
                    ></svg>
                  </button>
                  <div kuiDropdownMenuContent align="end">
                    <div kuiDropdownMenuItem>View details</div>
                    <div kuiDropdownMenuItem>Add note</div>
                    <div kuiDropdownMenuItem>Categorize</div>
                    <div kuiDropdownMenuSeparator></div>
                    <div kuiDropdownMenuItem>Dispute</div>
                  </div>
                </ng-container>
              </td>
            </tr>
            <tr kuiTableRow>
              <td kuiTableCell [sx]="styles.tableCell17">
                <div [sx]="styles.div9">
                  <svg
                    iconPlaceholder
                    [sx]="styles.iconPlaceholder5"
                    lucide="TvIcon"
                    tabler="IconDeviceTv"
                    hugeicons="Tv01Icon"
                    phosphor="TelevisionIcon"
                    remixicon="RiTvLine"
                  ></svg>
                </div>
              </td>
              <td kuiTableCell>
                <div [sx]="styles.div10">
                  <span [sx]="styles.span13">Netflix Subscription</span>
                  <span [sx]="styles.span14">Entertainment</span>
                </div>
              </td>
              <td kuiTableCell [sx]="styles.tableCell18">Oct 10</td>
              <td kuiTableCell [sx]="styles.tableCell19">
                <span [sx]="styles.span15">-$19.99</span>
              </td>
              <td kuiTableCell [sx]="styles.tableCell20">
                <ng-container kuiDropdownMenu>
                  <button
                    kuiButton
                    kuiDropdownMenuTrigger
                    variant="ghost"
                    size="icon-sm"
                  >
                    <svg
                      iconPlaceholder
                      lucide="MoreHorizontalIcon"
                      tabler="IconDotsVertical"
                      hugeicons="MoreVerticalCircle01Icon"
                      phosphor="DotsThreeIcon"
                      remixicon="RiMore2Line"
                    ></svg>
                  </button>
                  <div kuiDropdownMenuContent align="end">
                    <div kuiDropdownMenuItem>View details</div>
                    <div kuiDropdownMenuItem>Add note</div>
                    <div kuiDropdownMenuItem>Categorize</div>
                    <div kuiDropdownMenuSeparator></div>
                    <div kuiDropdownMenuItem>Dispute</div>
                  </div>
                </ng-container>
              </td>
            </tr>
          </tbody>
        </div>
      </div>
    </div>
  `,
})
export class RecentTransactions {
  protected readonly styles = styles
}
