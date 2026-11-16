import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  frame: css({ display: "grid", gap: "0.75rem", width: "16rem" }),
  root: css({
    display: "grid",
    gridTemplateColumns: "1fr auto",
    rowGap: "0.5rem",
  }),
  label: css({ fontWeight: "500" }),
  value: css({ color: theme.quiet, fontVariantNumeric: "tabular-nums" }),
  track: css({
    gridColumnStart: "1",
    gridColumnEnd: "-1",
    height: "0.5rem",
    overflow: "hidden",
    borderRadius: "9999px",
    backgroundColor: theme.raised,
  }),
  // Its width is the value's share of the range: the component writes it.
  indicator: css({
    height: "100%",
    borderRadius: "9999px",
    backgroundColor: theme.accent,
    transitionProperty: "width",
    transitionDuration: "300ms",
    transitionTimingFunction: "ease",
  }),
  button: css({
    justifySelf: "start",
    paddingBlock: "0.25rem",
    paddingInline: "0.75rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.line,
    borderRadius: "0.375rem",
    backgroundColor: { base: theme.surface, ":hover": theme.raised },
    color: theme.ink,
    fontFamily: "inherit",
    fontSize: "inherit",
    lineHeight: "inherit",
    fontWeight: "500",
    cursor: "pointer",
    outlineWidth: "2px",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineColor: theme.ring,
    outlineOffset: "2px",
  }),
}
