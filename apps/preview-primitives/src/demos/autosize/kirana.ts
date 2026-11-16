import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  label: css({
    display: "flex",
    width: "18rem",
    flexDirection: "column",
    gap: "0.25rem",
    color: theme.ink,
    fontWeight: "500",
  }),
  textarea: css({
    display: "block",
    width: "100%",
    maxHeight: "10rem",
    margin: "0",
    paddingBlock: "0.5rem",
    paddingInline: "0.75rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.line,
    borderRadius: "0.5rem",
    backgroundColor: theme.surface,
    color: theme.ink,
    fontFamily: "inherit",
    fontSize: "inherit",
    lineHeight: "inherit",
    fontWeight: "inherit",
    resize: "none",
    outlineWidth: "2px",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineColor: theme.ring,
    outlineOffset: "2px",
    "::placeholder": { color: theme.quiet },
  }),
}
