import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  group: css({
    display: "flex",
    gap: "0.125rem",
    padding: "0.125rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.line,
    borderRadius: "0.5rem",
    backgroundColor: theme.surface,
  }),
  toggle: css({
    paddingBlock: "0.25rem",
    paddingInline: "0.75rem",
    borderWidth: "0",
    borderRadius: "0.375rem",
    backgroundColor: { base: "transparent", "[data-pressed]": theme.accent },
    color: {
      base: theme.quiet,
      ":hover": theme.ink,
      "[data-pressed]": theme.onAccent,
    },
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
