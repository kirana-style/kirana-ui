import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

const ring = css({
  outlineWidth: "2px",
  outlineStyle: { base: "none", ":focus-visible": "solid" },
  outlineColor: theme.ring,
  outlineOffset: "2px",
})

export default {
  root: css({ width: "18rem" }),
  viewport: css(ring, {
    display: "flex",
    overflowX: "auto",
    borderRadius: "0.75rem",
    scrollSnapType: "x mandatory",
    scrollBehavior: "smooth",
    scrollbarWidth: "none",
  }),
  item: css({
    display: "flex",
    flex: "none",
    width: "100%",
    height: "8rem",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.25rem",
    backgroundColor: theme.raised,
    scrollSnapAlign: "start",
  }),
  title: css({ margin: "0", color: theme.ink, fontWeight: "500" }),
  text: css({ margin: "0", color: theme.quiet }),
  controls: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "0.75rem",
  }),
  arrow: css(ring, {
    width: "2rem",
    height: "2rem",
    padding: "0",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.line,
    borderRadius: "9999px",
    backgroundColor: { base: theme.surface, ":hover": theme.raised },
    color: theme.ink,
    fontFamily: "inherit",
    fontSize: "inherit",
    lineHeight: "inherit",
    opacity: { "[data-disabled]": "0.4" },
    cursor: { base: "pointer", "[data-disabled]": "not-allowed" },
  }),
  dots: css({ display: "flex", gap: "0.5rem" }),
  dot: css(ring, {
    width: "0.5rem",
    height: "0.5rem",
    padding: "0",
    borderStyle: "none",
    borderRadius: "9999px",
    backgroundColor: { base: theme.line, "[data-current]": theme.accent },
    color: "inherit",
    fontFamily: "inherit",
    fontSize: "inherit",
    lineHeight: "inherit",
    cursor: "pointer",
  }),
}
