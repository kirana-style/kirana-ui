import { css } from "@kirana-style/core"

import { fontSize, fontWeight, lineHeight, space } from "../../../core/scales"
import { theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { Separator } from "../ui/separator"

const styles = {
  root: css({
    display: "flex",
    maxWidth: "24rem",
    flexDirection: "column",
    gap: space[4],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
  heading: css({ display: "flex", flexDirection: "column", gap: space["1.5"] }),
  title: css({ lineHeight: 1, fontWeight: fontWeight.medium }),
  muted: css({ color: theme.mutedForeground }),
}

export default function SeparatorDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.root}>
        <div sx={styles.heading}>
          <div sx={styles.title}>shadcn/ui</div>
          <div sx={styles.muted}>The Foundation for your Design System</div>
        </div>
        <Separator />
        <div>
          A set of beautifully designed components that you can customize,
          extend, and build on.
        </div>
      </div>
    </div>
  )
}
