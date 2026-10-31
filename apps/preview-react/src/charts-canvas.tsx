/**
 * The canvas `/create`'s charts preview lays its charts on (`charts-base.tsx`, `charts-aria.tsx`):
 * `preview-02`'s, a muted ground scrolling sideways, seven columns a gap apart. The charts flow
 * through them type by type, each type under its name, and the columns are balanced: a type of
 * tall charts (radar, pie) no longer runs a column far past the others.
 */
import type { ReactNode } from "react"
import { css, select } from "@kirana-style/core"

import { axes } from "@workspace/registry/core/axes"
import {
  breakpoint,
  fontSize,
  fontWeight,
  lineHeight,
  space,
  spacing,
} from "@workspace/registry/core/scales"
import { theme } from "@workspace/registry/core/tokens"

export const styles = {
  // `preview-02`'s ground and its gap, `md:` wider, Lyra's and Mira's tighter.
  ground: css({
    overflowX: "auto",
    overflowY: "hidden",
    minHeight: "100vh",
    backgroundColor: `light-dark(${theme.muted}, ${theme.background})`,
    contain: "paint",
    "--gap": {
      base: spacing(4),
      [breakpoint.md]: spacing(10),
      [axes.style.lyra]: { [breakpoint.md]: spacing(6) },
      [axes.style.mira]: { [breakpoint.md]: spacing(6) },
    },
  }),
  center: css({
    display: "flex",
    width: "100%",
    minWidth: "max-content",
    justifyContent: "center",
  }),
  canvas: css({
    display: "block",
    width: { base: "2400px", [breakpoint.md]: "3000px" },
    columnCount: 7,
    columnFill: "balance",
    columnGap: "var(--gap)",
    // Longhands: Kirana cannot tell a variable is one value, so a shorthand stays whole.
    paddingBlockStart: "var(--gap)",
    paddingBlockEnd: "var(--gap)",
    paddingInlineStart: "var(--gap)",
    paddingInlineEnd: "var(--gap)",
  }),
  // A type's charts flow on through the columns: the section itself draws no box.
  column: css({
    display: "contents",
    [select.descendant('[data-slot="card"]')]: {
      width: "100%",
      breakInside: "avoid",
      marginBlockEnd: "var(--gap)",
    },
  }),
  heading: css({
    breakAfter: "avoid",
    marginBlockEnd: space[3],
    paddingInline: space[1],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
  }),
}

export function ChartsCanvas({ children }: { children: ReactNode }) {
  return (
    <div sx={styles.ground}>
      <div sx={styles.center}>
        <main sx={styles.canvas} data-slot="capture-target">
          {children}
        </main>
      </div>
    </div>
  )
}
