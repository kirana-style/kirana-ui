import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

const styles = {
  span: css({
    display: { "*": null, base: "inline-block" },
    width: { "*": null, base: "fit-content" },
  }),
}

@Component({
  selector: "tooltip-disabled",
  imports: [Button, Tooltip, TooltipContent, TooltipTrigger, SxDirective],
  template: `
    <div [sx]="page.example">
      <ng-container kuiTooltip>
        <span kuiTooltipTrigger [sx]="styles.span">
          <button kuiButton variant="outline" disabled>Disabled</button>
        </span>
        <div kuiTooltipContent>
          <p>This feature is currently unavailable</p>
        </div>
      </ng-container>
    </div>
  `,
})
export default class TooltipDisabled {
  protected readonly styles = styles
  protected readonly page = page
}
