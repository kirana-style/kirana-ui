import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  text: css({ margin: "0", color: theme.quiet }),
  trigger: css({
    borderRadius: "0.375rem",
    color: theme.ink,
    fontWeight: "500",
    textDecorationLine: "underline",
    textUnderlineOffset: "0.25rem",
    outlineWidth: "2px",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineColor: theme.ring,
    outlineOffset: "2px",
  }),
  popup: css({
    display: "flex",
    flexDirection: "column",
    width: "16rem",
    padding: "0.75rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.line,
    borderRadius: "0.75rem",
    backgroundColor: theme.surface,
    color: theme.ink,
    transformOrigin: "var(--transform-origin)",
    opacity: {
      base: "1",
      "[data-starting-style]": "0",
      "[data-ending-style]": "0",
    },
    scale: {
      base: "1",
      "[data-starting-style]": "0.95",
      "[data-ending-style]": "0.95",
    },
    transitionProperty: "opacity, scale",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  }),
  name: css({ fontWeight: "600" }),
  handle: css({ color: theme.quiet, fontSize: "0.75rem" }),
  bio: css({ marginTop: "0.5rem" }),
}
