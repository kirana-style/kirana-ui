import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import { fontSize, lineHeight } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  p: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
}

export default function TypographyMuted() {
  return (
    <div sx={page.example}>
      <p sx={styles.p}>Enter your email address.</p>
    </div>
  )
}
