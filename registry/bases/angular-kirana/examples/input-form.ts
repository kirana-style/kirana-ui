import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const styles = {
  narrowSm: css({ width: "100%", maxWidth: containerSize.sm }),
  gridGridCols2Gap4: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: { "*": null, base: space[4] },
  }),
}

const countries = [
  { label: "United States", value: "us" },
  { label: "United Kingdom", value: "uk" },
  { label: "Canada", value: "ca" },
]

@Component({
  selector: "input-form",
  imports: [
    Button,
    Field,
    FieldDescription,
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
  template: `
    <div [sx]="page.example">
      <form [sx]="styles.narrowSm">
        <div kuiFieldGroup>
          <div kuiField>
            <label kuiFieldLabel for="form-name">Name</label>
            <input
              kuiInput
              id="form-name"
              type="text"
              placeholder="Evil Rabbit"
              required
            />
          </div>
          <div kuiField>
            <label kuiFieldLabel for="form-email">Email</label>
            <input
              kuiInput
              id="form-email"
              type="email"
              placeholder="john@example.com"
            />
            <p kuiFieldDescription>We'll never share your email with anyone.</p>
          </div>
          <div [sx]="styles.gridGridCols2Gap4">
            <div kuiField>
              <label kuiFieldLabel for="form-phone">Phone</label>
              <input
                kuiInput
                id="form-phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div kuiField>
              <label kuiFieldLabel for="form-country">Country</label>
              <ng-container kuiSelect [items]="countries" defaultValue="us">
                <button kuiSelectTrigger id="form-country">
                  <span kuiSelectValue></span>
                </button>
                <div kuiSelectContent>
                  <div kuiSelectGroup>
                    @for (country of countries; track country.value) {
                      <div kuiSelectItem [value]="country.value">
                        {{ country.label }}
                      </div>
                    }
                  </div>
                </div>
              </ng-container>
            </div>
          </div>
          <div kuiField>
            <label kuiFieldLabel for="form-address">Address</label>
            <input
              kuiInput
              id="form-address"
              type="text"
              placeholder="123 Main St"
            />
          </div>
          <div kuiField orientation="horizontal">
            <button kuiButton type="button" variant="outline">Cancel</button>
            <button kuiButton type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  `,
})
export default class InputForm {
  protected readonly styles = styles
  protected readonly countries = countries
  protected readonly page = page
}
