import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  root: css({
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    width: "16rem",
    minWidth: "0",
    margin: "0",
    padding: "0",
    borderWidth: "0",
    borderStyle: "solid",
  }),
  legend: css({
    marginBottom: "0.75rem",
    padding: "0",
    color: theme.ink,
    fontSize: "1rem",
    lineHeight: "1.5",
    fontWeight: "600",
  }),
  field: css({ display: "flex", flexDirection: "column", gap: "0.25rem" }),
  label: css({ color: theme.ink, fontWeight: "500" }),
  control: css({
    width: "100%",
    margin: "0",
    paddingBlock: "0.5rem",
    paddingInline: "0.75rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "0.5rem",
    backgroundColor: theme.surface,
    color: theme.ink,
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
    lineHeight: "inherit",
    outlineWidth: "2px",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineColor: theme.ring,
    outlineOffset: "2px",
    "::placeholder": { color: theme.quiet, opacity: "1" },
    borderColor: theme.line,
  }),
}
