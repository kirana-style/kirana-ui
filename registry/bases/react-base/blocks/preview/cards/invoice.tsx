"use client"

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
import { css } from "@kirana-style/core"

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

export function Invoice() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice #INV-2847</CardTitle>
        <CardDescription>Due March 30, 2026</CardDescription>
        <CardAction>
          <Badge variant="secondary">Pending</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead sx={styles.tableHead}>Qty</TableHead>
              <TableHead sx={styles.tableHead2}>Rate</TableHead>
              <TableHead sx={styles.tableHead3}>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {INVOICE_ITEMS.map((row) => (
              <TableRow key={row.item}>
                <TableCell>{row.item}</TableCell>
                <TableCell sx={styles.tableCell}>{row.qty}</TableCell>
                <TableCell sx={styles.tableCell2}>
                  {formatCurrency(row.unitPrice)}
                </TableCell>
                <TableCell sx={styles.tableCell3}>
                  {formatCurrency(row.qty * row.unitPrice)}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} sx={styles.tableCell4}>
                Subtotal
              </TableCell>
              <TableCell sx={styles.tableCell5}>
                {formatCurrency(subtotal)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} sx={styles.tableCell6}>
                Tax
              </TableCell>
              <TableCell sx={styles.tableCell7}>$0.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} sx={styles.tableCell8}>
                Total Due
              </TableCell>
              <TableCell sx={styles.tableCell9}>
                {formatCurrency(totalDue)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          Download PDF
        </Button>
        <Button size="sm" sx={styles.button}>
          Pay Now
        </Button>
      </CardFooter>
    </Card>
  )
}
