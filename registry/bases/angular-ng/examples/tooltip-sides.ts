import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import type { Side } from "../../../lib/angular/popup"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

const styles = {
  div: css({
    display: "flex",
    flexWrap: "wrap",
    gap: space[2],
  }),
  button: css({
    width: { "*": null, base: "fit-content" },
    textTransform: { "*": null, base: "capitalize" },
  }),
}

@Component({
  selector: "tooltip-sides",
  imports: [Button, Tooltip, TooltipContent, TooltipTrigger, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.div">
        @for (side of sides; track side) {
          <ng-container kuiTooltip>
            <button
              kuiButton
              kuiTooltipTrigger
              variant="outline"
              [sx]="styles.button"
            >
              {{ side }}
            </button>
            <div kuiTooltipContent [side]="side">
              <p>Add to library</p>
            </div>
          </ng-container>
        }
      </div>
    </div>
  `,
})
export default class TooltipSides {
  protected readonly sides: Side[] = ["left", "top", "bottom", "right"]
  protected readonly styles = styles
  protected readonly page = page
}
