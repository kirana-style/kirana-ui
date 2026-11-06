import { Component } from "@angular/core"
import { SxDirective } from "@kirana-style/angular"
import { css } from "@kirana-style/core"
import { toast } from "../ui/toast"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"

const styles = {
  itemsCenterJustifyCenter: css({
    alignItems: "center",
    justifyContent: "center",
  }),
  fit: css({ width: "fit-content" }),
}

function showToastWithAction() {
  const id = toast.add({
    title: "Event created",
    description: "You can undo this action.",
    actionProps: {
      children: "Undo",
      onClick() {
        toast.close(id)
        toast.add({
          description: "Event creation undone.",
        })
      },
    },
  })
}

function showToastPromise() {
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
  selector: "toast-example",
  imports: [Button, Example, ExampleWrapper, SxDirective],
  template: `
    <div kuiExampleWrapper>
      <!-- ToastBasic -->
      <div kuiExample title="Basic" [sx]="styles.itemsCenterJustifyCenter">
        <button
          kuiButton
          variant="outline"
          [sx]="styles.fit"
          (click)="
            toast.add({
              title: 'Event created',
              description: 'Sunday, December 3 at 9:00 AM',
            })
          "
        >
          Show Toast
        </button>
      </div>
      <!-- ToastWithAction -->
      <div
        kuiExample
        title="With Action"
        [sx]="styles.itemsCenterJustifyCenter"
      >
        <button
          kuiButton
          variant="outline"
          [sx]="styles.fit"
          (click)="showToastWithAction()"
        >
          Show Toast
        </button>
      </div>
      <!-- ToastPromise -->
      <div kuiExample title="Promise" [sx]="styles.itemsCenterJustifyCenter">
        <button
          kuiButton
          variant="outline"
          [sx]="styles.fit"
          (click)="showToastPromise()"
        >
          Create Event
        </button>
      </div>
    </div>
  `,
})
export default class ToastExample {
  protected readonly styles = styles
  protected readonly showToastWithAction = showToastWithAction
  protected readonly showToastPromise = showToastPromise
  protected readonly toast = toast
}
