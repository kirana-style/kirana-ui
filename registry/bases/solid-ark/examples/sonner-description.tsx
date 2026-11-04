import { css } from "@kirana-style/core"
import { toast } from "solid-sonner"
import { Button } from "../ui/button"
import { page } from "../../../styles/page.styles"

export default function SonnerDescription() {
  const styles = {
    fit: css({ width: "fit-content" }),
  }

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
