import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Kbd, KbdGroup } from "../ui/kbd"

const styles = {
  flexFlexColItemsCenterGa: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: { "*": null, base: space[4] },
  }),
}

@Component({
  selector: "kbd-demo",
  imports: [Kbd, KbdGroup, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexFlexColItemsCenterGa">
        <kbd kuiKbdGroup>
          <kbd kuiKbd>⌘</kbd>
          <kbd kuiKbd>⇧</kbd>
          <kbd kuiKbd>⌥</kbd>
          <kbd kuiKbd>⌃</kbd>
        </kbd>
        <kbd kuiKbdGroup>
          <kbd kuiKbd>Ctrl</kbd>
          <span>+</span>
          <kbd kuiKbd>B</kbd>
        </kbd>
      </div>
    </div>
  `,
})
export default class KbdDemo {
  protected readonly styles = styles
  protected readonly page = page
}
