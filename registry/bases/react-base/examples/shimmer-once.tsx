import * as React from "react"
import { css } from "@kirana-style/core"

import { Button } from "../ui/button"
import { fontSize, lineHeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { shimmerCtx } from "../../../core/context"
import { page } from "../../../styles/page.styles"
import { shimmer, shimmerOnce } from "../../../styles/shimmer.styles"

const styles = {
  stack: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: space[4],
  }),
  // `text-sm text-muted-foreground shimmer-duration-1100`
  text: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
    [shimmerCtx.duration]: "1100ms",
  }),
}

export default function ShimmerOnce() {
  const [key, setKey] = React.useState(0)

  return (
    <div sx={page.example}>
      <div sx={styles.stack}>
        <p key={key} sx={[shimmer, styles.text, shimmerOnce]}>
          Generating response&hellip;
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setKey((value) => value + 1)}
        >
          Replay
        </Button>
      </div>
    </div>
  )
}
