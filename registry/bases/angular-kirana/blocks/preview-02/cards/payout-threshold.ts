import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { theme } from "../../../../../core/tokens"
import { fontSize, fontWeight, lineHeight } from "../../../../../core/scales"
import { IconPlaceholder } from "../../../../../icons/angular"
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
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../../../ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select"
import { Slider } from "../../../ui/slider"
import { Textarea } from "../../../ui/textarea"

const styles = {
  button: css({
    backgroundColor: theme.muted,
  }),
  selectTrigger: css({
    width: { "*": null, base: "100%" },
  }),
  div: css({
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
  }),
  span: css({
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["2xl"],
    fontWeight: fontWeight.semibold,
    fontVariantNumeric: "tabular-nums",
  }),
  div2: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }),
  textarea: css({
    minHeight: { "*": null, base: "100px" },
  }),
  button2: css({
    width: { "*": null, base: "100%" },
  }),
}

const CURRENCIES = [
  { label: "USD — United States Dollar", value: "usd" },
  { label: "EUR — Euro", value: "eur" },
  { label: "GBP — British Pound", value: "gbp" },
  { label: "JPY — Japanese Yen", value: "jpy" },
]

@Component({
  selector: "kui-payout-threshold",
  imports: [
    Button,
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Slider,
    Textarea,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Payout Threshold</div>
        <div kuiCardDescription>
          Set the minimum balance required before a payout is triggered.
        </div>
        <div kuiCardAction>
          <button kuiButton variant="ghost" size="icon-sm" [sx]="styles.button">
            <svg
              iconPlaceholder
              lucide="XIcon"
              tabler="IconX"
              hugeicons="Cancel01Icon"
              phosphor="XIcon"
              remixicon="RiCloseLine"
            ></svg>
          </button>
        </div>
      </div>
      <div kuiCardContent>
        <div kuiFieldGroup>
          <div kuiField>
            <label kuiFieldLabel for="preferred-currency"
              >Preferred Currency</label
            >
            <ng-container kuiSelect [items]="CURRENCIES" defaultValue="usd">
              <button
                kuiSelectTrigger
                id="preferred-currency"
                [sx]="styles.selectTrigger"
              >
                <span kuiSelectValue></span>
              </button>
              <div kuiSelectContent>
                <div kuiSelectGroup>
                  @for (item of CURRENCIES; track item.value) {
                    <div kuiSelectItem [value]="item.value">
                      {{ item.label }}
                    </div>
                  }
                </div>
              </div>
            </ng-container>
          </div>
          <div kuiField>
            <div [sx]="styles.div">
              <label kuiFieldLabel for="min-payout"
                >Minimum Payout Amount</label
              >
              <span [sx]="styles.span">\${{ amount()[0].toFixed(2) }}</span>
            </div>
            <div
              kuiSlider
              id="min-payout"
              [(value)]="amount"
              [min]="50"
              [max]="10000"
              [step]="50"
            ></div>
            <div [sx]="styles.div2">
              <p kuiFieldDescription>$50 (MIN)</p>
              <p kuiFieldDescription>$10,000 (MAX)</p>
            </div>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="payout-notes">Notes</label>
            <textarea
              kuiTextarea
              id="payout-notes"
              placeholder="Add any notes for this payout configuration..."
              [sx]="styles.textarea"
            ></textarea>
          </div>
        </div>
      </div>
      <div kuiCardFooter>
        <button kuiButton [sx]="styles.button2">Save Threshold</button>
      </div>
    </div>
  `,
})
export class PayoutThreshold {
  protected readonly amount = signal([2500])
  protected readonly styles = styles
  protected readonly CURRENCIES = CURRENCIES
}
