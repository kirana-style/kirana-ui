import { css } from "@kirana-style/core"

import { fontSize, lineHeight } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { shimmer } from "../../../styles/shimmer.styles"

const styles = {
  // `text-sm text-muted-foreground`
  text: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
  }),
}

export default function ShimmerDemo() {
  return (
    <div sx={page.example}>
      <p sx={[shimmer, styles.text]}>Generating response&hellip;</p>
    </div>
  )
}
