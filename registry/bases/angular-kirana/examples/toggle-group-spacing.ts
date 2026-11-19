import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"

@Component({
  selector: "toggle-group-spacing",
  imports: [ToggleGroup, ToggleGroupItem, SxDirective],
  template: `
    <div [sx]="page.example">
      <div
        kuiToggleGroup
        size="sm"
        [defaultValue]="['top']"
        variant="outline"
        [spacing]="2"
      >
        <button kuiToggleGroupItem value="top" aria-label="Toggle top">
          Top
        </button>
        <button kuiToggleGroupItem value="bottom" aria-label="Toggle bottom">
          Bottom
        </button>
        <button kuiToggleGroupItem value="left" aria-label="Toggle left">
          Left
        </button>
        <button kuiToggleGroupItem value="right" aria-label="Toggle right">
          Right
        </button>
      </div>
    </div>
  `,
})
export default class ToggleGroupSpacing {
  protected readonly page = page
}
