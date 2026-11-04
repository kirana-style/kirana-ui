import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { spacing } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { Kbd } from "../ui/kbd"

const styles = {
  translateX05: css({ translate: `${spacing(0.5)} 0` }),
}

@Component({
  selector: "kbd-button",
  imports: [Button, Kbd, SxDirective],
  template: `
    <div [sx]="page.example">
      <button kuiButton variant="outline">
        Accept
        <kbd kuiKbd data-icon="inline-end" [sx]="styles.translateX05">⏎</kbd>
      </button>
    </div>
  `,
})
export default class KbdButton {
  protected readonly styles = styles
  protected readonly page = page
}
