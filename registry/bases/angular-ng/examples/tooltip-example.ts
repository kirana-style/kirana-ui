import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { fontSize, fontWeight, lineHeight, space } from "../../../core/scales"
import { IconPlaceholder } from "../../../icons/angular"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import { Kbd } from "../ui/kbd"
import type { Side } from "../../../lib/angular/popup"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

const styles = {
  tooltipBasicButton: css({
    width: { "*": null, base: "fit-content" },
  }),
  tooltipSidesDiv: css({
    display: "flex",
    flexWrap: "wrap",
    gap: space[2],
  }),
  tooltipSidesButton: css({
    width: { "*": null, base: "fit-content" },
    textTransform: { "*": null, base: "capitalize" },
  }),
  tooltipWithIconSpan: css({
    borderWidth: "0",
    clipPath: "inset(50%)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  }),
  tooltipLongContentButton: css({
    width: { "*": null, base: "fit-content" },
  }),
  tooltipDisabledSpan: css({
    display: { "*": null, base: "inline-block" },
    width: { "*": null, base: "fit-content" },
  }),
  tooltipOnLinkA: css({
    width: "fit-content",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.primary,
    textUnderlineOffset: "4px",
    textDecorationLine: { ":hover": "underline" },
  }),
  tooltipFormattedButton: css({
    width: { "*": null, base: "fit-content" },
  }),
  tooltipFormattedDiv: css({
    display: "flex",
    flexDirection: "column",
    gap: space[1],
  }),
  tooltipFormattedP: css({
    fontWeight: fontWeight.semibold,
  }),
  tooltipFormattedP2: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    opacity: "80%",
  }),
}

@Component({
  selector: "tooltip-example",
  imports: [
    Button,
    Example,
    ExampleWrapper,
    Kbd,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div kuiExampleWrapper>
      <!-- TooltipBasic -->
      <div kuiExample title="Basic">
        <ng-container kuiTooltip>
          <button
            kuiButton
            kuiTooltipTrigger
            variant="outline"
            [sx]="styles.tooltipBasicButton"
          >
            Show Tooltip
          </button>
          <div kuiTooltipContent>
            <p>Add to library</p>
          </div>
        </ng-container>
      </div>
      <!-- TooltipSides -->
      <div kuiExample title="Sides">
        <div [sx]="styles.tooltipSidesDiv">
          @for (side of sides; track side) {
            <ng-container kuiTooltip>
              <button
                kuiButton
                kuiTooltipTrigger
                variant="outline"
                [sx]="styles.tooltipSidesButton"
              >
                {{ side.replace("-", " ") }}
              </button>
              <div kuiTooltipContent [side]="side">
                <p>Add to library</p>
              </div>
            </ng-container>
          }
        </div>
      </div>
      <!-- TooltipWithIcon -->
      <div kuiExample title="With Icon">
        <ng-container kuiTooltip>
          <button kuiButton kuiTooltipTrigger variant="ghost" size="icon">
            <svg
              iconPlaceholder
              lucide="InfoIcon"
              tabler="IconInfoCircle"
              hugeicons="AlertCircleIcon"
              phosphor="InfoIcon"
              remixicon="RiInformationLine"
            ></svg>
            <span [sx]="styles.tooltipWithIconSpan">Info</span>
          </button>
          <div kuiTooltipContent>
            <p>Additional information</p>
          </div>
        </ng-container>
      </div>
      <!-- TooltipLongContent -->
      <div kuiExample title="Long Content">
        <ng-container kuiTooltip>
          <button
            kuiButton
            kuiTooltipTrigger
            variant="outline"
            [sx]="styles.tooltipLongContentButton"
          >
            Show Tooltip
          </button>
          <div kuiTooltipContent>
            To learn more about how this works, check out the docs. If you have
            any questions, please reach out to us.
          </div>
        </ng-container>
      </div>
      <!-- TooltipDisabled -->
      <div kuiExample title="Disabled">
        <ng-container kuiTooltip>
          <span kuiTooltipTrigger [sx]="styles.tooltipDisabledSpan">
            <button kuiButton variant="outline" disabled>Disabled</button>
          </span>
          <div kuiTooltipContent>
            <p>This feature is currently unavailable</p>
          </div>
        </ng-container>
      </div>
      <!-- TooltipWithKeyboard -->
      <div kuiExample title="With Keyboard Shortcut">
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
      <!-- TooltipOnLink -->
      <div kuiExample title="On Link">
        <ng-container kuiTooltip>
          <a
            kuiTooltipTrigger
            href="#"
            [sx]="styles.tooltipOnLinkA"
            (click)="$event.preventDefault()"
            >Learn more</a
          >
          <div kuiTooltipContent>
            <p>Click to read the documentation</p>
          </div>
        </ng-container>
      </div>
      <!-- TooltipFormatted -->
      <div kuiExample title="Formatted Content">
        <ng-container kuiTooltip>
          <button
            kuiButton
            kuiTooltipTrigger
            variant="outline"
            [sx]="styles.tooltipFormattedButton"
          >
            Status
          </button>
          <div kuiTooltipContent>
            <div [sx]="styles.tooltipFormattedDiv">
              <p [sx]="styles.tooltipFormattedP">Active</p>
              <p [sx]="styles.tooltipFormattedP2">Last updated 2 hours ago</p>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `,
})
export default class TooltipExample {
  protected readonly sides: Side[] = [
    "inline-start",
    "left",
    "top",
    "bottom",
    "right",
    "inline-end",
  ]
  protected readonly styles = styles
}
