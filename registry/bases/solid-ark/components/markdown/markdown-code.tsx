/** Inline code. Fenced code renders through `MarkdownPre`, which reads its element's text. */
import { css } from "@kirana-style/core"
import type { JSX } from "solid-js"

import { fontFamily, space } from "../../../../core/scales"
import { radius, theme } from "../../../../core/tokens"

const styles = {
  code: css({
    borderRadius: radius.sm,
    backgroundColor: theme.muted,
    paddingInline: space[1],
    paddingBlock: space["0.5"],
    fontFamily: fontFamily.mono,
    fontSize: "0.9em",
  }),
}

export function MarkdownCode(props: {
  children?: JSX.Element
  [attribute: string]: unknown
}) {
  return <code sx={styles.code}>{props.children}</code>
}
