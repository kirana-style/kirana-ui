/**
 * Collapsible draws nothing of its own (shadcn/ui's `bases/base/ui/collapsible.tsx` and
 * `bases/aria/ui/collapsible.tsx`, MIT, at commit `481d523`). What a page puts in one reads it as
 * upstream's `group/collapsible`: the page anchors `collapsibleScope` on the root and reads
 * `OPEN`, every base's open state, inside it.
 */
import { relation } from "@kirana-style/core"

import { disclosure } from "../core/states"

/** A collapsible section, read by what is inside it (`group/collapsible`). */
export const collapsibleScope = relation("collapsible")

/** Inside an open section, on Base UI (`data-open`) or React Aria (`data-expanded`). */
export const OPEN = {
  base: collapsibleScope.within(disclosure.open.base),
  aria: collapsibleScope.within(disclosure.open.aria),
}
