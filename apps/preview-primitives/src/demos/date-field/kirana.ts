import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  field: css({
    display: "inline-flex",
    alignItems: "center",
    paddingBlock: "0.5rem",
    paddingInline: "0.75rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: { base: theme.line, "[data-invalid]": theme.danger },
    borderRadius: "0.5rem",
    backgroundColor: theme.surface,
    color: theme.ink,
    fontVariantNumeric: "tabular-nums",
  }),
  segment: css({
    paddingBlock: "0",
    paddingInline: { base: "0.25rem", '[data-segment="literal"]': "0" },
    borderRadius: "0.375rem",
    backgroundColor: { ":focus-visible": theme.raised },
    // An empty part, and what stands between two parts.
    color: {
      "[data-placeholder]": theme.quiet,
      '[data-segment="literal"]': theme.quiet,
    },
    caretColor: "transparent",
    outlineWidth: "2px",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineColor: theme.ring,
  }),
}
