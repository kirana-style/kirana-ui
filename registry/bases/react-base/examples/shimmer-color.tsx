import { css } from "@kirana-style/core"

import { color, fontSize, lineHeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { shimmer } from "../../../styles/shimmer.styles"

const styles = {
  // `flex flex-col items-center gap-2 text-sm text-muted-foreground`
  stack: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: space[2],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
  // `shimmer-color-blue-500/60`
  blue: css({
    "--shimmer-color": `color-mix(in oklch, ${color.blue[500]} 60%, transparent)`,
  }),
  // `shimmer-color-[#378ADD]`
  custom: css({ "--shimmer-color": "#378add" }),
}

export default function ShimmerColor() {
  return (
    <div sx={page.example}>
      <div sx={styles.stack}>
        <p sx={[shimmer, styles.blue]}>Generating response&hellip;</p>
        <p sx={[shimmer, styles.custom]}>Generating response&hellip;</p>
      </div>
    </div>
  )
}
