import { css } from "@kirana-style/core"

import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import { toast } from "../ui/toast"

const styles = {
  itemsCenterJustifyCenter: css({
    alignItems: "center",
    justifyContent: "center",
  }),
  fit: css({ width: "fit-content" }),
}

export default function ToastExample() {
  return (
    <ExampleWrapper>
      <ToastBasic />
      <ToastWithAction />
      <ToastPromise />
    </ExampleWrapper>
  )
}

function ToastBasic() {
  return (
    <Example title="Basic" sx={styles.itemsCenterJustifyCenter}>
      <Button
        variant="outline"
        sx={styles.fit}
        onClick={() =>
          toast.add({
            title: "Event created",
            description: "Sunday, December 3 at 9:00 AM",
          })
        }
      >
        Show Toast
      </Button>
    </Example>
  )
}

function ToastWithAction() {
  function showToast() {
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

  return (
    <Example title="With Action" sx={styles.itemsCenterJustifyCenter}>
      <Button variant="outline" sx={styles.fit} onClick={showToast}>
        Show Toast
      </Button>
    </Example>
  )
}

function ToastPromise() {
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

  return (
    <Example title="Promise" sx={styles.itemsCenterJustifyCenter}>
      <Button variant="outline" sx={styles.fit} onClick={showToast}>
        Create Event
      </Button>
    </Example>
  )
}
