import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { axes } from "../../../../../core/axes"
import { theme } from "../../../../../core/tokens"
import { breakpoint, space } from "../../../../../core/scales"
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
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "../../../ui/field"
import { Input } from "../../../ui/input"
import { RadioGroup, RadioGroupItem } from "../../../ui/radio-group"

const styles = {
  button: css({
    backgroundColor: theme.muted,
  }),
  radioGroup: css({
    display: { "*": null, base: "grid" },
    gridTemplateColumns: {
      base: "repeat(1, minmax(0, 1fr))",
      [breakpoint.md]: "repeat(2, minmax(0, 1fr))",
      [axes.style.sera]: "repeat(1, minmax(0, 1fr))",
    },
    alignItems: { "*": null, base: "flex-start" },
    gap: { "*": null, base: space[3] },
  }),
  field: css({
    paddingBottom: { "*": null, base: space["2.5"] },
  }),
  field2: css({
    paddingBottom: { "*": null, base: space["2.5"] },
  }),
  fieldDescription: css({
    WebkitLineClamp: { "*": null, base: "1" },
    WebkitBoxOrient: { "*": null, base: "vertical" },
    display: { "*": null, base: "-webkit-box" },
    overflow: { "*": null, base: "hidden" },
  }),
  button2: css({
    width: { "*": null, base: "100%" },
  }),
}

@Component({
  selector: "kui-receiving-method",
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
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
    FieldTitle,
    Input,
    RadioGroup,
    RadioGroupItem,
    IconPlaceholder,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardDescription>Payout Preferences</div>
        <div kuiCardTitle>Receiving Method</div>
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
            <label kuiFieldLabel for="account-holder"
              >Account Holder Name</label
            >
            <input
              kuiInput
              id="account-holder"
              value="Synthetic Horizons Music LLC"
            />
          </div>
          <fieldset kuiFieldSet>
            <legend kuiFieldLegend variant="label">Receiving Method</legend>
            <div kuiRadioGroup defaultValue="bank" [sx]="styles.radioGroup">
              <label kuiFieldLabel for="method-bank">
                <div kuiField orientation="horizontal" [sx]="styles.field">
                  <span kuiRadioGroupItem value="bank" id="method-bank"></span>
                  <div kuiFieldContent>
                    <div kuiFieldTitle>Bank Transfer</div>
                    <p kuiFieldDescription>SWIFT / IBAN</p>
                  </div>
                </div>
              </label>
              <label kuiFieldLabel for="method-paypal">
                <div kuiField orientation="horizontal" [sx]="styles.field2">
                  <span
                    kuiRadioGroupItem
                    value="paypal"
                    id="method-paypal"
                  ></span>
                  <div kuiFieldContent>
                    <div kuiFieldTitle>PayPal</div>
                    <p kuiFieldDescription [sx]="styles.fieldDescription">
                      Instant Payout
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </fieldset>
          <div kuiField>
            <label kuiFieldLabel for="iban">IBAN / Account Number</label>
            <input kuiInput id="iban" placeholder="DE89 3704 0044 ...." />
          </div>
        </div>
      </div>
      <div kuiCardFooter>
        <button kuiButton [sx]="styles.button2" disabled>
          Save Payout Settings
        </button>
      </div>
    </div>
  `,
})
export class ReceivingMethod {
  protected readonly styles = styles
}
