/**
 * Relations a component reads of another it may be installed without: optional, so a read with no
 * anchor in the project never matches. Here, in a module both install, rather than in either's.
 */
import { relation } from "@kirana-style/core"

/** A tooltip's content, read by a Kbd inside it (`in-data-[slot=tooltip-content]:`). */
export const tooltipScope = relation("tooltip-content", { optional: true })

/** An InputGroup, read by what sits inside it (`in-data-[slot=input-group]:`). */
export const inputGroupScope = relation("input-group", { optional: true })

/** An InputGroup's addon, read by a Kbd inside it. */
export const inputGroupAddonScope = relation("input-group-addon", {
  optional: true,
})

/** Inside a tooltip's content. */
export const IN_TOOLTIP = tooltipScope.within()

/** Inside an InputGroup. */
export const IN_INPUT_GROUP = inputGroupScope.within()

/** Inside an InputGroup's addon, and as its own child (`[&>kbd]:`). */
export const IN_ADDON = inputGroupAddonScope.within()
export const CHILD_OF_ADDON = inputGroupAddonScope.parent()
