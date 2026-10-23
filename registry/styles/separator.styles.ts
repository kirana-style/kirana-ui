/**
 * Separator, in every style (they draw it alike): shadcn/ui's `bases/base/ui/separator.tsx` and
 * `bases/aria/ui/separator.tsx` (MIT), at commit `25af02b`. React Aria draws a horizontal one as an
 * `<hr>`, which loses its own border and margin here.
 */
import { css } from "@kirana-style/core"

import { orientation, when } from "../core/states"
import { theme } from "../core/tokens"

export const separator = css({
  display: "block",
  flexShrink: 0,
  borderWidth: 0,
  margin: 0,
  backgroundColor: theme.border,
  height: {
    ...when(orientation.horizontal, "1px"),
    ":is(hr)": "1px",
  },
  width: {
    ...when(orientation.horizontal, "100%"),
    ":is(hr)": "100%",
    ...when(orientation.vertical, "1px"),
  },
  alignSelf: { ...when(orientation.vertical, "stretch") },
})
