import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { fontWeight } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { DirectionProvider } from "../ui/direction"
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
  tableHead: css({
    width: { "*": null, base: "100px" },
  }),
  tableHead2: css({
    textAlign: { "*": null, base: "right" },
  }),
  tableCell: css({
    fontWeight: { "*": null, base: fontWeight.medium },
  }),
  tableCell2: css({
    textAlign: { "*": null, base: "right" },
  }),
  tableCell3: css({
    textAlign: { "*": null, base: "right" },
  }),
}

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      caption: "A list of your recent invoices.",
      invoice: "Invoice",
      status: "Status",
      method: "Method",
      amount: "Amount",
      paid: "Paid",
      pending: "Pending",
      unpaid: "Unpaid",
      creditCard: "Credit Card",
      paypal: "PayPal",
      bankTransfer: "Bank Transfer",
      total: "Total",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      caption: "قائمة بفواتيرك الأخيرة.",
      invoice: "الفاتورة",
      status: "الحالة",
      method: "الطريقة",
      amount: "المبلغ",
      paid: "مدفوع",
      pending: "قيد الانتظار",
      unpaid: "غير مدفوع",
      creditCard: "بطاقة ائتمانية",
      paypal: "PayPal",
      bankTransfer: "تحويل بنكي",
      total: "المجموع",
    },
  },
  he: {
    dir: "rtl",
    values: {
      caption: "רשימת החשבוניות האחרונות שלך.",
      invoice: "חשבונית",
      status: "סטטוס",
      method: "שיטה",
      amount: "סכום",
      paid: "שולם",
      pending: "ממתין",
      unpaid: "לא שולם",
      creditCard: "כרטיס אשראי",
      paypal: "PayPal",
      bankTransfer: "העברה בנקאית",
      total: 'סה"כ',
    },
  },
}

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "paid" as const,
    totalAmount: "$250.00",
    paymentMethod: "creditCard" as const,
  },
  {
    invoice: "INV002",
    paymentStatus: "pending" as const,
    totalAmount: "$150.00",
    paymentMethod: "paypal" as const,
  },
  {
    invoice: "INV003",
    paymentStatus: "unpaid" as const,
    totalAmount: "$350.00",
    paymentMethod: "bankTransfer" as const,
  },
  {
    invoice: "INV004",
    paymentStatus: "paid" as const,
    totalAmount: "$450.00",
    paymentMethod: "creditCard" as const,
  },
  {
    invoice: "INV005",
    paymentStatus: "paid" as const,
    totalAmount: "$550.00",
    paymentMethod: "paypal" as const,
  },
  {
    invoice: "INV006",
    paymentStatus: "pending" as const,
    totalAmount: "$200.00",
    paymentMethod: "bankTransfer" as const,
  },
  {
    invoice: "INV007",
    paymentStatus: "unpaid" as const,
    totalAmount: "$300.00",
    paymentMethod: "creditCard" as const,
  },
]

@Component({
  selector: "table-rtl",
  imports: [
    DirectionProvider,
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
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div kuiTable [attr.dir]="dir()">
          <caption kuiTableCaption>
            {{
              t().caption
            }}
          </caption>
          <thead kuiTableHeader>
            <tr kuiTableRow>
              <th kuiTableHead [sx]="styles.tableHead">{{ t().invoice }}</th>
              <th kuiTableHead>{{ t().status }}</th>
              <th kuiTableHead>{{ t().method }}</th>
              <th kuiTableHead [sx]="styles.tableHead2">{{ t().amount }}</th>
            </tr>
          </thead>
          <tbody kuiTableBody>
            @for (invoice of invoices; track invoice.invoice) {
              <tr kuiTableRow>
                <td kuiTableCell [sx]="styles.tableCell">
                  {{ invoice.invoice }}
                </td>
                <td kuiTableCell>{{ t()[invoice.paymentStatus] }}</td>
                <td kuiTableCell>{{ t()[invoice.paymentMethod] }}</td>
                <td kuiTableCell [sx]="styles.tableCell2">
                  {{ invoice.totalAmount }}
                </td>
              </tr>
            }
          </tbody>
          <tfoot kuiTableFooter>
            <tr kuiTableRow>
              <td kuiTableCell [attr.colspan]="3">{{ t().total }}</td>
              <td kuiTableCell [sx]="styles.tableCell3">$2,500.00</td>
            </tr>
          </tfoot>
        </div>
      </div>
    </ng-container>
  `,
})
export default class TableRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly invoices = invoices
  protected readonly page = page
}
