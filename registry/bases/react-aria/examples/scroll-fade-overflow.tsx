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
  frame: css({
    marginInline: "auto",
    width: "100%",
    maxWidth: containerSize.xs,
    overflow: "hidden",
    borderRadius: radius["2xl"],
    borderWidth: "1px",
  }),
  scroller: css({ scrollbarWidth: "none", overflowY: "auto" }),
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

/** Three items do not overflow, so the same `scrollFade` draws no fade. */
export default function ScrollFadeOverflow() {
  return (
    <div sx={page.example}>
      <div sx={styles.frame}>
        <div sx={[scrollFade, styles.scroller]}>
          <div sx={styles.list}>
            {Array.from({ length: 3 }, (_, index) => (
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
