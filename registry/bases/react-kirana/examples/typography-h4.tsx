import { css } from "@kirana-style/core"
import {
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  space,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  h4: css({
    scrollMarginBlock: space[20],
    scrollMarginInline: space[20],
    fontSize: fontSize.xl,
    lineHeight: lineHeight.xl,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.tight,
  }),
}

export default function TypographyH4() {
  return (
    <div sx={page.example}>
      <h4 sx={styles.h4}>People stopped telling jokes</h4>
    </div>
  )
}
