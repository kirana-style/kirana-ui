import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { toast } from "ngx-sonner"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"

const styles = {
  itemsCenterJustifyCenter: css({
    alignItems: "center",
    justifyContent: "center",
  }),
  fit: css({ width: "fit-content" }),
}

@Component({
  selector: "sonner-example",
  imports: [Button, Example, ExampleWrapper, SxDirective],
  template: `
    <div kuiExampleWrapper>
      <!-- SonnerBasic -->
      <div kuiExample title="Basic" [sx]="styles.itemsCenterJustifyCenter">
        <button
          kuiButton
          (click)="toast('Event has been created')"
          variant="outline"
          [sx]="styles.fit"
        >
          Show Toast
        </button>
      </div>
      <!-- SonnerWithDescription -->
      <div
        kuiExample
        title="With Description"
        [sx]="styles.itemsCenterJustifyCenter"
      >
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
    </div>
  `,
})
export default class SonnerExample {
  protected readonly styles = styles
  protected readonly toast = toast
}
