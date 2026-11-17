import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { fontSize, lineHeight } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  p: css({
    fontSize: fontSize.xl,
    lineHeight: lineHeight.xl,
    color: theme.mutedForeground,
  }),
}

export default function TypographyLead() {
  return (
    <div sx={page.example}>
      <p sx={styles.p}>
        A modal dialog that interrupts the user with important content and
        expects a response.
      </p>
    </div>
  )
}
