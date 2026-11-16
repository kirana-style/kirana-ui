import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  root: css({ width: "14rem" }),
  trigger: css({
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
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
    "::after": {
      content: { base: '"+"', "[data-panel-open]": '"–"' },
      color: theme.quiet,
    },
  }),
  panel: css({
    overflow: "hidden",
    height: {
      base: "var(--collapsible-panel-height)",
      "[data-starting-style]": "0",
      "[data-ending-style]": "0",
    },
    transitionProperty: "height",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease",
  }),
  text: css({
    margin: "0",
    paddingBlockStart: "0.5rem",
    paddingInline: "0.75rem",
    color: theme.quiet,
  }),
}
