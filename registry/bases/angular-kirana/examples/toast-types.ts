import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { toast } from "../ui/toast"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"

const styles = {
  flexFlexWrapGap2: css({
    display: "flex",
    flexWrap: "wrap",
    gap: { "*": null, base: space[2] },
  }),
}

@Component({
  selector: "toast-types",
  imports: [Button, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexFlexWrapGap2">
        <button
          kuiButton
          variant="outline"
          (click)="toast.add({ description: 'Event has been created.' })"
        >
          Default
        </button>
        <button
          kuiButton
          variant="outline"
          (click)="
            toast.add({
              type: 'success',
              description: 'Event has been created.',
            })
          "
        >
          Success
        </button>
        <button
          kuiButton
          variant="outline"
          (click)="
            toast.add({
              type: 'info',
              description: 'Arrive 10 minutes before the event.',
            })
          "
        >
          Info
        </button>
        <button
          kuiButton
          variant="outline"
          (click)="
            toast.add({
              type: 'warning',
              description: 'The event cannot start before 8:00 AM.',
            })
          "
        >
          Warning
        </button>
        <button
          kuiButton
          variant="outline"
          (click)="
            toast.add({
              type: 'error',
              description: 'The event could not be created.',
              priority: 'high',
            })
          "
        >
          Error
        </button>
      </div>
    </div>
  `,
})
export default class ToastTypes {
  protected readonly styles = styles
  protected readonly toast = toast
  protected readonly page = page
}
