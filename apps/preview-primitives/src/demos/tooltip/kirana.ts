import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  trigger: css({
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
    fontWeight: "500",
    cursor: "pointer",
    outlineWidth: "2px",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineColor: theme.ring,
    outlineOffset: "2px",
  }),
  popup: css({
    paddingBlock: "0.25rem",
    paddingInline: "0.5rem",
    borderRadius: "0.375rem",
    backgroundColor: theme.accent,
    color: theme.onAccent,
    fontSize: "0.75rem",
    lineHeight: "1rem",
    // It grows from the point nearest its trigger.
    transformOrigin: "var(--transform-origin)",
    transitionProperty: "opacity, scale",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    // What it animates in from, and out to.
    opacity: { "[data-starting-style]": "0", "[data-ending-style]": "0" },
    scale: { "[data-starting-style]": "0.95", "[data-ending-style]": "0.95" },
  }),
  // A square turned on its corner, half of it past the popup's edge. The part places it along
  // that edge; which edge is the side the popup is on.
  arrow: css({
    width: "0.5rem",
    height: "0.5rem",
    backgroundColor: theme.accent,
    rotate: "45deg",
    bottom: { '[data-side="top"]': "-0.25rem" },
    top: { '[data-side="bottom"]': "-0.25rem" },
    right: { '[data-side="left"]': "-0.25rem" },
    left: { '[data-side="right"]': "-0.25rem" },
  }),
}
