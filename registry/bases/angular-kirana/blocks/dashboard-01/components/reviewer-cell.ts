import { Component, input } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { styles } from "./table"
import type { Item } from "./table"
import { Label } from "../../../ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select"

const reviewers = [
  { label: "Eddie Lake", value: "Eddie Lake" },
  { label: "Jamik Tashpulatov", value: "Jamik Tashpulatov" },
]

@Component({
  selector: "kui-reviewer-cell",
  imports: [
    Label,
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
    @if (item().reviewer !== "Assign reviewer") {
      {{ item().reviewer }}
    } @else {
      <label
        kuiLabel
        [attr.for]="\`\${item().id}-reviewer\`"
        [sx]="styles.label3"
        >Reviewer</label
      >
      <ng-container kuiSelect [items]="reviewers">
        <button
          kuiSelectTrigger
          [sx]="styles.selectTrigger"
          size="sm"
          [attr.id]="\`\${item().id}-reviewer\`"
        >
          <span
            kuiSelectValue
            [sx]="styles.selectValue"
            placeholder="Assign reviewer"
          ></span>
        </button>
        <div kuiSelectContent align="end">
          <div kuiSelectGroup>
            <div kuiSelectItem value="Eddie Lake">Eddie Lake</div>
            <div kuiSelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</div>
          </div>
        </div>
      </ng-container>
    }
  `,
})
export class ReviewerCell {
  readonly item = input.required<Item>()
  protected readonly reviewers = reviewers
  protected readonly styles = styles
}
