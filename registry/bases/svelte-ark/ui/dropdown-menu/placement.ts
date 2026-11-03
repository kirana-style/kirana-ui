import type { PlacementProps } from "../../../../lib/placement"

/** A content's placement, which it hands to its menu's root (`lib/placement.ts`). */
export const PLACEMENT = Symbol("dropdown-menu-placement")

/** What it holds: a `$state` object the content assigns its placement to. */
export type PlacementState = PlacementProps
