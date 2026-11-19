import { css } from "@kirana-style/core"
import { toast } from "solid-sonner"
import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"

export default function SonnerExample() {
  const styles = {
    itemsCenterJustifyCenter: css({
      alignItems: "center",
      justifyContent: "center",
    }),
    fit: css({ width: "fit-content" }),
  }

  return (
    <ExampleWrapper>
      <Example title="Basic" sx={styles.itemsCenterJustifyCenter}>
        <Button
          onClick={() => toast("Event has been created")}
          variant="outline"
          sx={styles.fit}
        >
          Show Toast
        </Button>
      </Example>
      <Example title="With Description" sx={styles.itemsCenterJustifyCenter}>
        <Button
          onClick={() =>
            toast("Event has been created", {
              description: "Monday, January 3rd at 6:00pm",
            })
          }
          variant="outline"
          sx={styles.fit}
        >
          Show Toast
        </Button>
      </Example>
    </ExampleWrapper>
  )
}
