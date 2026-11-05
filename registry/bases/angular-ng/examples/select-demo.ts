import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
]

@Component({
  selector: "select-demo",
  imports: [
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiSelect [items]="fruits">
        <button kuiSelectTrigger>
          <span kuiSelectValue placeholder="Select a fruit"></span>
        </button>
        <div kuiSelectContent>
          <div kuiSelectGroup>
            <div kuiSelectLabel>Fruits</div>
            @for (fruit of fruits; track fruit.value) {
              <div kuiSelectItem [value]="fruit.value">{{ fruit.label }}</div>
            }
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class SelectDemo {
  protected readonly fruits = fruits
  protected readonly page = page
}
