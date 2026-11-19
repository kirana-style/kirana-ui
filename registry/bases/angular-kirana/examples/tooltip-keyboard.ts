import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import { Kbd } from "../ui/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

@Component({
  selector: "tooltip-keyboard",
  imports: [
    Button,
    Kbd,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <ng-container kuiTooltip>
        <button kuiButton kuiTooltipTrigger variant="outline" size="icon-sm">
          <svg
            iconPlaceholder
            lucide="SaveIcon"
            tabler="IconDeviceFloppy"
            hugeicons="FloppyDiskIcon"
            phosphor="FloppyDiskIcon"
            remixicon="RiSaveLine"
          ></svg>
        </button>
        <div kuiTooltipContent>
          Save Changes
          <kbd kuiKbd>S</kbd>
        </div>
      </ng-container>
    </div>
  `,
})
export default class TooltipKeyboard {
  protected readonly page = page
}
