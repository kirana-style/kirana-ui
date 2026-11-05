import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

@Component({
  selector: "button-group-nested",
  imports: [
    Button,
    ButtonGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiButtonGroup>
        <div kuiButtonGroup>
          <button kuiButton variant="outline" size="icon">
            <svg
              iconPlaceholder
              lucide="PlusIcon"
              tabler="IconPlus"
              hugeicons="PlusSignIcon"
              phosphor="PlusIcon"
              remixicon="RiAddLine"
            ></svg>
          </button>
        </div>
        <div kuiButtonGroup>
          <div kuiInputGroup>
            <input kuiInputGroupInput placeholder="Send a message..." />
            <ng-container kuiTooltip>
              <div kuiInputGroupAddon kuiTooltipTrigger align="inline-end">
                <svg
                  iconPlaceholder
                  lucide="AudioLinesIcon"
                  tabler="IconWaveSine"
                  hugeicons="AudioWave01Icon"
                  phosphor="WaveformIcon"
                  remixicon="RiPulseLine"
                ></svg>
              </div>
              <div kuiTooltipContent>Voice Mode</div>
            </ng-container>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class ButtonGroupNested {
  protected readonly page = page
}
