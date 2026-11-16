import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  frame: css({ display: "grid", gap: "0.75rem", width: "12rem" }),
  field: css({ display: "grid", gap: "0.25rem" }),
  label: css({ fontWeight: "500" }),
  input: css({
    width: "100%",
    paddingBlock: "0.25rem",
    paddingInline: "0.5rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.line,
    borderRadius: "0.375rem",
    backgroundColor: theme.surface,
    color: theme.ink,
    fontFamily: "inherit",
    fontSize: "inherit",
    lineHeight: "inherit",
    outlineWidth: "2px",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineColor: theme.ring,
    outlineOffset: "2px",
  }),
  // The padding is the quiet zone a reader needs around the code.
  root: css({
    padding: "0.75rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.line,
    borderRadius: "0.5rem",
    backgroundColor: theme.surface,
  }),
  code: css({
    display: "block",
    width: "100%",
    height: "auto",
    shapeRendering: "crispEdges",
  }),
  pattern: css({ fill: theme.ink }),
}
