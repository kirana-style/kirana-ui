import { css } from "@kirana-style/core"
import { fontSize, fontWeight } from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  small: css({
    fontSize: fontSize.sm,
    lineHeight: "1",
    fontWeight: fontWeight.medium,
  }),
}

export default function TypographySmall() {
  return (
    <div sx={page.example}>
      <small sx={styles.small}>Email address</small>
    </div>
  )
}
