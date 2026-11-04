import { css } from "@kirana-style/core"
import { Button } from "../ui/button"
import { Kbd } from "../ui/kbd"
import { spacing } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

export default function KbdButton() {
  const styles = {
    translateX05: css({ translate: `${spacing(0.5)} 0` }),
  }

  return (
    <div sx={page.example}>
      <Button variant="outline">
        Accept{" "}
        <Kbd data-icon="inline-end" sx={styles.translateX05}>
          ⏎
        </Kbd>
      </Button>
    </div>
  )
}
