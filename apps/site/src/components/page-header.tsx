/**
 * A page's header, as upstream's `PageHeader`: the heading, its description and the page's calls to
 * action, centred. The home page and `/blocks` open with it.
 */
import { css } from "@kirana-style/core"

import {
  breakpoint,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  space,
} from "@workspace/registry/core/scales"
import { theme } from "@workspace/registry/core/tokens"

const styles = {
  header: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: space[4],
    marginInline: "auto",
    maxWidth: "48rem",
    paddingInline: space[4],
    paddingBlock: { base: space[16], [breakpoint.md]: space[24] },
    textAlign: "center",
  }),
  heading: css({
    fontSize: { base: fontSize["3xl"], [breakpoint.md]: fontSize["5xl"] },
    lineHeight: 1.1,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.tight,
    textWrap: "balance",
  }),
  description: css({
    maxWidth: "40rem",
    fontSize: fontSize.lg,
    lineHeight: lineHeight.lg,
    color: theme.mutedForeground,
    textWrap: "balance",
  }),
  actions: css({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: space[2],
    paddingTop: space[2],
  }),
}

export function PageHeader({
  heading,
  description,
  actions,
}: {
  heading: React.ReactNode
  description: React.ReactNode
  actions?: React.ReactNode
}) {
  return (
    <section sx={styles.header}>
      <h1 sx={styles.heading}>{heading}</h1>
      <p sx={styles.description}>{description}</p>
      {actions ? <div sx={styles.actions}>{actions}</div> : null}
    </section>
  )
}
