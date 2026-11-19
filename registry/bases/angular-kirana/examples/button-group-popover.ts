import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontSize, lineHeight } from "../../../core/scales"
import { radius } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Button } from "../ui/button"
import { ButtonGroup } from "../ui/button-group"
import { Field, FieldDescription, FieldLabel } from "../ui/field"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../ui/popover"
import { Textarea } from "../ui/textarea"

const styles = {
  roundedXlTextSm: css({
    borderRadius: radius.xl,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  resizeNone: css({ resize: "none" }),
}

@Component({
  selector: "button-group-popover",
  imports: [
    Button,
    ButtonGroup,
    Field,
    FieldDescription,
    FieldLabel,
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
    Textarea,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiButtonGroup>
        <button kuiButton variant="outline">
          <svg
            iconPlaceholder
            lucide="BotIcon"
            tabler="IconRobot"
            hugeicons="RoboticIcon"
            phosphor="RobotIcon"
            remixicon="RiRobotLine"
          ></svg>
          Copilot
        </button>
        <ng-container kuiPopover>
          <button
            kuiButton
            kuiPopoverTrigger
            variant="outline"
            size="icon"
            aria-label="Open Popover"
          >
            <svg
              iconPlaceholder
              lucide="ChevronDownIcon"
              tabler="IconChevronDown"
              hugeicons="ArrowDown01Icon"
              phosphor="CaretDownIcon"
              remixicon="RiArrowDownSLine"
            ></svg>
          </button>
          <div kuiPopoverContent align="end" [sx]="styles.roundedXlTextSm">
            <div kuiPopoverHeader>
              <h2 kuiPopoverTitle>Start a new task with Copilot</h2>
              <p kuiPopoverDescription>
                Describe your task in natural language.
              </p>
            </div>
            <div kuiField>
              <label kuiFieldLabel for="task" [sx]="visuallyHidden"
                >Task Description</label
              >
              <textarea
                kuiTextarea
                id="task"
                placeholder="I need to..."
                [sx]="styles.resizeNone"
              ></textarea>
              <p kuiFieldDescription>
                Copilot will open a pull request for review.
              </p>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class ButtonGroupPopover {
  protected readonly styles = styles
  protected readonly page = page
  protected readonly visuallyHidden = visuallyHidden
}
