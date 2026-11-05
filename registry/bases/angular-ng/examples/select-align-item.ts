import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Switch } from "../ui/switch"

const styles = {
  narrow: css({ width: "100%", maxWidth: containerSize.xs }),
}

const items = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
]

@Component({
  selector: "select-align-item",
  imports: [
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Switch,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiFieldGroup [sx]="styles.narrow">
        <div kuiField orientation="horizontal">
          <div kuiFieldContent>
            <label kuiFieldLabel for="align-item">Align Item</label>
            <p kuiFieldDescription>
              Toggle to align the item with the trigger.
            </p>
          </div>
          <span
            kuiSwitch
            id="align-item"
            [(checked)]="alignItemWithTrigger"
          ></span>
        </div>
        <div kuiField>
          <ng-container kuiSelect [items]="items" defaultValue="banana">
            <button kuiSelectTrigger>
              <span kuiSelectValue></span>
            </button>
            <div
              kuiSelectContent
              [alignItemWithTrigger]="alignItemWithTrigger()"
            >
              <div kuiSelectGroup>
                @for (item of items; track item.label) {
                  <div kuiSelectItem [value]="item.value">{{ item.label }}</div>
                }
              </div>
            </div>
          </ng-container>
        </div>
      </div>
    </div>
  `,
})
export default class SelectAlignItem {
  protected readonly alignItemWithTrigger = signal(true)
  protected readonly styles = styles
  protected readonly items = items
  protected readonly page = page
}
