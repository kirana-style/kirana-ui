/** What several of the showcase's cards lay out the same way. */
import { css } from "@kirana-style/core"

import { space } from "@workspace/registry/core/scales"

export const shared = {
  stack: css({ display: "flex", flexDirection: "column", gap: space[4] }),
  pair: css({
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: space[3],
  }),
  full: css({ width: "100%" }),
}
