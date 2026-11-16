import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  root: css({
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    width: "12rem",
    margin: "0",
    padding: "0.25rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.line,
    borderRadius: "0.5rem",
    backgroundColor: theme.surface,
    color: theme.ink,
    outlineWidth: "2px",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineColor: theme.ring,
    outlineOffset: "2px",
  }),
  item: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBlock: "0.25rem",
    paddingInline: "0.5rem",
    borderRadius: "0.375rem",
    backgroundColor: { "[data-highlighted]": theme.raised },
    color: { "[data-disabled]": theme.quiet },
    fontWeight: { "[data-selected]": "500" },
    opacity: { "[data-disabled]": "0.5" },
    cursor: "default",
    userSelect: "none",
    outlineWidth: "2px",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineColor: theme.ring,
    outlineOffset: "-2px",
  }),
  indicator: css({ color: theme.quiet }),
}
