import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"

@Component({
  selector: "toggle-group-outline",
  imports: [ToggleGroup, ToggleGroupItem, SxDirective],
  template: `
    <div [sx]="page.example">
      <div kuiToggleGroup variant="outline" [defaultValue]="['all']">
        <button kuiToggleGroupItem value="all" aria-label="Toggle all">
          All
        </button>
        <button kuiToggleGroupItem value="missed" aria-label="Toggle missed">
          Missed
        </button>
      </div>
    </div>
  `,
})
export default class ToggleGroupOutline {
  protected readonly page = page
}
