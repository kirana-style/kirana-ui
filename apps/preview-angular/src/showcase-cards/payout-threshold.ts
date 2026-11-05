import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { theme } from "@workspace/registry/core/tokens"
import {
  fontSize,
  fontWeight,
  lineHeight,
} from "@workspace/registry/core/scales"
import { IconPlaceholder } from "@workspace/registry/icons/angular"
import { Button } from "@workspace/registry/bases/angular-ng/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/registry/bases/angular-ng/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@workspace/registry/bases/angular-ng/ui/field"
import { Progress } from "@workspace/registry/bases/angular-ng/ui/progress"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/registry/bases/angular-ng/ui/select"
import { Textarea } from "@workspace/registry/bases/angular-ng/ui/textarea"

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
    Progress,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
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
          <button
            kuiButton
            variant="ghost"
            size="icon-sm"
            [sx]="styles.button"
            aria-label="Dismiss payout threshold"
          >
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
              <label kuiFieldLabel id="min-payout-label"
                >Minimum Payout Amount</label
              >
              <span [sx]="styles.span">$2500.00</span>
            </div>
            <div
              kuiProgress
              [value]="25"
              aria-labelledby="min-payout-label"
              aria-valuetext="$2,500 of $10,000"
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
  protected readonly styles = styles
  protected readonly CURRENCIES = CURRENCIES
}
