import type { PlacementProps } from "../../../../lib/placement"

/** The content's placement, which it hands to its root (`lib/placement.ts`): a `$state` object. */
export const PLACEMENT = Symbol("select-placement")
export type PlacementState = PlacementProps

/**
 * The trigger's id, a caller's (`<SelectTrigger id>`, for a label's `for`), handed to the root's
 * `ids` (a `$state` object): Zag finds its trigger by the id it gave it, so one written over it
 * leaves the popup with no anchor.
 */
export const TRIGGER_ID = Symbol("select-trigger-id")
export type TriggerIdState = { id?: string }
