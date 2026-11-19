import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { toast } from "ngx-sonner"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"

const styles = {
  fit: css({ width: "fit-content" }),
}

@Component({
  selector: "sonner-description",
  imports: [Button, SxDirective],
  template: `
    <div [sx]="page.example">
      <button
        kuiButton
        (click)="
          toast('Event has been created', {
            description: 'Monday, January 3rd at 6:00pm',
          })
        "
        variant="outline"
        [sx]="styles.fit"
      >
        Show Toast
      </button>
    </div>
  `,
})
export default class SonnerDescription {
  protected readonly styles = styles
  protected readonly toast = toast
  protected readonly page = page
}
