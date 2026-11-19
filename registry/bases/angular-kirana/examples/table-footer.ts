import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontWeight } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

const styles = {
  invoice: css({ width: "100px" }),
  end: css({ textAlign: "right" }),
  medium: css({ fontWeight: fontWeight.medium }),
}

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

@Component({
  selector: "table-footer",
  imports: [
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiTable>
        <caption kuiTableCaption>
          A list of your recent invoices.
        </caption>
        <thead kuiTableHeader>
          <tr kuiTableRow>
            <th kuiTableHead [sx]="styles.invoice">Invoice</th>
            <th kuiTableHead>Status</th>
            <th kuiTableHead>Method</th>
            <th kuiTableHead [sx]="styles.end">Amount</th>
          </tr>
        </thead>
        <tbody kuiTableBody>
          @for (invoice of invoices.slice(0, 3); track invoice.invoice) {
            <tr kuiTableRow>
              <td kuiTableCell [sx]="styles.medium">{{ invoice.invoice }}</td>
              <td kuiTableCell>{{ invoice.paymentStatus }}</td>
              <td kuiTableCell>{{ invoice.paymentMethod }}</td>
              <td kuiTableCell [sx]="styles.end">{{ invoice.totalAmount }}</td>
            </tr>
          }
        </tbody>
        <tfoot kuiTableFooter>
          <tr kuiTableRow>
            <td kuiTableCell [attr.colspan]="3">Total</td>
            <td kuiTableCell [sx]="styles.end">$2,500.00</td>
          </tr>
        </tfoot>
      </div>
    </div>
  `,
})
export default class TableFooterExample {
  protected readonly styles = styles
  protected readonly invoices = invoices
  protected readonly page = page
}
