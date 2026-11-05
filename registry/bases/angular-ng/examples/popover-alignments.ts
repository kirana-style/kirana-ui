import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

const styles = {
  flexGap6: css({ display: "flex", gap: { "*": null, base: space[6] } }),
  w40: css({ width: { "*": null, base: space[40] } }),
}

@Component({
  selector: "popover-alignments",
  imports: [Button, Popover, PopoverContent, PopoverTrigger, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexGap6">
        <ng-container kuiPopover>
          <button kuiButton kuiPopoverTrigger variant="outline" size="sm">
            Start
          </button>
          <div kuiPopoverContent align="start" [sx]="styles.w40">
            Aligned to start
          </div>
        </ng-container>
        <ng-container kuiPopover>
          <button kuiButton kuiPopoverTrigger variant="outline" size="sm">
            Center
          </button>
          <div kuiPopoverContent align="center" [sx]="styles.w40">
            Aligned to center
          </div>
        </ng-container>
        <ng-container kuiPopover>
          <button kuiButton kuiPopoverTrigger variant="outline" size="sm">
            End
          </button>
          <div kuiPopoverContent align="end" [sx]="styles.w40">
            Aligned to end
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class PopoverAlignments {
  protected readonly styles = styles
  protected readonly page = page
}
