import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  row: css({ display: "flex", gap: "0.75rem" }),
  button: css({
    paddingBlock: "0.5rem",
    paddingInline: "1rem",
    borderStyle: "none",
    borderRadius: "0.5rem",
    backgroundColor: theme.accent,
    color: theme.onAccent,
    fontFamily: "inherit",
    fontSize: "inherit",
    lineHeight: "inherit",
    fontWeight: "500",
    opacity: { ":hover": "0.9", "[data-disabled]": "0.5" },
    cursor: { base: "pointer", "[data-disabled]": "not-allowed" },
    outlineWidth: "2px",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineColor: theme.ring,
    outlineOffset: "2px",
  }),
}
