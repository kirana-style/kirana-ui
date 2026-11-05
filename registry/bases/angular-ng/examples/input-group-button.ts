import { Component, signal } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { useCopyToClipboard } from "../../../lib/angular/use-copy-to-clipboard"
import { css } from "@kirana-style/core"
import {
  color,
  containerSize,
  fontSize,
  fontWeight,
  lineHeight,
  space,
  spacing,
} from "../../../core/scales"
import { radius, radiusBase, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

const styles = {
  gridWFullMaxWSmGap6: css({
    display: "grid",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    gap: { "*": null, base: space[6] },
  }),
  radius9999Px: css({ [radiusBase.value]: "9999px" }),
  flexFlexColGap1RoundedXl: css({
    display: "flex",
    flexDirection: "column",
    gap: { "*": null, base: space[1] },
    borderRadius: radius.xl,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  medium: css({ fontWeight: fontWeight.medium }),
  pl15TextMutedForeground: css({
    paddingLeft: { "*": null, base: spacing(1.5) },
    color: theme.mutedForeground,
  }),
  dataFavoriteTrueFillBlue: css({
    fill: { '[data-favorite="true"]': color.blue[600] },
    stroke: { '[data-favorite="true"]': color.blue[600] },
  }),
}

@Component({
  selector: "input-group-button",
  imports: [
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    Popover,
    PopoverContent,
    PopoverTrigger,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.gridWFullMaxWSmGap6">
        <div kuiInputGroup>
          <input
            kuiInputGroupInput
            placeholder="https://x.com/shadcn"
            readonly
          />
          <div kuiInputGroupAddon align="inline-end">
            <button
              kuiInputGroupButton
              aria-label="Copy"
              title="Copy"
              size="icon-xs"
              (click)="copyToClipboard('https://x.com/shadcn')"
            >
              @if (isCopied()) {
                <svg
                  iconPlaceholder
                  lucide="CheckIcon"
                  tabler="IconCheck"
                  hugeicons="Tick02Icon"
                  phosphor="CheckIcon"
                  remixicon="RiCheckLine"
                ></svg>
              } @else {
                <svg
                  iconPlaceholder
                  lucide="CopyIcon"
                  tabler="IconCopy"
                  hugeicons="Copy01Icon"
                  phosphor="CopyIcon"
                  remixicon="RiFileCopyLine"
                ></svg>
              }
            </button>
          </div>
        </div>
        <div kuiInputGroup [sx]="styles.radius9999Px">
          <ng-container kuiPopover>
            <div kuiInputGroupAddon kuiPopoverTrigger>
              <button kuiInputGroupButton variant="secondary" size="icon-xs">
                <svg
                  iconPlaceholder
                  lucide="InfoIcon"
                  tabler="IconInfoCircle"
                  hugeicons="AlertCircleIcon"
                  phosphor="InfoIcon"
                  remixicon="RiInformationLine"
                ></svg>
              </button>
            </div>
            <div
              kuiPopoverContent
              align="start"
              [sx]="styles.flexFlexColGap1RoundedXl"
            >
              <p [sx]="styles.medium">Your connection is not secure.</p>
              <p>
                You should not enter any sensitive information on this site.
              </p>
            </div>
          </ng-container>
          <div kuiInputGroupAddon [sx]="styles.pl15TextMutedForeground">
            https://
          </div>
          <input kuiInputGroupInput id="input-secure-19" />
          <div kuiInputGroupAddon align="inline-end">
            <button
              kuiInputGroupButton
              (click)="isFavorite.set(!isFavorite())"
              size="icon-xs"
            >
              <svg
                iconPlaceholder
                lucide="StarIcon"
                tabler="IconStar"
                hugeicons="StarIcon"
                phosphor="StarIcon"
                remixicon="RiStarLine"
                [attr.data-favorite]="isFavorite()"
                [sx]="styles.dataFavoriteTrueFillBlue"
              ></svg>
            </button>
          </div>
        </div>
        <div kuiInputGroup>
          <input kuiInputGroupInput placeholder="Type to search..." />
          <div kuiInputGroupAddon align="inline-end">
            <button kuiInputGroupButton variant="secondary">Search</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class InputGroupButtonExample {
  protected readonly i18n = useCopyToClipboard()
  protected readonly copyToClipboard = this.i18n.copyToClipboard
  protected readonly isCopied = this.i18n.isCopied
  protected readonly isFavorite = signal(false)
  protected readonly styles = styles
  protected readonly page = page
}
