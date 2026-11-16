import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  root: css({ width: "20rem" }),
  list: css({
    position: "relative",
    display: "flex",
    gap: "0.25rem",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: theme.line,
  }),
  tab: css({
    paddingBlock: "0.5rem",
    paddingInline: "0.75rem",
    borderWidth: "0",
    borderRadius: "0.375rem",
    backgroundColor: "transparent",
    color: {
      base: theme.quiet,
      ":hover": theme.ink,
      "[data-active]": theme.ink,
    },
    fontFamily: "inherit",
    fontSize: "inherit",
    lineHeight: "inherit",
    fontWeight: "500",
    cursor: "pointer",
    outlineWidth: "2px",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineColor: theme.ring,
    outlineOffset: "-2px",
  }),
  // A line under the active tab: the part carries that tab's place and width.
  indicator: css({
    position: "absolute",
    bottom: "-1px",
    left: "var(--active-tab-left)",
    width: "var(--active-tab-width)",
    height: "2px",
    backgroundColor: theme.accent,
    transitionProperty: "left, width",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease",
  }),
  panel: css({
    padding: "0.75rem",
    borderRadius: "0.375rem",
    color: theme.quiet,
    outlineWidth: "2px",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineColor: theme.ring,
    outlineOffset: "-2px",
  }),
}
