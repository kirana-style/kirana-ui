import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Field, FieldError, FieldLabel } from "../ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const styles = {
  wFullMaxW48: css({ width: { "*": null, base: "100%" }, maxWidth: space[48] }),
}

const items = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
]

@Component({
  selector: "select-invalid",
  imports: [
    Field,
    FieldError,
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
      <div kuiField data-invalid="true" [sx]="styles.wFullMaxW48">
        <label kuiFieldLabel>Fruit</label>
        <ng-container kuiSelect [items]="items">
          <button kuiSelectTrigger aria-invalid="true">
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
        <div kuiFieldError>Please select a fruit.</div>
      </div>
    </div>
  `,
})
export default class SelectInvalid {
  protected readonly styles = styles
  protected readonly items = items
  protected readonly page = page
}
