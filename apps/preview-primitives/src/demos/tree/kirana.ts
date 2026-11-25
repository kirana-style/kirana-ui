import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  root: css({
    width: "14rem",
    padding: "0.25rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.line,
    borderRadius: "0.5rem",
    backgroundColor: theme.surface,
    color: theme.ink,
  }),
  // A node takes the focus: a folder holds its row and its files.
  item: css({
    borderRadius: "0.375rem",
    outlineWidth: "2px",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineColor: theme.ring,
    outlineOffset: "-2px",
  }),
  row: css({
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    paddingBlock: "0.25rem",
    paddingInline: "0.5rem",
    borderRadius: "0.375rem",
    // The node the keyboard is on, and the one chosen.
    backgroundColor: {
      "[data-highlighted]:not([data-selected])": theme.raised,
      "[data-selected]": theme.accent,
    },
    color: { "[data-selected]": theme.onAccent },
    cursor: "default",
    userSelect: "none",
  }),
  // Turns to point down while its folder is open.
  indicator: css({
    display: "flex",
    rotate: { base: "0deg", "[data-open]": "90deg" },
    transitionProperty: "rotate",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  }),
  file: css({ display: "block", flexShrink: "0", opacity: "0.6" }),
  text: css({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),
  // The files in a folder, set in under it.
  group: css({
    overflow: "hidden",
    height: {
      base: "var(--tree-group-height)",
      "[data-starting-style]": "0",
      "[data-ending-style]": "0",
    },
    paddingInlineStart: "1rem",
    transitionProperty: "height",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  }),
}
