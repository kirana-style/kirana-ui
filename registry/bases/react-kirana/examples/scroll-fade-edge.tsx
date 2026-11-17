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
import {
  scrollFadeB,
  scrollFadeE,
  scrollFadeS,
  scrollFadeT,
} from "../../../styles/scroll-fade.styles"

const items = [
  "Inbox triage",
  "Design review",
  "API contract",
  "QA pass",
  "Launch notes",
  "Metrics follow-up",
]

const tags = [
  "Design",
  "Engineering",
  "Marketing",
  "Product",
  "Research",
  "Sales",
  "Support",
  "Operations",
]

const styles = {
  // `mx-auto flex max-w-xs min-w-0 flex-col gap-6`
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
    // Upstream's base layer gives every border `border-border`; the registry's reset cannot.
    borderColor: theme.border,
  }),
  vertical: css({
    height: space[36],
    scrollbarWidth: "none",
    overflowY: "auto",
  }),
  horizontal: css({ scrollbarWidth: "none", overflowX: "auto" }),
  // `text-center font-mono text-xs text-muted-foreground`
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
  row: css({
    display: "flex",
    width: "max-content",
    gap: space["1.5"],
    padding: space["1.5"],
  }),
  item: css({
    flexShrink: 0,
    borderRadius: radius.lg,
    backgroundColor: theme.muted,
    paddingInline: space[3],
    paddingBlock: space["2.5"],
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
  }),
}

export default function ScrollFadeEdge() {
  return (
    <div sx={page.example}>
      <div sx={styles.stack}>
        <div sx={styles.example}>
          <div sx={styles.frame}>
            <div sx={[scrollFadeT, styles.vertical]}>
              <ScrollFadeEdgeItems />
            </div>
          </div>
          <p sx={styles.caption}>scrollFadeT</p>
        </div>
        <div sx={styles.example}>
          <div sx={styles.frame}>
            <div sx={[scrollFadeB, styles.vertical]}>
              <ScrollFadeEdgeItems />
            </div>
          </div>
          <p sx={styles.caption}>scrollFadeB</p>
        </div>
        <div sx={styles.example}>
          <div sx={styles.frame}>
            <div sx={[scrollFadeS, styles.horizontal]}>
              <ScrollFadeEdgeTags />
            </div>
          </div>
          <p sx={styles.caption}>scrollFadeS</p>
        </div>
        <div sx={styles.example}>
          <div sx={styles.frame}>
            <div sx={[scrollFadeE, styles.horizontal]}>
              <ScrollFadeEdgeTags />
            </div>
          </div>
          <p sx={styles.caption}>scrollFadeE</p>
        </div>
      </div>
    </div>
  )
}

function ScrollFadeEdgeItems() {
  return (
    <div sx={styles.list}>
      {items.map((item) => (
        <div key={item} sx={styles.item}>
          {item}
        </div>
      ))}
    </div>
  )
}

function ScrollFadeEdgeTags() {
  return (
    <div sx={styles.row}>
      {tags.map((tag) => (
        <div key={tag} sx={styles.item}>
          {tag}
        </div>
      ))}
    </div>
  )
}
