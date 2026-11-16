import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  root: css({
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    width: "16rem",
  }),
  label: css({ color: theme.ink, fontWeight: "500", cursor: "pointer" }),
  input: css({
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
