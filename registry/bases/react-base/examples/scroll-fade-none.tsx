import { css } from "@kirana-style/core"

import {
  containerSize,
  fontFamily,
  fontSize,
  lineHeight,
  space,
} from "../../../core/scales"
import { radius, theme } from "../../../core/tokens"
import { page } from "../../../styles/page.styles"
import { scrollFade, scrollFadeNone } from "../../../styles/scroll-fade.styles"

const styles = {
  stack: css({
    marginInline: "auto",
    display: "flex",
    width: "100%",
    maxWidth: containerSize.xs,
    minWidth: "0",
    flexDirection: "column",
    gap: space[6],
  }),
  example: css({ display: "flex", flexDirection: "column", gap: space[3] }),
  frame: css({
    overflow: "hidden",
    borderRadius: radius["2xl"],
    borderWidth: "1px",
  }),
  scroller: css({
    height: space[48],
    scrollbarWidth: "none",
    overflowY: "auto",
  }),
  caption: css({
    textAlign: "center",
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    color: theme.mutedForeground,
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

export default function ScrollFadeNone() {
  return (
    <div sx={page.example}>
      <div sx={styles.stack}>
        <div sx={styles.example}>
          <div sx={styles.frame}>
            <div sx={[scrollFade, styles.scroller]}>
              <ScrollFadeNoneItems />
            </div>
          </div>
          <p sx={styles.caption}>scrollFade</p>
        </div>
        <div sx={styles.example}>
          <div sx={styles.frame}>
            <div sx={[scrollFade, styles.scroller, scrollFadeNone]}>
              <ScrollFadeNoneItems />
            </div>
          </div>
          <p sx={styles.caption}>scrollFade, scrollFadeNone</p>
        </div>
      </div>
    </div>
  )
}

function ScrollFadeNoneItems() {
  return (
    <div sx={styles.list}>
      {Array.from({ length: 8 }, (_, index) => (
        <div key={index} sx={styles.item}>
          Item {index + 1}
        </div>
      ))}
    </div>
  )
}
