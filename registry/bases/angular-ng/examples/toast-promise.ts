import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { toast } from "../ui/toast"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"

function showToast() {
  void toast.promise(
    new Promise<{ name: string }>((resolve) => {
      window.setTimeout(() => resolve({ name: "Event" }), 2000)
    }),
    {
      loading: "Creating event…",
      success: (data) => `${data.name} created.`,
      error: "Could not create event.",
    }
  )
}

@Component({
  selector: "toast-promise",
  imports: [Button, SxDirective],
  template: `
    <div [sx]="page.example">
      <button kuiButton variant="outline" (click)="showToast()">
        Create Event
      </button>
    </div>
  `,
})
export default class ToastPromise {
  protected readonly showToast = showToast
  protected readonly page = page
}
