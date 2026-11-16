import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  trigger: css({
    display: "flex",
    width: "12rem",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.5rem",
    paddingBlock: "0.5rem",
    paddingInline: "0.75rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.line,
    borderRadius: "0.5rem",
    backgroundColor: { base: theme.surface, ":hover": theme.raised },
    color: theme.ink,
    fontFamily: "inherit",
    fontSize: "inherit",
    lineHeight: "inherit",
    cursor: "pointer",
    outlineWidth: "2px",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineColor: theme.ring,
    outlineOffset: "2px",
  }),
  // While nothing is chosen, the value is the placeholder.
  value: css({ color: { "[data-placeholder]": theme.quiet } }),
  icon: css({ display: "block", flexShrink: "0", color: theme.quiet }),
  // The positioner around it carries the geometry: the trigger's width, the room there is.
  popup: css({
    minWidth: "var(--anchor-width)",
    maxHeight: "var(--available-height)",
    overflowY: "auto",
    padding: "0.25rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.line,
    borderRadius: "0.5rem",
    backgroundColor: theme.surface,
    color: theme.ink,
    outlineStyle: "none",
    transformOrigin: "var(--transform-origin)",
    // What it animates in from, and out to.
    opacity: { "[data-starting-style]": "0", "[data-ending-style]": "0" },
    scale: { "[data-starting-style]": "0.95", "[data-ending-style]": "0.95" },
    transitionProperty: "opacity, scale",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  }),
  item: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.5rem",
    paddingBlock: "0.25rem",
    paddingInline: "0.5rem",
    borderRadius: "0.375rem",
    cursor: "default",
    userSelect: "none",
    outlineStyle: "none",
    // The item the pointer or the keyboard is on.
    backgroundColor: { "[data-highlighted]": theme.raised },
    fontWeight: { "[data-selected]": "500" },
  }),
  indicator: css({ color: theme.quiet }),
}
