import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  root: css({ width: "20rem" }),
  item: css({
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: theme.line,
  }),
  header: css({ margin: "0", fontSize: "inherit", fontWeight: "500" }),
  trigger: css({
    position: "relative",
    display: "block",
    width: "100%",
    paddingBlock: "0.75rem",
    paddingLeft: "0",
    paddingRight: "1.5rem",
    borderStyle: "none",
    borderRadius: "0.375rem",
    backgroundColor: "transparent",
    color: theme.ink,
    fontFamily: "inherit",
    fontSize: "inherit",
    lineHeight: "inherit",
    fontWeight: "inherit",
    textAlign: "start",
    textDecorationLine: { base: "none", ":hover": "underline" },
    cursor: "pointer",
    outlineWidth: "2px",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineColor: theme.ring,
    outlineOffset: "2px",
    // Out of the flow: an underline reaches the text a box lays out, never a positioned mark.
    "::after": {
      content: { base: '"+"', "[data-panel-open]": '"–"' },
      position: "absolute",
      top: "0.75rem",
      right: "0",
      color: theme.quiet,
    },
  }),
  panel: css({
    overflow: "hidden",
    height: {
      base: "var(--accordion-panel-height)",
      "[data-starting-style]": "0",
      "[data-ending-style]": "0",
    },
    transitionProperty: "height",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease-out",
  }),
  text: css({ margin: "0", paddingBottom: "0.75rem", color: theme.quiet }),
}
