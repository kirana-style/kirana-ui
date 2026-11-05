import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
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
  { label: "Grapes", value: "grapes", disabled: true },
  { label: "Pineapple", value: "pineapple" },
]

@Component({
  selector: "select-disabled",
  imports: [
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
      <ng-container kuiSelect [items]="items" disabled>
        <button kuiSelectTrigger [sx]="styles.wFullMaxW48">
          <span kuiSelectValue></span>
        </button>
        <div kuiSelectContent>
          <div kuiSelectGroup>
            @for (item of items; track item.label) {
              <div
                kuiSelectItem
                [value]="item.value"
                [disabled]="item.disabled"
              >
                {{ item.label }}
              </div>
            }
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class SelectDisabled {
  protected readonly styles = styles
  protected readonly items = items
  protected readonly page = page
}
