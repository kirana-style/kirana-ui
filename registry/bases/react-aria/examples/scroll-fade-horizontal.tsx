import { css } from "@kirana-style/core"

import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { scrollFadeX } from "../../../styles/scroll-fade.styles"

const tags = [
  "Design",
  "Engineering",
  "Marketing",
  "Product",
  "Research",
  "Sales",
  "Support",
  "Operations",
  "Finance",
  "Legal",
  "People",
  "Security",
]

const styles = {
  frame: css({
    marginInline: "auto",
    width: "100%",
    maxWidth: containerSize.xs,
    overflow: "hidden",
    borderRadius: radius["2xl"],
    borderWidth: "1px",
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
  }),
  // `scroll-fade-x scrollbar-none overflow-x-auto`
  scroller: css({ scrollbarWidth: "none", overflowX: "auto" }),
  row: css({
    display: "flex",
    width: "max-content",
    gap: space["1.5"],
    padding: space["1.5"],
  }),
  tag: css({
    flexShrink: 0,
    borderRadius: radius.lg,
    backgroundColor: theme.muted,
    paddingInline: space[3],
    paddingBlock: space["2.5"],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
}

export default function ScrollFadeHorizontal() {
  return (
    <div sx={page.example}>
      <div sx={styles.frame}>
        <div sx={[scrollFadeX, styles.scroller]}>
          <div sx={styles.row}>
            {tags.map((tag) => (
              <div key={tag} sx={styles.tag}>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
