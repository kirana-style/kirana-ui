import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
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
import { css } from "@kirana-style/core"
import { fontWeight } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

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

export default function TableRtl() {
  const { dir, t } = useTranslation(translations, "ar")

  return (
    <div sx={page.example}>
      <Table dir={dir}>
        <TableCaption>{t.caption}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead sx={styles.tableHead}>{t.invoice}</TableHead>
            <TableHead>{t.status}</TableHead>
            <TableHead>{t.method}</TableHead>
            <TableHead sx={styles.tableHead2}>{t.amount}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell sx={styles.tableCell}>{invoice.invoice}</TableCell>
              <TableCell>{t[invoice.paymentStatus]}</TableCell>
              <TableCell>{t[invoice.paymentMethod]}</TableCell>
              <TableCell sx={styles.tableCell2}>
                {invoice.totalAmount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>{t.total}</TableCell>
            <TableCell sx={styles.tableCell3}>$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
