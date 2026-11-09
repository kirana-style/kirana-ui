import { Component, input } from "@angular/core"
import { Button } from "../../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip"

@Component({
  selector: "kui-message-action",
  imports: [Button, Tooltip, TooltipContent, TooltipTrigger],
  host: { style: "display: contents" },
  template: `
    <ng-container kuiTooltip>
      <button
        kuiButton
        kuiTooltipTrigger
        variant="ghost"
        size="icon-sm"
        [attr.aria-label]="label()"
        [attr.aria-pressed]="pressed()"
      >
        <ng-content />
      </button>
      <div kuiTooltipContent>
        <p>{{ label() }}</p>
      </div>
    </ng-container>
  `,
})
/**
 * A message's action: an icon button with its label as a tooltip. A press on it reaches the
 * element's own `(click)`, and `pressed` sets its `aria-pressed`.
 */
export class MessageAction {
  readonly label = input.required<string>()
  readonly pressed = input<boolean>()
}
