import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  group: css({
    display: "flex",
    width: "20rem",
    height: "8rem",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.line,
    borderRadius: "0.5rem",
  }),
  // Its share of the group is the component's to write.
  panel: css({
    display: "flex",
    minWidth: "0",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    color: theme.quiet,
  }),
  handle: css({
    width: "0.25rem",
    flexShrink: "0",
    backgroundColor: {
      base: theme.line,
      ":hover": theme.quiet,
      "[data-dragging]": theme.quiet,
    },
    cursor: "col-resize",
    touchAction: "none",
    outlineWidth: "2px",
    outlineStyle: { base: "none", ":focus-visible": "solid" },
    outlineColor: theme.ring,
    outlineOffset: "0",
  }),
}
