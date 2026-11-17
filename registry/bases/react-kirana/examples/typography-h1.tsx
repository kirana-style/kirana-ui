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
  h1: css({
    scrollMarginBlock: space[20],
    scrollMarginInline: space[20],
    textAlign: "center",
    fontSize: fontSize["4xl"],
    lineHeight: lineHeight["4xl"],
    fontWeight: fontWeight.extrabold,
    letterSpacing: letterSpacing.tight,
    textWrap: "balance",
  }),
}

export default function TypographyH1() {
  return (
    <div sx={page.example}>
      <h1 sx={styles.h1}>Taxing Laughter: The Joke Tax Chronicles</h1>
    </div>
  )
}
