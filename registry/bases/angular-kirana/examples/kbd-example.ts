import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space, spacing } from "../../../core/scales"
import { IconPlaceholder } from "../../../icons/angular"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"
import { Kbd, KbdGroup } from "../ui/kbd"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

const styles = {
  pair: css({ display: "flex", alignItems: "center", gap: space[2] }),
  pr15: css({ paddingRight: { "*": null, base: spacing(1.5) } }),
}

@Component({
  selector: "kbd-example",
  imports: [
    Button,
    Example,
    ExampleWrapper,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    Kbd,
    KbdGroup,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- KbdBasic -->
      <div kuiExample title="Basic">
        <div [sx]="styles.pair">
          <kbd kuiKbd>Ctrl</kbd>
          <kbd kuiKbd>⌘K</kbd>
          <kbd kuiKbd>Ctrl + B</kbd>
        </div>
      </div>
      <!-- KbdModifierKeys -->
      <div kuiExample title="Modifier Keys">
        <div [sx]="styles.pair">
          <kbd kuiKbd>⌘</kbd>
          <kbd kuiKbd>C</kbd>
        </div>
      </div>
      <!-- KbdGroupExample -->
      <div kuiExample title="KbdGroup">
        <kbd kuiKbdGroup>
          <kbd kuiKbd>Ctrl</kbd>
          <kbd kuiKbd>Shift</kbd>
          <kbd kuiKbd>P</kbd>
        </kbd>
      </div>
      <!-- KbdArrowKeys -->
      <div kuiExample title="Arrow Keys">
        <div [sx]="styles.pair">
          <kbd kuiKbd>↑</kbd>
          <kbd kuiKbd>↓</kbd>
          <kbd kuiKbd>←</kbd>
          <kbd kuiKbd>→</kbd>
        </div>
      </div>
      <!-- KbdWithIcons -->
      <div kuiExample title="With Icons">
        <kbd kuiKbdGroup>
          <kbd kuiKbd>
            <svg
              iconPlaceholder
              lucide="CircleDashedIcon"
              tabler="IconCircleDashed"
              hugeicons="DashedLineCircleIcon"
              phosphor="CircleDashedIcon"
              remixicon="RiLoaderLine"
            ></svg>
          </kbd>
          <kbd kuiKbd>
            <svg
              iconPlaceholder
              lucide="ArrowLeftIcon"
              tabler="IconArrowLeft"
              hugeicons="ArrowLeft01Icon"
              phosphor="ArrowLeftIcon"
              remixicon="RiArrowLeftLine"
            ></svg>
          </kbd>
          <kbd kuiKbd>
            <svg
              iconPlaceholder
              lucide="ArrowRightIcon"
              tabler="IconArrowRight"
              hugeicons="ArrowRight01Icon"
              phosphor="ArrowRightIcon"
              remixicon="RiArrowRightLine"
            ></svg>
          </kbd>
        </kbd>
      </div>
      <!-- KbdWithIconsAndText -->
      <div kuiExample title="With Icons and Text">
        <kbd kuiKbdGroup>
          <kbd kuiKbd>
            <svg
              iconPlaceholder
              lucide="ArrowLeftIcon"
              tabler="IconArrowLeft"
              hugeicons="ArrowLeft01Icon"
              phosphor="ArrowLeftIcon"
              remixicon="RiArrowLeftLine"
            ></svg>
            Left
          </kbd>
          <kbd kuiKbd>
            <svg
              iconPlaceholder
              lucide="CircleDashedIcon"
              tabler="IconCircleDashed"
              hugeicons="DashedLineCircleIcon"
              phosphor="CircleDashedIcon"
              remixicon="RiLoaderLine"
            ></svg>
            Voice Enabled
          </kbd>
        </kbd>
      </div>
      <!-- KbdInInputGroup -->
      <div kuiExample title="InputGroup">
        <div kuiInputGroup>
          <input kuiInputGroupInput />
          <div kuiInputGroupAddon>
            <kbd kuiKbd>Space</kbd>
          </div>
        </div>
      </div>
      <!-- KbdInTooltip -->
      <div kuiExample title="Tooltip">
        <ng-container kuiTooltip>
          <button kuiButton kuiTooltipTrigger size="icon-sm" variant="outline">
            <svg
              iconPlaceholder
              lucide="SaveIcon"
              tabler="IconDeviceFloppy"
              hugeicons="FloppyDiskIcon"
              phosphor="FloppyDiskIcon"
              remixicon="RiSaveLine"
            ></svg>
          </button>
          <div kuiTooltipContent [sx]="styles.pr15">
            <div [sx]="styles.pair">
              Save Changes
              <kbd kuiKbd>S</kbd>
            </div>
          </div>
        </ng-container>
      </div>
      <!-- KbdWithSamp -->
      <div kuiExample title="With samp">
        <kbd kuiKbd>
          <samp>File</samp>
        </kbd>
      </div>
    </div>
  `,
})
export default class KbdExample {
  protected readonly styles = styles
}
