/**
 * shadcn/ui's mark of a recently added page (`size-2 rounded-full bg-blue-500`), beside its title in
 * the sidebar and in the components list: a blue dot, read as "New".
 */
import { css } from "@kirana-style/core"

import { spacing } from "./tokens.ts"

const styles = {
  dot: css({
    display: "inline-block",
    flexShrink: 0,
    width: spacing[2],
    height: spacing[2],
    marginInlineStart: spacing[2],
    verticalAlign: "middle",
    borderRadius: "9999px",
    // Tailwind's `blue-500`.
    backgroundColor: "oklch(0.623 0.214 259.815)",
  }),
  hidden: css({
    position: "absolute",
    width: "1px",
    height: "1px",
    overflow: "hidden",
    clipPath: "inset(50%)",
    whiteSpace: "nowrap",
  }),
}

export function NewDot() {
  return (
    <>
      <span sx={styles.hidden}>New</span>
      <span aria-hidden="true" title="New" sx={styles.dot} />
    </>
  )
}
