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
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const styles = {
  wFullMaxW48: css({ width: { "*": null, base: "100%" }, maxWidth: space[48] }),
}

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
]

const vegetables = [
  { label: "Carrot", value: "carrot" },
  { label: "Broccoli", value: "broccoli" },
  { label: "Spinach", value: "spinach" },
]

const allItems = [
  { label: "Select a fruit", value: null },
  ...fruits,
  ...vegetables,
]

@Component({
  selector: "select-groups",
  imports: [
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiSelect [items]="allItems">
        <button kuiSelectTrigger [sx]="styles.wFullMaxW48">
          <span kuiSelectValue></span>
        </button>
        <div kuiSelectContent>
          <div kuiSelectGroup>
            <div kuiSelectLabel>Fruits</div>
            @for (item of fruits; track item.value) {
              <div kuiSelectItem [value]="item.value">{{ item.label }}</div>
            }
          </div>
          <div kuiSelectSeparator></div>
          <div kuiSelectGroup>
            <div kuiSelectLabel>Vegetables</div>
            @for (item of vegetables; track item.value) {
              <div kuiSelectItem [value]="item.value">{{ item.label }}</div>
            }
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class SelectGroups {
  protected readonly styles = styles
  protected readonly fruits = fruits
  protected readonly vegetables = vegetables
  protected readonly allItems = allItems
  protected readonly page = page
}
