import { css } from "@kirana-style/core"
import { space } from "../../../core/scales"
import { page } from "../../../styles/page.styles"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"

export default function TextareaButton() {
  const styles = {
    stack: css({ display: "grid", width: "100%", gap: space[2] }),
  }

  return (
    <div sx={page.example}>
      <div sx={[styles.stack, page.narrow]}>
        <Textarea placeholder="Type your message here." />
        <Button>Send message</Button>
      </div>
    </div>
  )
}
