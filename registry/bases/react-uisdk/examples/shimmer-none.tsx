import { css } from "@kirana-style/core"

import {
  breakpoint,
  fontFamily,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { shimmer } from "../../../styles/shimmer.styles"

const styles = {
  stack: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: space[3],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  // `md:shimmer-none`: `shimmerNone`'s two declarations, from the medium breakpoint up.
  mdNone: css({
    backgroundImage: { [breakpoint.md]: "none" },
    WebkitTextFillColor: { [breakpoint.md]: "currentColor" },
  }),
  caption: css({
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
}

export default function ShimmerNone() {
  return (
    <div sx={page.example}>
      <div sx={styles.stack}>
        <p sx={[shimmer, styles.mdNone]}>Generating response&hellip;</p>
        <p sx={styles.caption}>shimmer, shimmerNone from md</p>
      </div>
    </div>
  )
}
