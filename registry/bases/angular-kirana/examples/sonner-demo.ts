import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { toast } from "ngx-sonner"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"

@Component({
  selector: "sonner-demo",
  imports: [Button, SxDirective],
  template: `
    <div [sx]="page.example">
      <button
        kuiButton
        variant="outline"
        (click)="
          toast('Event has been created', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
            action: { label: 'Undo', onClick: () => console.log('Undo') },
          })
        "
      >
        Show Toast
      </button>
    </div>
  `,
})
export default class SonnerDemo {
  protected readonly console = console
  protected readonly toast = toast
  protected readonly page = page
}
