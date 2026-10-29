import { css } from "@kirana-style/core"
import { toast } from "sonner"

import { Example, ExampleWrapper } from "../components/example"
import { Button } from "../ui/button"

const styles = {
  itemsCenterJustifyCenter: css({
    alignItems: "center",
    justifyContent: "center",
  }),
  fit: css({ width: "fit-content" }),
}

export default function SonnerExample() {
  return (
    <ExampleWrapper>
      <SonnerBasic />
      <SonnerWithDescription />
    </ExampleWrapper>
  )
}

function SonnerBasic() {
  return (
    <Example title="Basic" sx={styles.itemsCenterJustifyCenter}>
      <Button
        onPress={() => toast("Event has been created")}
        variant="outline"
        sx={styles.fit}
      >
        Show Toast
      </Button>
    </Example>
  )
}

function SonnerWithDescription() {
  return (
    <Example title="With Description" sx={styles.itemsCenterJustifyCenter}>
      <Button
        onPress={() =>
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
  )
}
