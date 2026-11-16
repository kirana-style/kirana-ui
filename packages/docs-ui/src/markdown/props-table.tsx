/**
 * `<!-- ::props rows="…" -->`: a component's props, one to a row: its name, then its type with
 * its default beside it and what it does below, so a long type has the row's width and the
 * description is never squeezed into a column of its own. `rows` is a JSON list of
 * `[name, type, default, description]`, URI-encoded so it can be an attribute.
 */
import { css } from "@kirana-style/core"

import {
  alpha,
  breakpoint,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  radius,
  spacing,
  theme,
} from "../tokens.ts"

type Row = [name: string, type: string, fallback: string, description: string]

const styles = {
  table: css({
    marginBlock: spacing[6],
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.border,
    borderRadius: radius.xl,
    overflow: "hidden",
  }),
  head: css({
    display: { base: "none", [breakpoint.sm]: "grid" },
    gridTemplateColumns: "minmax(0, 14rem) minmax(0, 1fr)",
    columnGap: spacing[4],
    paddingBlock: spacing[2],
    paddingInline: spacing[4],
    backgroundColor: alpha.muted50,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.xs,
    fontWeight: fontWeight.medium,
    color: theme.mutedForeground,
  }),
  row: css({
    display: "grid",
    gridTemplateColumns: {
      base: "minmax(0, 1fr)",
      [breakpoint.sm]: "minmax(0, 14rem) minmax(0, 1fr)",
    },
    columnGap: spacing[4],
    rowGap: spacing[1],
    paddingBlock: spacing[3],
    paddingInline: spacing[4],
    borderBlockStartWidth: "1px",
    borderBlockStartStyle: "solid",
    borderBlockStartColor: theme.border,
  }),
  name: css({
    fontFamily: fontFamily.mono,
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    fontWeight: fontWeight.medium,
    color: theme.foreground,
    overflowWrap: "anywhere",
  }),
  about: css({
    display: "flex",
    flexDirection: "column",
    gap: spacing[1],
    minWidth: "0",
  }),
  type: css({
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    lineHeight: lineHeight.sm,
    color: theme.mutedForeground,
    overflowWrap: "anywhere",
  }),
  fallback: css({
    marginInlineStart: spacing[2],
    paddingBlock: "1px",
    paddingInline: spacing[1],
    borderRadius: radius.sm,
    backgroundColor: alpha.muted50,
    color: theme.foreground,
    whiteSpace: "nowrap",
  }),
  description: css({
    fontSize: fontSize.sm,
    lineHeight: lineHeight.sm,
    color: theme.foreground,
  }),
  code: css({
    fontFamily: fontFamily.mono,
    fontSize: fontSize.xs,
    paddingInline: spacing[1],
    borderRadius: radius.sm,
    backgroundColor: alpha.muted50,
  }),
}

/** A description's `code`, drawn as code. */
function Prose({ text }: { text: string }) {
  return (
    <>
      {text.split("`").map((piece, at) =>
        at % 2 ? (
          <code key={at} sx={styles.code}>
            {piece}
          </code>
        ) : (
          piece
        )
      )}
    </>
  )
}

export function PropsTable({ rows = "" }: { rows?: string }) {
  let list: Row[] = []
  try {
    list = JSON.parse(decodeURIComponent(rows)) as Row[]
  } catch {
    return null
  }
  if (!list.length) return null
  return (
    <div
      sx={styles.table}
      role="table"
      aria-label="Props"
      data-slot="props-table"
    >
      <div sx={styles.head} role="row">
        <span role="columnheader">Prop</span>
        <span role="columnheader">Type, default and what it does</span>
      </div>
      {list.map(([name, type, fallback, description]) => (
        <div key={name} sx={styles.row} role="row">
          <code sx={styles.name} role="rowheader">
            {name}
          </code>
          <div sx={styles.about} role="cell">
            <span sx={styles.type}>
              {type}
              {fallback ? (
                <span sx={styles.fallback}>default {fallback}</span>
              ) : null}
            </span>
            {description ? (
              <span sx={styles.description}>
                <Prose text={description} />
              </span>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}
