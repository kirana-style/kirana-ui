import { css } from "@kirana-style/core"

import {
  containerSize,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { scrollFade } from "../../../styles/scroll-fade.styles"

const styles = {
  // `mx-auto w-full max-w-xs overflow-hidden rounded-2xl border`: the card around the scroller.
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
  // `h-72 scroll-fade scrollbar-none overflow-y-auto`
  scroller: css({
    height: space[72],
    scrollbarWidth: "none",
    overflowY: "auto",
  }),
  list: css({
    display: "flex",
    flexDirection: "column",
    gap: space["1.5"],
    padding: space["1.5"],
  }),
  item: css({
    borderRadius: radius.lg,
    backgroundColor: theme.muted,
    paddingInline: space[3],
    paddingBlock: space["2.5"],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
}

export default function ScrollFadeDemo() {
  return (
    <div sx={page.example}>
      <div sx={styles.frame}>
        <div sx={[scrollFade, styles.scroller]}>
          <div sx={styles.list}>
            {Array.from({ length: 12 }, (_, index) => (
              <div key={index} sx={styles.item}>
                Item {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
