import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  group: css({ display: "grid", gap: "0.5rem" }),
  list: css({
    display: "grid",
    gap: "0.5rem",
    // Under the parent's label: the width of a box and the gap after it.
    paddingInlineStart: "1.75rem",
  }),
  option: css({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: theme.ink,
    cursor: "pointer",
    userSelect: "none",
  }),
  box: css({
    display: "inline-flex",
    width: "1.25rem",
    height: "1.25rem",
    flexShrink: "0",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: {
      base: theme.line,
      "[data-checked]": theme.accent,
      "[data-indeterminate]": theme.accent,
    },
    borderRadius: "0.375rem",
    backgroundColor: {
      base: theme.surface,
      "[data-checked]": theme.accent,
      "[data-indeterminate]": theme.accent,
    },
    color: theme.onAccent,
    outlineWidth: "2px",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineColor: theme.ring,
    outlineOffset: "2px",
  }),
  mark: css({
    fontSize: "0.75rem",
    lineHeight: "1",
    opacity: { "[data-starting-style]": "0", "[data-ending-style]": "0" },
    scale: { "[data-starting-style]": "0.5", "[data-ending-style]": "0.5" },
    transitionProperty: "opacity, scale",
    transitionDuration: "150ms",
    transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
  }),
}
