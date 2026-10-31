import { css } from "@kirana-style/core"
import { theme } from "../../../core/tokens"
import {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
} from "../../../core/scales"
import { page } from "../../../styles/page.styles"

const styles = {
  code: css({
    position: "relative",
    borderRadius: "0.25rem",
    backgroundColor: theme.muted,
    paddingInline: "0.3rem",
    paddingBlock: "0.2rem",
    fontFamily: fontFamily.mono,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.semibold,
  }),
}

export default function TypographyInlineCode() {
  return (
    <div sx={page.example}>
      <code sx={styles.code}>@radix-ui/react-alert-dialog</code>
    </div>
  )
}
