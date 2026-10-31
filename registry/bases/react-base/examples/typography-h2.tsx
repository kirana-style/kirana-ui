import { css } from "@kirana-style/core"
import {
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  space,
} from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"

const styles = {
  h2: css({
    scrollMarginBlock: space[20],
    scrollMarginInline: space[20],
    borderBottomWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderBottomColor: theme.border,
    paddingBottom: space[2],
    fontSize: fontSize["3xl"],
    lineHeight: lineHeight["3xl"],
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.tight,
    marginTop: { ":first-child": space["0"] },
  }),
}

export default function TypographyH2() {
  return (
    <div sx={page.example}>
      <h2 sx={styles.h2}>The People of the Kingdom</h2>
    </div>
  )
}
