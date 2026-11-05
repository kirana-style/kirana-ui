import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Bubble, BubbleContent, BubbleReactions } from "../ui/bubble"
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
  flexWFullMaxWSmFlexColGa: css({
    display: "flex",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    flexDirection: "column",
    gap: { "*": null, base: space[4] },
    paddingBlock: { "*": null, base: space[12] },
  }),
  ariaExpandedTextDestruct: css({
    color: { '[aria-expanded="true"]': theme.destructive },
  }),
  textSm: css({ fontSize: fontSize.sm, lineHeight: lineHeight.sm }),
}

@Component({
  selector: "bubble-popover",
  imports: [
    Bubble,
    BubbleContent,
    BubbleReactions,
    Button,
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexWFullMaxWSmFlexColGa">
        <div kuiBubble align="end">
          <div kuiBubbleContent>Run the build script.</div>
        </div>
        <div kuiBubble variant="destructive">
          <div kuiBubbleContent>Failed to run the command.</div>
          <div kuiBubbleReactions>
            <ng-container kuiPopover>
              <button
                kuiButton
                kuiPopoverTrigger
                variant="ghost"
                size="icon-xs"
                aria-label="Show error details"
                [sx]="styles.ariaExpandedTextDestruct"
              >
                <svg
                  iconPlaceholder
                  lucide="InfoIcon"
                  tabler="IconInfoCircle"
                  hugeicons="AlertCircleIcon"
                  phosphor="InfoIcon"
                  remixicon="RiInformationLine"
                ></svg>
              </button>
              <div kuiPopoverContent>
                <div kuiPopoverHeader>
                  <h2 kuiPopoverTitle [sx]="styles.textSm">
                    Command failed with exit code 1
                  </h2>
                  <p kuiPopoverDescription [sx]="styles.textSm">
                    ENOENT: no such file or directory, open pnpm-lock.yaml
                  </p>
                </div>
              </div>
            </ng-container>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class BubblePopover {
  protected readonly styles = styles
  protected readonly page = page
}
