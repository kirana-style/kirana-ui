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
  // `shimmer-duration-1000`
  fast: css({ "--shimmer-duration": "1s" }),
}

export default function ShimmerDuration() {
  return (
    <div sx={page.example}>
      <div sx={styles.grid}>
        <div sx={styles.example}>
          <p sx={shimmer}>Generating response&hellip;</p>
          <p sx={styles.caption}>shimmer</p>
        </div>
        <div sx={styles.example}>
          <p sx={[shimmer, styles.fast]}>Generating response&hellip;</p>
          <p sx={styles.caption}>--shimmer-duration: 1s</p>
        </div>
      </div>
    </div>
  )
}
