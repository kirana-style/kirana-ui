import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  root: css({ display: "grid", gap: "0.5rem" }),
  option: css({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
  }),
  item: css({
    display: "flex",
    width: "1rem",
    height: "1rem",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: { base: theme.line, "[data-checked]": theme.accent },
    borderRadius: "9999px",
    backgroundColor: theme.surface,
    outlineWidth: "2px",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineColor: theme.ring,
    outlineOffset: "2px",
  }),
  indicator: css({
    width: "0.5rem",
    height: "0.5rem",
    borderRadius: "9999px",
    backgroundColor: theme.accent,
    // What the dot grows from, and shrinks to.
    scale: { "[data-starting-style]": "0", "[data-ending-style]": "0" },
    transitionProperty: "scale",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease",
  }),
}
