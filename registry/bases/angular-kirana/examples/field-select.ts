import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const styles = {
  narrow: css({ width: "100%", maxWidth: containerSize.xs }),
}

const items = [
  { label: "Choose department", value: null },
  { label: "Engineering", value: "engineering" },
  { label: "Design", value: "design" },
  { label: "Marketing", value: "marketing" },
  { label: "Sales", value: "sales" },
  { label: "Customer Support", value: "support" },
  { label: "Human Resources", value: "hr" },
  { label: "Finance", value: "finance" },
  { label: "Operations", value: "operations" },
]

@Component({
  selector: "field-select",
  imports: [
    Field,
    FieldDescription,
    FieldLabel,
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
      <div kuiField [sx]="styles.narrow">
        <label kuiFieldLabel>Department</label>
        <ng-container kuiSelect [items]="items">
          <button kuiSelectTrigger>
            <span kuiSelectValue></span>
          </button>
          <div kuiSelectContent>
            <div kuiSelectGroup>
              @for (item of items; track item.label) {
                <div kuiSelectItem [value]="item.value">{{ item.label }}</div>
              }
            </div>
          </div>
        </ng-container>
        <p kuiFieldDescription>Select your department or area of work.</p>
      </div>
    </div>
  `,
})
export default class FieldSelect {
  protected readonly styles = styles
  protected readonly items = items
  protected readonly page = page
}
