import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { radiusBase } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { color } from "../../../core/scales"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

const styles = {
  radius9999Rem: css({ [radiusBase.value]: "9999rem" }),
  dataActiveTrueBgOrange10: css({
    backgroundColor: {
      '[data-active="true"]': `light-dark(${color.orange[100]}, ${color.orange[800]})`,
    },
    color: {
      '[data-active="true"]': `light-dark(${color.orange[700]}, ${color.orange[100]})`,
    },
  }),
}

@Component({
  selector: "button-group-input-group",
  imports: [
    Button,
    ButtonGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiButtonGroup [sx]="styles.radius9999Rem">
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
            <input
              kuiInputGroupInput
              [attr.placeholder]="
                voiceEnabled()
                  ? 'Record and send audio...'
                  : 'Send a message...'
              "
              [disabled]="voiceEnabled()"
            />
            <div kuiInputGroupAddon align="inline-end">
              <ng-container kuiTooltip>
                <button
                  kuiInputGroupButton
                  kuiTooltipTrigger
                  (click)="voiceEnabled.set(!voiceEnabled())"
                  size="icon-xs"
                  [attr.data-active]="voiceEnabled()"
                  [sx]="styles.dataActiveTrueBgOrange10"
                  [attr.aria-pressed]="voiceEnabled()"
                >
                  <svg
                    iconPlaceholder
                    lucide="AudioLinesIcon"
                    tabler="IconWaveSine"
                    hugeicons="AudioWave01Icon"
                    phosphor="WaveformIcon"
                    remixicon="RiPulseLine"
                  ></svg>
                </button>
                <div kuiTooltipContent>Voice Mode</div>
              </ng-container>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class ButtonGroupInputGroup {
  protected readonly voiceEnabled = signal(false)
  protected readonly styles = styles
  protected readonly page = page
}
