import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"

const styles = {
  stack: css({ display: "grid", width: "100%", gap: space[2] }),
}

@Component({
  selector: "textarea-button",
  imports: [Button, Textarea, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="[styles.stack, page.narrow]">
        <textarea kuiTextarea placeholder="Type your message here."></textarea>
        <button kuiButton>Send message</button>
      </div>
    </div>
  `,
})
export default class TextareaButton {
  protected readonly styles = styles
  protected readonly page = page
}
