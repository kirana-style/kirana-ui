import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontFamily,
  fontSize,
  lineHeight,
} from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { visuallyHidden } from "../../../styles/visually-hidden.styles"
import { IconPlaceholder } from "../../../icons/angular"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group"

const styles = {
  narrow: css({ maxWidth: containerSize.sm }),
  hAuto: css({ height: { "*": null, base: "auto" } }),
  fontMonoTextSm: css({
    fontFamily: fontFamily.mono,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  textMutedForeground: css({ color: theme.mutedForeground }),
  fontMono: css({ fontFamily: fontFamily.mono }),
  mlAuto: css({ marginLeft: "auto" }),
}

@Component({
  selector: "input-group-block-start",
  imports: [
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
    IconPlaceholder,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div kuiFieldGroup [sx]="styles.narrow">
        <div kuiField>
          <label kuiFieldLabel for="block-start-input">Input</label>
          <div kuiInputGroup [sx]="styles.hAuto">
            <input
              kuiInputGroupInput
              id="block-start-input"
              placeholder="Enter your name"
            />
            <div kuiInputGroupAddon align="block-start">
              <span kuiInputGroupText>Full Name</span>
            </div>
          </div>
          <p kuiFieldDescription>Header positioned above the input.</p>
        </div>
        <div kuiField>
          <label kuiFieldLabel for="block-start-textarea">Textarea</label>
          <div kuiInputGroup>
            <textarea
              kuiInputGroupTextarea
              id="block-start-textarea"
              placeholder="console.log('Hello, world!');"
              [sx]="styles.fontMonoTextSm"
            ></textarea>
            <div kuiInputGroupAddon align="block-start">
              <svg
                iconPlaceholder
                lucide="FileCodeIcon"
                tabler="IconFileCode"
                hugeicons="File01Icon"
                phosphor="FileCodeIcon"
                remixicon="RiFileCodeLine"
                [sx]="styles.textMutedForeground"
              ></svg>
              <span kuiInputGroupText [sx]="styles.fontMono">script.js</span>
              <button kuiInputGroupButton size="icon-xs" [sx]="styles.mlAuto">
                <svg
                  iconPlaceholder
                  lucide="CopyIcon"
                  tabler="IconCopy"
                  hugeicons="Copy01Icon"
                  phosphor="CopyIcon"
                  remixicon="RiFileCopyLine"
                ></svg>
                <span [sx]="visuallyHidden">Copy</span>
              </button>
            </div>
          </div>
          <p kuiFieldDescription>Header positioned above the textarea.</p>
        </div>
      </div>
    </div>
  `,
})
export default class InputGroupBlockStart {
  protected readonly styles = styles
  protected readonly page = page
  protected readonly visuallyHidden = visuallyHidden
  protected readonly console = console
}
