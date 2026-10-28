/**
 * The page's frame, as the Kirana site's `Rail`: a centred column, 80rem at most, ruled on both
 * sides from `md` up. The header, the footer and every section of a page outside the docs and
 * `/create` stand in one, so the rules run unbroken from the top of the page to its end, and each
 * section's bottom border crosses them.
 */
import { css, props as styleProps } from "@kirana-style/core"

import { breakpoint } from "@workspace/registry/core/scales"
import { theme } from "@workspace/registry/core/tokens"
import type { Sx } from "@workspace/registry/lib/sx"

const styles = {
  rail: css({
    position: "relative",
    width: "100%",
    maxWidth: "80rem",
    marginInline: "auto",
    borderInlineWidth: { base: "0", [breakpoint.md]: "1px" },
    borderInlineStyle: "solid",
    borderInlineColor: theme.border,
  }),
}

export function Rail({
  as: Tag = "div",
  sx,
  children,
}: {
  as?: "div" | "section" | "main"
  sx?: Sx
  children?: React.ReactNode
}) {
  // A dynamic tag is not a host element the compiler can see, so the styles are spread as props.
  return <Tag {...styleProps(styles.rail, sx)}>{children}</Tag>
}
