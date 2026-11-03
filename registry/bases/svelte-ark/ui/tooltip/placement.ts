import type { PlacementProps } from "../../../../lib/placement"

/** The content's placement, which it hands to its root (`lib/placement.ts`). */
export const PLACEMENT = Symbol("tooltip-placement")

/** What it holds: a `$state` object the content assigns its placement to. */
export type PlacementState = PlacementProps
