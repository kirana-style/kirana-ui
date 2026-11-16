import { css } from "@kirana-style/core"

import { theme } from "../../tokens.ts"

export default {
  frame: css({ width: "16rem" }),
  title: css({ margin: "0", fontWeight: "500" }),
  text: css({ margin: "0", color: theme.quiet }),
  row: css({ display: "flex", alignItems: "center", gap: "0.75rem" }),
  // A line across with room above and below, or a line between things side by side.
  separator: css({
    width: { base: "100%", '[data-orientation="vertical"]': "1px" },
    height: { base: "1px", '[data-orientation="vertical"]': "1rem" },
    flexShrink: "0",
    marginBlock: { base: "0.75rem", '[data-orientation="vertical"]': "0" },
    backgroundColor: theme.line,
  }),
}
