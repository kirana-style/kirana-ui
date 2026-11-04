import { css } from "@kirana-style/core"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"
import { toast } from "../ui/toast"

export default function ToastExample() {
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

  return (
    <ExampleWrapper>
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
      <Example title="With Action" sx={styles.itemsCenterJustifyCenter}>
        <Button variant="outline" sx={styles.fit} onClick={showToastWithAction}>
          Show Toast
        </Button>
      </Example>
      <Example title="Promise" sx={styles.itemsCenterJustifyCenter}>
        <Button variant="outline" sx={styles.fit} onClick={showToastPromise}>
          Create Event
        </Button>
      </Example>
    </ExampleWrapper>
  )
}
