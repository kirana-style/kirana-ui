import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
import { Kbd, KbdGroup } from "../ui/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

const styles = {
  flexFlexWrapGap4: css({
    display: "flex",
    flexWrap: "wrap",
    gap: { "*": null, base: space[4] },
  }),
}

@Component({
  selector: "kbd-tooltip",
  imports: [
    Button,
    ButtonGroup,
    Kbd,
    KbdGroup,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexFlexWrapGap4">
        <div kuiButtonGroup>
          <ng-container kuiTooltip>
            <button kuiButton kuiTooltipTrigger variant="outline">Save</button>
            <div kuiTooltipContent>
              Save Changes
              <kbd kuiKbd>S</kbd>
            </div>
          </ng-container>
          <ng-container kuiTooltip>
            <button kuiButton kuiTooltipTrigger variant="outline">Print</button>
            <div kuiTooltipContent>
              Print Document
              <kbd kuiKbdGroup>
                <kbd kuiKbd>Ctrl</kbd>
                <kbd kuiKbd>P</kbd>
              </kbd>
            </div>
          </ng-container>
        </div>
      </div>
    </div>
  `,
})
export default class KbdTooltip {
  protected readonly styles = styles
  protected readonly page = page
}
