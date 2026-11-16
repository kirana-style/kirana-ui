import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  root: css({
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    width: "16rem",
  }),
  label: css({ color: theme.ink, fontWeight: "500" }),
  control: css({
    width: "100%",
    margin: "0",
    paddingBlock: "0.5rem",
    paddingInline: "0.75rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: { base: theme.line, "[data-invalid]": theme.danger },
    borderRadius: "0.5rem",
    backgroundColor: theme.surface,
    color: theme.ink,
    fontFamily: "inherit",
    fontSize: "inherit",
    fontWeight: "inherit",
    lineHeight: "inherit",
    outlineWidth: "2px",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineColor: theme.ring,
    outlineOffset: "2px",
    "::placeholder": { color: theme.quiet, opacity: "1" },
  }),
  description: css({
    margin: "0",
    color: theme.quiet,
    fontSize: "0.75rem",
  }),
  error: css({
    color: theme.danger,
    fontSize: "0.75rem",
    opacity: {
      base: "1",
      "[data-starting-style]": "0",
      "[data-ending-style]": "0",
    },
    transitionProperty: "opacity",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  }),
}
