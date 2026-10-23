/**
 * An icon inside a control: the size the control hands down (`ctx.iconSize`), never shrunk, never
 * the target of a click. It replaces shadcn/ui's `[&_svg:not([class*='size-'])]:size-4`,
 * `[&_svg]:shrink-0` and `[&_svg]:pointer-events-none` on every control: the icon reads the size
 * rather than the control reaching into it.
 */
import { css } from "@kirana-style/core"

import { ctx } from "../core/context"

export const icon = css({
  width: ctx.iconSize,
  height: ctx.iconSize,
  flexShrink: 0,
  pointerEvents: "none",
})
