import { css } from "@kirana-style/core"
import { fontSize, fontWeight, lineHeight } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  div: css({
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    fontWeight: fontWeight.semibold,
  }),
}

export default function TypographyLarge() {
  return (
    <div sx={page.example}>
      <div sx={styles.div}>Are you absolutely sure?</div>
    </div>
  )
}
