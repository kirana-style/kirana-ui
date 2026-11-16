import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  group: css({ display: "flex", gap: "0.75rem" }),
  root: css({
    display: "inline-flex",
    width: "3rem",
    height: "3rem",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: "9999px",
    backgroundColor: theme.raised,
    color: theme.ink,
  }),
  image: css({
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  }),
  fallback: css({ fontWeight: "500" }),
}
