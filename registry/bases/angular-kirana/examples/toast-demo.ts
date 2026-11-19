import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { toast } from "../ui/toast"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"

function showToast() {
  const id = toast.add({
    title: "Event created",
    description: "Sunday, December 3 at 9:00 AM",
    actionProps: {
      children: "Undo",
      onClick() {
        toast.close(id)
      },
    },
  })
}

@Component({
  selector: "toast-demo",
  imports: [Button, SxDirective],
  template: `
    <div [sx]="page.example">
      <button kuiButton variant="outline" (click)="showToast()">
        Show Toast
      </button>
    </div>
  `,
})
export default class ToastDemo {
  protected readonly showToast = showToast
  protected readonly page = page
}
