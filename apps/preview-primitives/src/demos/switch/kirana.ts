import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  label: css({
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    color: theme.ink,
    fontWeight: "500",
    cursor: "pointer",
  }),
  switch: css({
    display: "flex",
    width: "2.5rem",
    height: "1.5rem",
    padding: "0.125rem",
    borderRadius: "9999px",
    backgroundColor: { base: theme.line, "[data-checked]": theme.accent },
    cursor: "pointer",
    transitionProperty: "background-color",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    outlineWidth: "2px",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineColor: theme.ring,
    outlineOffset: "2px",
  }),
  thumb: css({
    display: "block",
    width: "1.25rem",
    height: "1.25rem",
    borderRadius: "9999px",
    backgroundColor: theme.surface,
    transitionProperty: "translate",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
    // As far as the track is wider than the thumb and its padding.
    translate: { "[data-checked]": "1rem 0" },
  }),
}
