import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover"

const styles = {
  fit: css({ width: "fit-content" }),
}

@Component({
  selector: "popover-basic",
  imports: [
    Button,
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiPopover>
        <button kuiButton kuiPopoverTrigger variant="outline" [sx]="styles.fit">
          Open Popover
        </button>
        <div kuiPopoverContent align="start">
          <div kuiPopoverHeader>
            <h2 kuiPopoverTitle>Dimensions</h2>
            <p kuiPopoverDescription>Set the dimensions for the layer.</p>
          </div>
        </div>
      </ng-container>
    </div>
  `,
})
export default class PopoverBasic {
  protected readonly styles = styles
  protected readonly page = page
}
