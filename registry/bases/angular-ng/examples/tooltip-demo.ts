import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

@Component({
  selector: "tooltip-demo",
  imports: [Button, Tooltip, TooltipContent, TooltipTrigger, SxDirective],
  template: `
    <div [sx]="page.example">
      <ng-container kuiTooltip>
        <button kuiButton kuiTooltipTrigger variant="outline">Hover</button>
        <div kuiTooltipContent>
          <p>Add to library</p>
        </div>
      </ng-container>
    </div>
  `,
})
export default class TooltipDemo {
  protected readonly page = page
}
