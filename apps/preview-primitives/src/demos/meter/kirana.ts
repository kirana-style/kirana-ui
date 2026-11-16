import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  root: css({
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "0.5rem",
    width: "16rem",
  }),
  label: css({ fontWeight: "500" }),
  value: css({ color: theme.quiet, fontVariantNumeric: "tabular-nums" }),
  track: css({
    gridColumnStart: "1",
    gridColumnEnd: "-1",
    height: "0.5rem",
    overflow: "hidden",
    borderRadius: "9999px",
    backgroundColor: theme.raised,
  }),
  indicator: css({
    height: "100%",
    borderRadius: "9999px",
    backgroundColor: theme.accent,
  }),
}
