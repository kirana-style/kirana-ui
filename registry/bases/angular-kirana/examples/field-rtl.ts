import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useTranslation } from "../components/language-selector"
import type { Translations } from "../components/language-selector"
import { css } from "@kirana-style/core"
import { containerSize, fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { DirectionProvider } from "../ui/direction"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "../ui/field"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Textarea } from "../ui/textarea"

const styles = {
  div: css({
    width: "100%",
    maxWidth: containerSize.md,
    paddingBlock: space[6],
  }),
  div2: css({
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: space[4],
  }),
  fieldLabel: css({
    fontWeight: { "*": null, base: fontWeight.normal },
  }),
  textarea: css({
    resize: { "*": null, base: "none" },
  }),
}

const months = [
  { label: "MM", value: null },
  { label: "01", value: "01" },
  { label: "02", value: "02" },
  { label: "03", value: "03" },
  { label: "04", value: "04" },
  { label: "05", value: "05" },
  { label: "06", value: "06" },
  { label: "07", value: "07" },
  { label: "08", value: "08" },
  { label: "09", value: "09" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
]

const years = [
  { label: "YYYY", value: null },
  { label: "2024", value: "2024" },
  { label: "2025", value: "2025" },
  { label: "2026", value: "2026" },
  { label: "2027", value: "2027" },
  { label: "2028", value: "2028" },
  { label: "2029", value: "2029" },
]

const translations: Translations = {
  en: {
    dir: "ltr",
    values: {
      paymentMethod: "Payment Method",
      secureTransactions: "All transactions are secure and encrypted",
      nameOnCard: "Name on Card",
      cardNumber: "Card Number",
      cardNumberDescription: "Enter your 16-digit card number",
      month: "Month",
      year: "Year",
      cvv: "CVV",
      monthPlaceholder: "MM",
      month01: "01",
      month02: "02",
      month03: "03",
      month04: "04",
      month05: "05",
      month06: "06",
      month07: "07",
      month08: "08",
      month09: "09",
      month10: "10",
      month11: "11",
      month12: "12",
      billingAddress: "Billing Address",
      billingAddressDescription:
        "The billing address associated with your payment method",
      sameAsShipping: "Same as shipping address",
      comments: "Comments",
      commentsPlaceholder: "Add any additional comments",
      submit: "Submit",
      cancel: "Cancel",
    },
  },
  ar: {
    dir: "rtl",
    values: {
      paymentMethod: "طريقة الدفع",
      secureTransactions: "جميع المعاملات آمنة ومشفرة",
      nameOnCard: "الاسم على البطاقة",
      cardNumber: "رقم البطاقة",
      cardNumberDescription: "أدخل رقم البطاقة المكون من 16 رقمًا",
      month: "الشهر",
      year: "السنة",
      cvv: "CVV",
      monthPlaceholder: "ش.ش",
      month01: "٠١",
      month02: "٠٢",
      month03: "٠٣",
      month04: "٠٤",
      month05: "٠٥",
      month06: "٠٦",
      month07: "٠٧",
      month08: "٠٨",
      month09: "٠٩",
      month10: "١٠",
      month11: "١١",
      month12: "١٢",
      billingAddress: "عنوان الفوترة",
      billingAddressDescription: "عنوان الفوترة المرتبط بطريقة الدفع الخاصة بك",
      sameAsShipping: "نفس عنوان الشحن",
      comments: "تعليقات",
      commentsPlaceholder: "أضف أي تعليقات إضافية",
      submit: "إرسال",
      cancel: "إلغاء",
    },
  },
  he: {
    dir: "rtl",
    values: {
      paymentMethod: "אמצעי תשלום",
      secureTransactions: "כל העסקאות מאובטחות ומוצפנות",
      nameOnCard: "שם על הכרטיס",
      cardNumber: "מספר כרטיס",
      cardNumberDescription: "הזן את מספר הכרטיס בן 16 הספרות שלך",
      month: "חודש",
      year: "שנה",
      cvv: "CVV",
      monthPlaceholder: "MM",
      month01: "01",
      month02: "02",
      month03: "03",
      month04: "04",
      month05: "05",
      month06: "06",
      month07: "07",
      month08: "08",
      month09: "09",
      month10: "10",
      month11: "11",
      month12: "12",
      billingAddress: "כתובת חיוב",
      billingAddressDescription: "כתובת החיוב המשויכת לאמצעי התשלום שלך",
      sameAsShipping: "זהה לכתובת המשלוח",
      comments: "הערות",
      commentsPlaceholder: "הוסף הערות נוספות",
      submit: "שלח",
      cancel: "בטל",
    },
  },
}

@Component({
  selector: "field-rtl",
  imports: [
    Button,
    Checkbox,
    DirectionProvider,
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    Input,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Textarea,
    SxDirective,
  ],
  template: `
    <ng-container kuiDirectionProvider [direction]="dir()">
      <div [sx]="page.example">
        <div [sx]="styles.div" [attr.dir]="dir()">
          <form>
            <div kuiFieldGroup>
              <fieldset kuiFieldSet>
                <legend kuiFieldLegend>{{ t().paymentMethod }}</legend>
                <p kuiFieldDescription>{{ t().secureTransactions }}</p>
                <div kuiFieldGroup>
                  <div kuiField>
                    <label kuiFieldLabel for="checkout-7j9-card-name-43j-rtl">{{
                      t().nameOnCard
                    }}</label>
                    <input
                      kuiInput
                      id="checkout-7j9-card-name-43j-rtl"
                      placeholder="Evil Rabbit"
                      required
                    />
                  </div>
                  <div kuiField>
                    <label
                      kuiFieldLabel
                      for="checkout-7j9-card-number-uw1-rtl"
                      >{{ t().cardNumber }}</label
                    >
                    <input
                      kuiInput
                      id="checkout-7j9-card-number-uw1-rtl"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                    <p kuiFieldDescription>{{ t().cardNumberDescription }}</p>
                  </div>
                  <div [sx]="styles.div2">
                    <div kuiField>
                      <label kuiFieldLabel for="checkout-exp-month-ts6-rtl">{{
                        t().month
                      }}</label>
                      <ng-container kuiSelect [items]="months">
                        <button
                          kuiSelectTrigger
                          id="checkout-exp-month-ts6-rtl"
                        >
                          <span kuiSelectValue></span>
                        </button>
                        <div kuiSelectContent [attr.dir]="dir()">
                          <div kuiSelectGroup>
                            @for (item of months; track item.label) {
                              <div kuiSelectItem [value]="item.value">
                                {{ getMonthLabel(item.value) }}
                              </div>
                            }
                          </div>
                        </div>
                      </ng-container>
                    </div>
                    <div kuiField>
                      <label
                        kuiFieldLabel
                        for="checkout-7j9-exp-year-f59-rtl"
                        >{{ t().year }}</label
                      >
                      <ng-container kuiSelect [items]="years">
                        <button
                          kuiSelectTrigger
                          id="checkout-7j9-exp-year-f59-rtl"
                        >
                          <span kuiSelectValue></span>
                        </button>
                        <div kuiSelectContent [attr.dir]="dir()">
                          <div kuiSelectGroup>
                            @for (item of years; track item.label) {
                              <div kuiSelectItem [value]="item.value">
                                {{ item.label }}
                              </div>
                            }
                          </div>
                        </div>
                      </ng-container>
                    </div>
                    <div kuiField>
                      <label kuiFieldLabel for="checkout-7j9-cvv-rtl">{{
                        t().cvv
                      }}</label>
                      <input
                        kuiInput
                        id="checkout-7j9-cvv-rtl"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </div>
              </fieldset>
              <div kuiFieldSeparator></div>
              <fieldset kuiFieldSet>
                <legend kuiFieldLegend>{{ t().billingAddress }}</legend>
                <p kuiFieldDescription>{{ t().billingAddressDescription }}</p>
                <div kuiFieldGroup>
                  <div kuiField orientation="horizontal">
                    <span
                      kuiCheckbox
                      id="checkout-7j9-same-as-shipping-wgm-rtl"
                      defaultChecked
                    ></span>
                    <label
                      kuiFieldLabel
                      for="checkout-7j9-same-as-shipping-wgm-rtl"
                      [sx]="styles.fieldLabel"
                      >{{ t().sameAsShipping }}</label
                    >
                  </div>
                </div>
              </fieldset>
              <fieldset kuiFieldSet>
                <div kuiFieldGroup>
                  <div kuiField>
                    <label
                      kuiFieldLabel
                      for="checkout-7j9-optional-comments-rtl"
                      >{{ t().comments }}</label
                    >
                    <textarea
                      kuiTextarea
                      id="checkout-7j9-optional-comments-rtl"
                      [attr.placeholder]="t().commentsPlaceholder"
                      [sx]="styles.textarea"
                    ></textarea>
                  </div>
                </div>
              </fieldset>
              <div kuiField orientation="horizontal">
                <button kuiButton type="submit">{{ t().submit }}</button>
                <button kuiButton variant="outline" type="button">
                  {{ t().cancel }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ng-container>
  `,
})
export default class FieldRtl {
  protected readonly i18n = useTranslation(translations, "ar")
  protected readonly dir = this.i18n.dir
  protected readonly t = this.i18n.t
  protected readonly locale = this.i18n.locale
  protected readonly styles = styles
  protected readonly months = months
  protected readonly years = years
  protected getMonthLabel(value: string | null): string {
    const t = this.t() as Record<string, string>
    if (value === null) return t["monthPlaceholder"]!
    return t[`month${value}`] || value
  }
  protected readonly page = page
}
