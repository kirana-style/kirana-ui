import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { axes } from "../../../core/axes"
import {
  containerSize,
  fontFamily,
  fontWeight,
  space,
  spacing,
} from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { IconPlaceholder } from "../../../icons/angular"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group"

const { maia, luma, sera } = axes.style

const styles = {
  gridWFullMaxWMdGap4: css({
    display: "grid",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.md,
    gap: { "*": null, base: space[4] },
  }),
  minH200Px: css({ minHeight: { "*": null, base: "200px" } }),
  // `border-t`, and the addon's `[.border-t]:pt-*` that a Kirana style cannot key on a class.
  borderT: css({
    borderTopWidth: "1px",
    borderTopColor: theme.border,
    paddingBlockStart: {
      base: space[2],
      [maia]: space[3],
      [luma]: spacing(3.5),
      [sera]: spacing(3.5),
    },
  }),
  mlAuto: css({ marginLeft: "auto" }),
  // `border-b`, and the addon's `[.border-b]:pb-*` that a Kirana style cannot key on a class.
  borderB: css({
    borderBottomWidth: "1px",
    borderBottomColor: theme.border,
    paddingBlockEnd: {
      base: space[2],
      [maia]: space[3],
      [luma]: spacing(3.5),
      [sera]: spacing(3.5),
    },
  }),
  fontMonoFontMedium: css({
    fontFamily: fontFamily.mono,
    fontWeight: fontWeight.medium,
  }),
}

@Component({
  selector: "input-group-textarea",
  imports: [
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupText,
    InputGroupTextarea,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.gridWFullMaxWMdGap4">
        <div kuiInputGroup>
          <textarea
            kuiInputGroupTextarea
            id="textarea-code-32"
            placeholder="console.log('Hello, world!');"
            [sx]="styles.minH200Px"
          ></textarea>
          <div kuiInputGroupAddon align="block-end" [sx]="styles.borderT">
            <span kuiInputGroupText>Line 1, Column 1</span>
            <button
              kuiInputGroupButton
              size="sm"
              [sx]="styles.mlAuto"
              variant="default"
            >
              Run
              <svg
                iconPlaceholder
                lucide="CornerDownLeftIcon"
                tabler="IconCornerDownLeft"
                hugeicons="ArrowTurnBackwardIcon"
                phosphor="ArrowBendDownLeftIcon"
                remixicon="RiCornerDownLeftLine"
              ></svg>
            </button>
          </div>
          <div kuiInputGroupAddon align="block-start" [sx]="styles.borderB">
            <span kuiInputGroupText [sx]="styles.fontMonoFontMedium">
              <svg
                iconPlaceholder
                lucide="CodeIcon"
                tabler="IconBrandJavascript"
                hugeicons="CodeIcon"
                phosphor="CodeIcon"
                remixicon="RiCodeLine"
              ></svg>
              script.js
            </span>
            <button kuiInputGroupButton [sx]="styles.mlAuto" size="icon-xs">
              <svg
                iconPlaceholder
                lucide="RefreshCcwIcon"
                tabler="IconRefresh"
                hugeicons="ReloadIcon"
                phosphor="ArrowClockwiseIcon"
                remixicon="RiRefreshLine"
              ></svg>
            </button>
            <button kuiInputGroupButton variant="ghost" size="icon-xs">
              <svg
                iconPlaceholder
                lucide="CopyIcon"
                tabler="IconCopy"
                hugeicons="Copy01Icon"
                phosphor="CopyIcon"
                remixicon="RiFileCopyLine"
              ></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class InputGroupTextareaExample {
  protected readonly styles = styles
  protected readonly page = page
  protected readonly console = console
}
