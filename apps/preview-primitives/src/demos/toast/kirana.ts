import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  button: css({
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
  // A corner of the page. The toasts are stacked on its bottom edge.
  viewport: css({
    position: "fixed",
    right: "1rem",
    bottom: "1rem",
    width: "18rem",
  }),
  // Each toast says where it is in the stack (--toast-index, 0 for the newest): one behind is
  // a little higher and a little smaller, and under the ones in front.
  toast: css({
    position: "absolute",
    right: "0",
    bottom: "0",
    zIndex: "calc(10 - var(--toast-index))",
    display: "flex",
    width: "100%",
    alignItems: "flex-start",
    gap: "0.75rem",
    padding: "0.75rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.line,
    borderRadius: "0.5rem",
    backgroundColor: theme.surface,
    userSelect: "none",
    transformOrigin: "top",
    // Expanded (the pointer or focus is on the stack), each one stands above those in front.
    translate: {
      base: "var(--toast-swipe-movement-x, 0px) calc(var(--toast-index) * -0.5rem)",
      "[data-expanded]":
        "var(--toast-swipe-movement-x, 0px) calc(var(--toast-index) * -0.5rem - var(--toast-offset-y, 0px))",
    },
    scale: {
      base: "calc(1 - var(--toast-index) * 0.05)",
      "[data-expanded]": "1",
    },
    // What it animates in from, and out to. One behind as many as are shown is not seen.
    opacity: {
      "[data-starting-style]": "0",
      "[data-ending-style]": "0",
      "[data-limited]": "0",
    },
    transform: {
      "[data-starting-style]": "translateY(100%)",
      "[data-ending-style]": "translateY(100%)",
    },
    transitionProperty: "translate, scale, transform, opacity",
    // A dragged toast follows the pointer at once.
    transitionDuration: { base: "250ms", "[data-swiping]": "0s" },
    transitionTimingFunction: "ease",
    outlineWidth: "2px",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineColor: theme.ring,
    outlineOffset: "2px",
    // Fills the gap under a toast, so the pointer stays on the stack between two.
    "::after": {
      content: '""',
      position: "absolute",
      top: "100%",
      left: "0",
      width: "100%",
      height: "0.5rem",
    },
  }),
  content: css({ flex: "1" }),
  title: css({ color: theme.ink, fontWeight: "500" }),
  description: css({ color: theme.quiet }),
  close: css({
    display: "flex",
    width: "1.5rem",
    height: "1.5rem",
    alignItems: "center",
    justifyContent: "center",
    padding: "0",
    borderWidth: "0",
    borderRadius: "0.375rem",
    backgroundColor: { base: "transparent", ":hover": theme.raised },
    color: { base: theme.quiet, ":hover": theme.ink },
    fontFamily: "inherit",
    fontSize: "1.125rem",
    lineHeight: "1",
    cursor: "pointer",
    outlineWidth: "2px",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineColor: theme.ring,
    outlineOffset: "2px",
  }),
}
