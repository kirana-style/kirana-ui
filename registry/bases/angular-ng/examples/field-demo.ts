import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, fontWeight, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
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
  wFullMaxWMd: css({
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
  }),
  gridGridCols3Gap4: css({
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: { "*": null, base: space[4] },
  }),
  normal: css({ fontWeight: { "*": null, base: fontWeight.normal } }),
  resizeNone: css({ resize: "none" }),
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

@Component({
  selector: "field-demo",
  imports: [
    Button,
    Checkbox,
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
    <div [sx]="page.example">
      <div [sx]="styles.wFullMaxWMd">
        <form>
          <div kuiFieldGroup>
            <fieldset kuiFieldSet>
              <legend kuiFieldLegend>Payment Method</legend>
              <p kuiFieldDescription>
                All transactions are secure and encrypted
              </p>
              <div kuiFieldGroup>
                <div kuiField>
                  <label kuiFieldLabel for="checkout-7j9-card-name-43j"
                    >Name on Card</label
                  >
                  <input
                    kuiInput
                    id="checkout-7j9-card-name-43j"
                    placeholder="Evil Rabbit"
                    required
                  />
                </div>
                <div kuiField>
                  <label kuiFieldLabel for="checkout-7j9-card-number-uw1"
                    >Card Number</label
                  >
                  <input
                    kuiInput
                    id="checkout-7j9-card-number-uw1"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                  <p kuiFieldDescription>Enter your 16-digit card number</p>
                </div>
                <div [sx]="styles.gridGridCols3Gap4">
                  <div kuiField>
                    <label kuiFieldLabel for="checkout-exp-month-ts6"
                      >Month</label
                    >
                    <ng-container kuiSelect [items]="months">
                      <button kuiSelectTrigger id="checkout-exp-month-ts6">
                        <span kuiSelectValue></span>
                      </button>
                      <div kuiSelectContent>
                        <div kuiSelectGroup>
                          @for (item of months; track item.label) {
                            <div kuiSelectItem [value]="item.value">
                              {{ item.label }}
                            </div>
                          }
                        </div>
                      </div>
                    </ng-container>
                  </div>
                  <div kuiField>
                    <label kuiFieldLabel for="checkout-7j9-exp-year-f59"
                      >Year</label
                    >
                    <ng-container kuiSelect [items]="years">
                      <button kuiSelectTrigger id="checkout-7j9-exp-year-f59">
                        <span kuiSelectValue></span>
                      </button>
                      <div kuiSelectContent>
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
                    <label kuiFieldLabel for="checkout-7j9-cvv">CVV</label>
                    <input
                      kuiInput
                      id="checkout-7j9-cvv"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
            </fieldset>
            <div kuiFieldSeparator></div>
            <fieldset kuiFieldSet>
              <legend kuiFieldLegend>Billing Address</legend>
              <p kuiFieldDescription>
                The billing address associated with your payment method
              </p>
              <div kuiFieldGroup>
                <div kuiField orientation="horizontal">
                  <span
                    kuiCheckbox
                    id="checkout-7j9-same-as-shipping-wgm"
                    defaultChecked
                  ></span>
                  <label
                    kuiFieldLabel
                    for="checkout-7j9-same-as-shipping-wgm"
                    [sx]="styles.normal"
                    >Same as shipping address</label
                  >
                </div>
              </div>
            </fieldset>
            <fieldset kuiFieldSet>
              <div kuiFieldGroup>
                <div kuiField>
                  <label kuiFieldLabel for="checkout-7j9-optional-comments"
                    >Comments</label
                  >
                  <textarea
                    kuiTextarea
                    id="checkout-7j9-optional-comments"
                    placeholder="Add any additional comments"
                    [sx]="styles.resizeNone"
                  ></textarea>
                </div>
              </div>
            </fieldset>
            <div kuiField orientation="horizontal">
              <button kuiButton type="submit">Submit</button>
              <button kuiButton variant="outline" type="button">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
})
export default class FieldDemo {
  protected readonly styles = styles
  protected readonly months = months
  protected readonly years = years
  protected readonly page = page
}
