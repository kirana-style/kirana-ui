import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { Badge } from "../../../ui/badge"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../ui/table"

const styles = {
  tableHead: css({
    textAlign: { "*": null, base: "right" },
  }),
  tableHead2: css({
    textAlign: { "*": null, base: "right" },
  }),
  tableHead3: css({
    textAlign: { "*": null, base: "right" },
  }),
  tableCell: css({
    textAlign: { "*": null, base: "right" },
    fontVariantNumeric: { "*": null, base: "tabular-nums" },
  }),
  tableCell2: css({
    textAlign: { "*": null, base: "right" },
    fontVariantNumeric: { "*": null, base: "tabular-nums" },
  }),
  tableCell3: css({
    textAlign: { "*": null, base: "right" },
    fontVariantNumeric: { "*": null, base: "tabular-nums" },
  }),
  tableCell4: css({
    textAlign: { "*": null, base: "right" },
  }),
  tableCell5: css({
    textAlign: { "*": null, base: "right" },
    fontVariantNumeric: { "*": null, base: "tabular-nums" },
  }),
  tableCell6: css({
    textAlign: { "*": null, base: "right" },
  }),
  tableCell7: css({
    textAlign: { "*": null, base: "right" },
    fontVariantNumeric: { "*": null, base: "tabular-nums" },
  }),
  tableCell8: css({
    textAlign: { "*": null, base: "right" },
  }),
  tableCell9: css({
    textAlign: { "*": null, base: "right" },
    fontVariantNumeric: { "*": null, base: "tabular-nums" },
  }),
  button: css({
    marginLeft: { "*": null, base: "auto" },
  }),
}

const INVOICE_ITEMS = [
  { item: "Design System License", qty: 1, unitPrice: 499 },
  { item: "Priority Support", qty: 12, unitPrice: 99 },
  { item: "Custom Components", qty: 3, unitPrice: 250 },
] as const

const subtotal = INVOICE_ITEMS.reduce(
  (sum, row) => sum + row.qty * row.unitPrice,
  0
)

const tax = 0

const totalDue = subtotal + tax

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value)
}

@Component({
  selector: "kui-invoice",
  imports: [
    Badge,
    Button,
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Invoice #INV-2847</div>
        <div kuiCardDescription>Due March 30, 2026</div>
        <div kuiCardAction>
          <span kuiBadge variant="secondary">Pending</span>
        </div>
      </div>
      <div kuiCardContent>
        <div kuiTable>
          <thead kuiTableHeader>
            <tr kuiTableRow>
              <th kuiTableHead>Item</th>
              <th kuiTableHead [sx]="styles.tableHead">Qty</th>
              <th kuiTableHead [sx]="styles.tableHead2">Rate</th>
              <th kuiTableHead [sx]="styles.tableHead3">Amount</th>
            </tr>
          </thead>
          <tbody kuiTableBody>
            @for (row of INVOICE_ITEMS; track row.item) {
              <tr kuiTableRow>
                <td kuiTableCell>{{ row.item }}</td>
                <td kuiTableCell [sx]="styles.tableCell">{{ row.qty }}</td>
                <td kuiTableCell [sx]="styles.tableCell2">
                  {{ formatCurrency(row.unitPrice) }}
                </td>
                <td kuiTableCell [sx]="styles.tableCell3">
                  {{ formatCurrency(row.qty * row.unitPrice) }}
                </td>
              </tr>
            }
            <tr kuiTableRow>
              <td kuiTableCell [attr.colspan]="3" [sx]="styles.tableCell4">
                Subtotal
              </td>
              <td kuiTableCell [sx]="styles.tableCell5">
                {{ formatCurrency(subtotal) }}
              </td>
            </tr>
            <tr kuiTableRow>
              <td kuiTableCell [attr.colspan]="3" [sx]="styles.tableCell6">
                Tax
              </td>
              <td kuiTableCell [sx]="styles.tableCell7">$0.00</td>
            </tr>
            <tr kuiTableRow>
              <td kuiTableCell [attr.colspan]="3" [sx]="styles.tableCell8">
                Total Due
              </td>
              <td kuiTableCell [sx]="styles.tableCell9">
                {{ formatCurrency(totalDue) }}
              </td>
            </tr>
          </tbody>
        </div>
      </div>
      <div kuiCardFooter>
        <button kuiButton variant="outline" size="sm">Download PDF</button>
        <button kuiButton size="sm" [sx]="styles.button">Pay Now</button>
      </div>
    </div>
  `,
})
export class Invoice {
  protected readonly styles = styles
  protected readonly INVOICE_ITEMS = INVOICE_ITEMS
  protected readonly subtotal = subtotal
  protected readonly totalDue = totalDue
  protected readonly formatCurrency = formatCurrency
}
