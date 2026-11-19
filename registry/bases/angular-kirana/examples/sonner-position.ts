import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { toast } from "ngx-sonner"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"

const styles = {
  flexFlexWrapJustifyCente: css({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: { "*": null, base: space[2] },
  }),
}

@Component({
  selector: "sonner-position",
  imports: [Button, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexFlexWrapJustifyCente">
        <button
          kuiButton
          variant="outline"
          (click)="toast('Event has been created', { position: 'top-left' })"
        >
          Top Left
        </button>
        <button
          kuiButton
          variant="outline"
          (click)="toast('Event has been created', { position: 'top-center' })"
        >
          Top Center
        </button>
        <button
          kuiButton
          variant="outline"
          (click)="toast('Event has been created', { position: 'top-right' })"
        >
          Top Right
        </button>
        <button
          kuiButton
          variant="outline"
          (click)="toast('Event has been created', { position: 'bottom-left' })"
        >
          Bottom Left
        </button>
        <button
          kuiButton
          variant="outline"
          (click)="
            toast('Event has been created', { position: 'bottom-center' })
          "
        >
          Bottom Center
        </button>
        <button
          kuiButton
          variant="outline"
          (click)="
            toast('Event has been created', { position: 'bottom-right' })
          "
        >
          Bottom Right
        </button>
      </div>
    </div>
  `,
})
export default class SonnerPosition {
  protected readonly styles = styles
  protected readonly toast = toast
  protected readonly page = page
}
