import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

const square = css({
  width: "2rem",
  height: "2rem",
  padding: "0",
  borderStyle: "none",
  borderRadius: "0.375rem",
  fontFamily: "inherit",
  fontSize: "inherit",
  lineHeight: "inherit",
  cursor: "pointer",
  outlineWidth: "2px",
  outlineStyle: { base: "none", ":focus-visible": "solid" },
  outlineColor: theme.ring,
  outlineOffset: "2px",
})

export default {
  root: css({
    width: "fit-content",
    padding: "0.75rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.line,
    borderRadius: "0.75rem",
    backgroundColor: theme.surface,
    color: theme.ink,
  }),
  header: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "0.5rem",
  }),
  heading: css({ fontWeight: "500" }),
  // A flex box, to put the chevron in the middle of the square.
  arrow: css(square, {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: { base: "transparent", ":hover": theme.raised },
    color: theme.ink,
    fontWeight: "inherit",
  }),
  grid: css({ borderCollapse: "collapse" }),
  weekday: css({
    height: "2rem",
    padding: "0",
    color: theme.quiet,
    fontWeight: "400",
    textAlign: "center",
  }),
  cell: css({ padding: "0" }),
  day: css(square, {
    backgroundColor: {
      base: "transparent",
      ":hover": theme.raised,
      "[data-selected]": theme.accent,
    },
    color: { base: theme.ink, "[data-selected]": theme.onAccent },
    fontWeight: { base: "inherit", "[data-today]": "700" },
    opacity: { "[data-outside-month]": "0.4" },
  }),
  chosen: css({
    margin: "0",
    marginTop: "0.5rem",
    color: theme.quiet,
    textAlign: "center",
  }),
}
