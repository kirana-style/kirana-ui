import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontWeight } from "../../../../../core/scales"
import { Button } from "../../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card"
import { Checkbox } from "../../../ui/checkbox"
import { Field, FieldGroup, FieldLabel } from "../../../ui/field"
import { Input } from "../../../ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select"

const styles = {
  fieldGroup: css({
    display: { "*": null, base: "grid" },
    gridTemplateColumns: { "*": null, base: "repeat(2, minmax(0, 1fr))" },
  }),
  selectTrigger: css({
    width: { "*": null, base: "100%" },
  }),
  fieldGroup2: css({
    display: { "*": null, base: "grid" },
    gridTemplateColumns: { "*": null, base: "repeat(2, minmax(0, 1fr))" },
  }),
  selectTrigger2: css({
    width: { "*": null, base: "100%" },
  }),
  fieldLabel: css({
    fontWeight: { "*": null, base: fontWeight.normal },
  }),
  button: css({
    marginLeft: { "*": null, base: "auto" },
  }),
}

@Component({
  selector: "kui-shipping-address",
  imports: [
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Checkbox,
    Field,
    FieldGroup,
    FieldLabel,
    Input,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SxDirective,
  ],
  host: { style: "display: contents" },
  template: `
    <div kuiCard>
      <div kuiCardHeader>
        <div kuiCardTitle>Shipping Address</div>
        <div kuiCardDescription>Where should we deliver?</div>
      </div>
      <div kuiCardContent>
        <div kuiFieldGroup>
          <div kuiField>
            <label kuiFieldLabel for="shipping-street">Street address</label>
            <input
              kuiInput
              id="shipping-street"
              placeholder="123 Main Street"
            />
          </div>
          <div kuiField>
            <label kuiFieldLabel for="shipping-apt">Apt / Suite</label>
            <input kuiInput id="shipping-apt" placeholder="Apt 4B" />
          </div>
          <div kuiFieldGroup [sx]="styles.fieldGroup">
            <div kuiField>
              <label kuiFieldLabel for="shipping-city">City</label>
              <input kuiInput id="shipping-city" placeholder="San Francisco" />
            </div>
            <div kuiField>
              <label kuiFieldLabel for="shipping-state">State</label>
              <ng-container
                kuiSelect
                [items]="[
                  { label: 'California', value: 'CA' },
                  { label: 'New York', value: 'NY' },
                  { label: 'Texas', value: 'TX' },
                ]"
                defaultValue="CA"
              >
                <button
                  kuiSelectTrigger
                  id="shipping-state"
                  [sx]="styles.selectTrigger"
                >
                  <span kuiSelectValue></span>
                </button>
                <div kuiSelectContent>
                  <div kuiSelectGroup>
                    <div kuiSelectItem value="CA">California</div>
                    <div kuiSelectItem value="NY">New York</div>
                    <div kuiSelectItem value="TX">Texas</div>
                  </div>
                </div>
              </ng-container>
            </div>
          </div>
          <div kuiFieldGroup [sx]="styles.fieldGroup2">
            <div kuiField>
              <label kuiFieldLabel for="shipping-zip">ZIP Code</label>
              <input kuiInput id="shipping-zip" placeholder="94102" />
            </div>
            <div kuiField>
              <label kuiFieldLabel for="shipping-country">Country</label>
              <ng-container
                kuiSelect
                [items]="[
                  { label: 'United States', value: 'US' },
                  { label: 'Canada', value: 'CA' },
                  { label: 'United Kingdom', value: 'UK' },
                ]"
                defaultValue="US"
              >
                <button
                  kuiSelectTrigger
                  id="shipping-country"
                  [sx]="styles.selectTrigger2"
                >
                  <span kuiSelectValue></span>
                </button>
                <div kuiSelectContent>
                  <div kuiSelectGroup>
                    <div kuiSelectItem value="US">United States</div>
                    <div kuiSelectItem value="CA">Canada</div>
                    <div kuiSelectItem value="UK">United Kingdom</div>
                  </div>
                </div>
              </ng-container>
            </div>
          </div>
          <div kuiField orientation="horizontal">
            <span kuiCheckbox id="shipping-save" defaultChecked></span>
            <label kuiFieldLabel for="shipping-save" [sx]="styles.fieldLabel"
              >Save as default address</label
            >
          </div>
        </div>
      </div>
      <div kuiCardFooter>
        <button kuiButton variant="outline" size="sm">Cancel</button>
        <button kuiButton size="sm" [sx]="styles.button">Save Address</button>
      </div>
    </div>
  `,
})
export class ShippingAddress {
  protected readonly styles = styles
}
