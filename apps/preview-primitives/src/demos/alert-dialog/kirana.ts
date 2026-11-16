import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

const button = css({
  paddingBlock: "0.5rem",
  paddingInline: "0.75rem",
  borderWidth: "1px",
  borderStyle: "solid",
  borderRadius: "0.5rem",
  fontFamily: "inherit",
  fontSize: "inherit",
  lineHeight: "inherit",
  fontWeight: "500",
  cursor: "pointer",
  outlineWidth: "2px",
  outlineStyle: { base: "none", ":focus-visible": "solid" },
  outlineColor: theme.ring,
  outlineOffset: "2px",
})

export default {
  trigger: css(button, {
    borderColor: theme.line,
    backgroundColor: { base: theme.surface, ":hover": theme.raised },
    color: theme.danger,
  }),
  backdrop: css({
    position: "fixed",
    inset: "0",
    backgroundColor: "rgb(0 0 0 / 0.4)",
    opacity: { "[data-starting-style]": "0", "[data-ending-style]": "0" },
    transitionProperty: "opacity",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease-out",
  }),
  popup: css({
    position: "fixed",
    inset: "0",
    width: "22rem",
    maxWidth: "calc(100vw - 2rem)",
    height: "fit-content",
    margin: "auto",
    padding: "1.25rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.line,
    borderRadius: "0.75rem",
    backgroundColor: theme.surface,
    color: theme.ink,
    opacity: { "[data-starting-style]": "0", "[data-ending-style]": "0" },
    scale: { "[data-starting-style]": "0.95", "[data-ending-style]": "0.95" },
    transitionProperty: "opacity, scale",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease-out",
  }),
  title: css({ margin: "0", fontSize: "1.125rem", fontWeight: "600" }),
  description: css({
    margin: "0",
    marginTop: "0.25rem",
    color: theme.quiet,
  }),
  actions: css({
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.5rem",
    marginTop: "1.25rem",
  }),
  cancel: css(button, {
    borderColor: theme.line,
    backgroundColor: { base: theme.surface, ":hover": theme.raised },
    color: theme.ink,
  }),
  confirm: css(button, {
    borderColor: theme.danger,
    backgroundColor: theme.danger,
    color: theme.surface,
    opacity: { ":hover": "0.9" },
  }),
}
