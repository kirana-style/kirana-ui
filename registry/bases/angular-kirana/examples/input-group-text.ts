import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import {
  containerSize,
  fontSize,
  lineHeight,
  space,
  spacing,
} from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group"

const styles = {
  gridWFullMaxWSmGap6: css({
    display: "grid",
    width: { "*": null, base: "100%" },
    maxWidth: containerSize.sm,
    gap: { "*": null, base: space[6] },
  }),
  pl05: css({ paddingLeft: { "*": null, base: spacing(0.5) } }),
  textXsTextMutedForegroun: css({
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
  }),
}

@Component({
  selector: "input-group-text",
  imports: [
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
    SxDirective,
  ],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.gridWFullMaxWSmGap6">
        <div kuiInputGroup>
          <div kuiInputGroupAddon>
            <span kuiInputGroupText>$</span>
          </div>
          <input kuiInputGroupInput placeholder="0.00" />
          <div kuiInputGroupAddon align="inline-end">
            <span kuiInputGroupText>USD</span>
          </div>
        </div>
        <div kuiInputGroup>
          <div kuiInputGroupAddon>
            <span kuiInputGroupText>https://</span>
          </div>
          <input
            kuiInputGroupInput
            placeholder="example.com"
            [sx]="styles.pl05"
          />
          <div kuiInputGroupAddon align="inline-end">
            <span kuiInputGroupText>.com</span>
          </div>
        </div>
        <div kuiInputGroup>
          <input kuiInputGroupInput placeholder="Enter your username" />
          <div kuiInputGroupAddon align="inline-end">
            <span kuiInputGroupText>{{ "@" }}company.com</span>
          </div>
        </div>
        <div kuiInputGroup>
          <textarea
            kuiInputGroupTextarea
            placeholder="Enter your message"
          ></textarea>
          <div kuiInputGroupAddon align="block-end">
            <span kuiInputGroupText [sx]="styles.textXsTextMutedForegroun"
              >120 characters left</span
            >
          </div>
        </div>
      </div>
    </div>
  `,
})
export default class InputGroupTextExample {
  protected readonly styles = styles
  protected readonly page = page
}
