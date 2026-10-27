/**
 * A chapter's heading, as the Kirana site's `chapter.tsx`: a label row (the chapter's number in
 * the primary colour, its name in small mono capitals, a hairline to the edge), the title in
 * Kirana's display face at its regular weight, and a lede.
 */
import { css } from "@kirana-style/core"

import { DISPLAY, SERIF } from "@/components/kirana-type"
import { fontFamily, fontWeight, space } from "@workspace/registry/core/scales"
import { theme } from "@workspace/registry/core/tokens"

const styles = {
  head: css({ display: "grid", gap: space[4] }),
  labelRow: css({
    display: "flex",
    alignItems: "center",
    gap: space[3],
    minWidth: 0,
    fontFamily: fontFamily.mono,
    fontSize: "0.6875rem",
    lineHeight: "1.45",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  }),
  number: css({ color: theme.primary, fontWeight: fontWeight.medium }),
  name: css({ color: theme.foreground, whiteSpace: "nowrap" }),
  rule: css({
    flex: "1 1 auto",
    minWidth: space[6],
    height: "1px",
    backgroundColor: theme.border,
  }),
  title: css({
    maxWidth: "48rem",
    fontFamily: SERIF,
    fontSize: DISPLAY.title.fontSize,
    lineHeight: DISPLAY.title.lineHeight,
    letterSpacing: DISPLAY.title.letterSpacing,
    fontWeight: 400,
    color: theme.foreground,
    textWrap: "balance",
  }),
  lede: css({
    maxWidth: "42rem",
    fontSize: DISPLAY.lede.fontSize,
    lineHeight: DISPLAY.lede.lineHeight,
    color: theme.mutedForeground,
    textWrap: "pretty",
  }),
}

export function Chapter({
  number,
  label,
  title,
  lede,
}: {
  number?: string
  label?: React.ReactNode
  title: React.ReactNode
  lede?: React.ReactNode
}) {
  return (
    <div sx={styles.head}>
      {label ? (
        <div sx={styles.labelRow}>
          {number ? <span sx={styles.number}>{number}</span> : null}
          <span sx={styles.name}>{label}</span>
          <span sx={styles.rule} aria-hidden="true" />
        </div>
      ) : null}
      <h2 sx={styles.title}>{title}</h2>
      {lede ? <p sx={styles.lede}>{lede}</p> : null}
    </div>
  )
}
