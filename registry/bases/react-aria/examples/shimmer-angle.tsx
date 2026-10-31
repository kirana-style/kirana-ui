import { css } from "@kirana-style/core"

import {
  breakpoint,
  containerSize,
  fontFamily,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { shimmerCtx } from "../../../core/context"
import { page } from "../../../styles/page.styles"
import { shimmer } from "../../../styles/shimmer.styles"

const styles = {
  // `mx-auto grid w-full max-w-lg gap-6 text-center text-sm text-muted-foreground sm:grid-cols-2`
  grid: css({
    marginInline: "auto",
    display: "grid",
    width: "100%",
    maxWidth: containerSize.lg,
    gap: space[6],
    textAlign: "center",
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
    gridTemplateColumns: { [breakpoint.sm]: "repeat(2, minmax(0, 1fr))" },
  }),
  example: css({ display: "flex", flexDirection: "column", gap: space[3] }),
  caption: css({
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
  }),
  // `shimmer-angle-45`
  angle: css({ [shimmerCtx.angle]: "45deg" }),
}

export default function ShimmerAngle() {
  return (
    <div sx={page.example}>
      <div sx={styles.grid}>
        <div sx={styles.example}>
          <p sx={shimmer}>Generating response&hellip;</p>
          <p sx={styles.caption}>shimmer</p>
        </div>
        <div sx={styles.example}>
          <p sx={[shimmer, styles.angle]}>Generating response&hellip;</p>
          <p sx={styles.caption}>shimmerCtx.angle: 45deg</p>
        </div>
      </div>
    </div>
  )
}
