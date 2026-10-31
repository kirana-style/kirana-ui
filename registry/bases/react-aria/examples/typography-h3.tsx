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
  h3: css({
    scrollMarginBlock: space[20],
    scrollMarginInline: space[20],
    fontSize: fontSize["2xl"],
    lineHeight: lineHeight["2xl"],
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.tight,
  }),
}

export default function TypographyH3() {
  return (
    <div sx={page.example}>
      <h3 sx={styles.h3}>The Joke Tax</h3>
    </div>
  )
}
