import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { fontSize, lineHeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { Kbd, KbdGroup } from "../ui/kbd"

const styles = {
  flexFlexColItemsCenterGa: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: { "*": null, base: space[4] },
  }),
  textSmTextMutedForegroun: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
}

@Component({
  selector: "kbd-group",
  imports: [Kbd, KbdGroup, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexFlexColItemsCenterGa">
        <p [sx]="styles.textSmTextMutedForegroun">
          Use
          <kbd kuiKbdGroup>
            <kbd kuiKbd>Ctrl + B</kbd>
            <kbd kuiKbd>Ctrl + K</kbd>
          </kbd>
          to open the command palette
        </p>
      </div>
    </div>
  `,
})
export default class KbdGroupExample {
  protected readonly styles = styles
  protected readonly page = page
}
