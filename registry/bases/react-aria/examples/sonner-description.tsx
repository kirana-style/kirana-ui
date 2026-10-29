import { css } from "@kirana-style/core"
import { toast } from "sonner"

import { Button } from "../ui/button"
import { page } from "../../../styles/page.styles"

const styles = {
  fit: css({ width: "fit-content" }),
}

export default function SonnerDescription() {
  return (
    <div sx={page.example}>
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
    </div>
  )
}
