import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { toast } from "ngx-sonner"
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

const showPromise = () =>
  toast.promise<{ name: string }>(
    () =>
      new Promise((resolve) =>
        setTimeout(() => resolve({ name: "Event" }), 2000)
      ),
    {
      loading: "Loading...",
      success: (data: { name: string }) => `${data.name} has been created`,
      error: "Error",
    }
  )

@Component({
  selector: "sonner-types",
  imports: [Button, SxDirective],
  template: `
    <div [sx]="page.example">
      <div [sx]="styles.flexFlexWrapGap2">
        <button
          kuiButton
          variant="outline"
          (click)="toast('Event has been created')"
        >
          Default
        </button>
        <button
          kuiButton
          variant="outline"
          (click)="toast.success('Event has been created')"
        >
          Success
        </button>
        <button
          kuiButton
          variant="outline"
          (click)="
            toast.info('Be at the area 10 minutes before the event time')
          "
        >
          Info
        </button>
        <button
          kuiButton
          variant="outline"
          (click)="toast.warning('Event start time cannot be earlier than 8am')"
        >
          Warning
        </button>
        <button
          kuiButton
          variant="outline"
          (click)="toast.error('Event has not been created')"
        >
          Error
        </button>
        <button kuiButton variant="outline" (click)="showPromise()">
          Promise
        </button>
      </div>
    </div>
  `,
})
export default class SonnerTypes {
  protected readonly styles = styles
  protected readonly showPromise = showPromise
  protected readonly toast = toast
  protected readonly page = page
}
