import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { containerSize, space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Bubble, BubbleContent, BubbleReactions } from "../ui/bubble"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

const styles = {
  flexWFullMaxWSmFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: { "*": null, base: space[4] },
    paddingBlock: { "*": null, base: space[12] },
  }),
}

@Component({
  selector: "bubble-tooltip",
  imports: [
    Bubble,
    BubbleContent,
    BubbleReactions,
    Button,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWSmFlexColGa">
        <div kuiBubble variant="secondary">
          <div kuiBubbleContent>Did you remove the stale route?</div>
        </div>
        <div kuiBubble align="end">
          <div kuiBubbleContent>Yes, removed it from the registry.</div>
          <div kuiBubbleReactions>
            <ng-container kuiTooltip>
              <button
                kuiButton
                kuiTooltipTrigger
                variant="ghost"
                size="icon-xs"
              >
                <svg
                  iconPlaceholder
                  lucide="CheckIcon"
                  tabler="IconCheck"
                  hugeicons="Tick02Icon"
                  phosphor="CheckIcon"
                  remixicon="RiCheckLine"
                ></svg>
              </button>
              <div kuiTooltipContent>Read on Jan 5, 2026 at 4:32 PM</div>
            </ng-container>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class BubbleTooltip {
  protected readonly styles = styles
  protected readonly page = page
}
