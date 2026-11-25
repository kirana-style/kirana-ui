import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  field: css({ display: "grid", justifyItems: "start", gap: "0.5rem" }),
  label: css({ fontWeight: "500" }),
  root: css({ display: "flex", gap: "0.25rem" }),
  // The star itself is the empty one; the filled one is drawn over it.
  star: css({
    position: "relative",
    width: "1.5rem",
    borderRadius: "0.375rem",
    color: theme.line,
    fontSize: "1.5rem",
    lineHeight: "1",
    textAlign: "center",
    cursor: "pointer",
    userSelect: "none",
    outlineWidth: "2px",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineColor: theme.ring,
    outlineOffset: "2px",
    "::before": {
      content: '"★"',
      position: "absolute",
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
      color: theme.accent,
      // Up to the value held, or the one the pointer is over.
      opacity: { base: "0", "[data-filled]": "1" },
      // The star the value fills by half: only its first half is drawn filled.
      clipPath: { base: "none", "[data-half]": "inset(0 50% 0 0)" },
    },
  }),
  hint: css({ margin: "0", color: theme.quiet }),
}
