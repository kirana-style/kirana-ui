import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  // It stays pressed until it is pressed again: `[data-pressed]` says so.
  toggle: css({
    display: "flex",
    width: "2.25rem",
    height: "2.25rem",
    alignItems: "center",
    justifyContent: "center",
    padding: "0",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: { base: theme.line, "[data-pressed]": theme.accent },
    borderRadius: "0.5rem",
    backgroundColor: {
      base: theme.surface,
      ":hover": theme.raised,
      "[data-pressed]": theme.accent,
    },
    color: { base: theme.ink, "[data-pressed]": theme.onAccent },
    fontFamily: "inherit",
    fontSize: "inherit",
    lineHeight: "inherit",
    fontWeight: "700",
    cursor: "pointer",
    outlineWidth: "2px",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineColor: theme.ring,
    outlineOffset: "2px",
  }),
}
